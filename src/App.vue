<template>
  <div id="app">
    <div class="">
      <div class="d-flex justify-content-between align-items-center w-100 p-4">
        <h1 class="h3 font-weight-bold text-dark">Kanban</h1>
        <b-button variant="primary" @click="showModal = true"> Add board</b-button>
      </div>

      <div class="boards-wrapper d-flex flex-row overflow-x-auto p-4">
        <div v-for="board in boards" :key="board.name" class=" rounded p-2 column-width mr-3">
          <div class="d-flex justify-content-between align-items-center rounded border bg-white px-2 py-2">
            <p class="text-dark m-0 font-weight-bold text-uppercase fw-bold ">
              {{ board.name }}
            </p>
            <button @click="editBoard(board)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-three-dots-vertical"
                viewBox="0 0 16 16"
              >
                <path
                  d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
                />
              </svg>
            </button>
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
  background-color: #ecf2ff;
}
.boards-wrapper {
  overflow-x: auto;
}
</style>
