<template>
  <div id="app">
    <div class="">
      <div class="d-flex justify-content-between align-items-center w-100 p-4">
        <h1 class="h3 font-weight-bold text-dark">Kanban</h1>
        <b-button variant="primary" @click="showModal = true"> Add board</b-button>
      </div>

      <div class="boards-wrapper d-flex flex-row overflow-x-auto p-4">
        <div v-for="board in boards" :key="board.name" class="bg-light rounded p-3 column-width mr-3">
          <div class="d-flex justify-content-between align-items-center ">
            <p class="text-dark font-weight-bold small">
              {{ board.name }}
            </p>
            <button @click="editBoard(board)">...</button>
          </div>
          <column-card :id="board.id" />
        </div>
      </div>

      <!-- Modal for adding board -->
      <b-modal v-model="showModal" title="Add asdfads Board">
        <b-form id="add-board-form" @submit.prevent="saveBoard">
          <b-form-group label="Board name" label-for="board-name">
            <b-form-input
              id="board-name"
              v-model="board.name"
              required
              autofocus
              placeholder="Enter board name"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Board order" class="mt-2" label-for="board-order">
            <b-form-input
              id="board-order"
              v-model="board.order"
              required
              autofocus
              placeholder="Board order"
            ></b-form-input>
          </b-form-group>
        </b-form>
        <template #modal-footer>
          <b-button variant="secondary" @click="resetForm">Bekor qilish</b-button>
          <b-button variant="danger" v-if="board.id" @click="deleteBoard(board.id)">O'chirish</b-button>
          <b-button variant="primary" type="submit" form="add-board-form" :disabled="isSubmitLoading">Saqlash</b-button>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import ColumnCard from "./components/ColumnCard.vue";
import api from "./api";

export default {
  name: "App",
  components: {
    ColumnCard,
  },
  data() {
    return {
      boards: [],
      showModal: false,
      isSubmitLoading: false,
      board: {
        name: "",
        order: 0,
      },
    };
  },
  mounted() {
    this.fetchBoards();
  },
  methods: {
    async fetchBoards() {
      try {
        const res = await api.get("/boards"); // API endpoint
        this.boards = res.data.result.data.boards;
      } catch (error) {
        console.error("Fetch boards error:", error);
      }
    },

    saveBoard() {
      this.isSubmitLoading = true;

      const fn = this.board.id
        ? api.put("/boards/" + this.board.id, { name: this.board.name, order: this.board.order })
        : api.post("/boards", { ...this.board });

      fn.then(() => {
        this.fetchBoards();
        this.resetForm();
      })
        .catch((error) => {
          console.error("Fetch boards error:", error);
        })
        .finally(() => {
          this.isSubmitLoading = false;
        });
    },
    editBoard(board) {
      this.board = board;
      this.showModal = true;
    },
    deleteBoard(id) {
      api
        .delete("/boards/" + id)
        .then(() => {
          this.fetchBoards();
          this.resetForm();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    resetForm() {
      this.board = {
        name: "",
        order: this.boards.length + 1,
      };
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
.column-width {
  min-width: 320px;
  width: 320px;
  flex-shrink: 0;
  min-height: 90vh;
}
.boards-wrapper {
  overflow-x: auto;
}
</style>
