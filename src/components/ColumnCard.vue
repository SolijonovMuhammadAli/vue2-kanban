<script>
import draggable from "vuedraggable";
import TaskCard from "./TaskCard.vue";
import api from "@/api";

export default {
  components: { TaskCard, draggable },
  props: {
    id: { type: Number, required: true },
  },
  data() {
    return {
      leads: [],
      currentPage: 1,
      lastPage: 1,
      isLoading: false,
      observer: null,
    };
  },
  computed: {
    hasMore() {
      return this.currentPage < this.lastPage;
    },
  },
  mounted() {
    this.getBoardList();

    this.observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && this.hasMore && !this.isLoading) {
          this.currentPage++;
          this.getBoardList();
        }
      },
      { threshold: 1 }
    );
  },
  updated() {
    this.$nextTick(() => {
      const trigger = this.$refs.infiniteScrollTrigger;

      // Observer faqat bitta elementga ulanadi va uni qayta ulanganda avval disconnect qilish kerak
      if (this.observer && trigger) {
        this.observer.disconnect();
        // $refs array bo'lishi mumkin, shuning uchun tekshirib olish
        if (Array.isArray(trigger)) {
          trigger.forEach((el) => this.observer.observe(el));
        } else {
          this.observer.observe(trigger);
        }
      }
    });
  },
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    async getBoardList() {
      if (this.isLoading) return;

      this.isLoading = true;

      try {
        const res = await api.get(`/board/${this.id}/list?current_page=${this.currentPage}&per_page=2`);
        const { lists, pagination } = res.data.result.data;

        // Yangi elementlarni leads ga qo'shish
        this.leads = [...this.leads, ...lists];
        this.lastPage = pagination.last_page;
      } catch (err) {
        console.error("Failed to fetch leads:", err);
      } finally {
        this.isLoading = false;
      }
    },

    async onDragEnd(evt) {
      const fromColumn = evt.from.closest(".column_card");
      const toColumn = evt.to.closest(".column_card");
      const draggedItemId = Number(evt.item.dataset.id);

      if (!fromColumn || !toColumn || !draggedItemId) {
        console.warn("Missing IDs on drag");
        return;
      }

      const fromBoardId = Number(fromColumn.dataset.boardId);
      const toBoardId = Number(toColumn.dataset.boardId);

      const payload = {
        lead_id: draggedItemId,
        cur_pos: evt.oldIndex,
        new_pos: evt.newIndex,
        cur_board_id: fromBoardId,
        new_board_id: toBoardId,
      };

      try {
        await api.post("/lead-move", payload);
        console.log("Lead moved successfully:", payload);
      } catch (err) {
        console.error("Failed to move lead:", err);
      }
    },
  },
};
</script>

<template>
  <div class="column_card" :data-board-id="id">
    <div class="column-scroll" ref="scrollContainer">
      <draggable tag="div" :list="leads" :animation="200" ghost-class="ghost-card" group="tasks" @end="onDragEnd">
        <div v-for="(lead, index) in leads" :key="lead.id" :data-id="lead.id" class="cursor-move card_task">
          <task-card :task="lead" />
          <div v-if="index === leads.length - 1 && hasMore" ref="infiniteScrollTrigger" class="h-2"></div>
        </div>
      </draggable>
      <div class="text-center" v-if="isLoading">
        <b-spinner />
      </div>
    </div>
  </div>
</template>

<style scoped>
.column_card {
  height: 90vh;
  display: flex;
  flex-direction: column;
}

.column-scroll {
  overflow-y: auto;
  flex-grow: 1;
  padding-right: 0;
}
.card_task {
  margin: 8px 16px;
}
</style>
