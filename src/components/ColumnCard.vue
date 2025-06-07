<template>
  <draggable :list="leads" :animation="200" ghost-class="ghost-card" group="tasks" @end="onDragEnd">
    <task-card v-for="lead in leads" :key="lead.id" :task="lead" class="mt-3 cursor-move"></task-card>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import TaskCard from "./TaskCard.vue";
import api from "@/api";

export default {
  components: {
    TaskCard,
    draggable,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      leads: [],
    };
  },
  mounted() {
    api.get(`/board/${this.id}/list`).then((res) => {
      this.leads = res.data.result.data.lists;
    });
  },
  methods: {
    onDragEnd(evt) {
      // evt example: { item, oldIndex, newIndex, from, to }
      const lead = this.leads[evt.newIndex]; // yangi joylashgan lead
      if (!lead) return;

      const payload = {
        lead_id: lead.id,
        cur_pos: evt.oldIndex,
        new_pos: evt.newIndex,
        cur_board_id: evt.from.dataset.boardId,
        new_board_id: evt.to.dataset.boardId,
      };

      api
        .post("/lead-move", payload)
        .then(() => {
          console.log("Lead moved successfully:", payload);
        })
        .catch((err) => {
          console.error("Failed to move lead:", err);
        });
    },
  },
};
</script>
