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

<template>
  <div id="app">
    <div class="">
      <div class="d-flex justify-content-between align-items-center w-100 p-4">
        <h1 class="h3 font-weight-bold text-dark">Kanban</h1>
        <b-button variant="primary" @click="showModal = true"> Add board</b-button>
      </div>

      <div class="boards_wrapper">
        <div v-for="board in boards" :key="board.id" class="board_column border">
          <div class="columnn_header border shadow-sm ">
            <div class="header_count">{{ Math.floor(Math.random(100) * 100) }}</div>
            <p class="header_text">
              {{ board.name }}
            </p>

            <div class="cursor-poniter" @click="editBoard(board)">
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
            </div>
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
<style scoped>
.boards_wrapper {
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  padding: 16px;
}
.board_column {
  min-width: 320px;
  width: 320px;
  flex-shrink: 0;
  min-height: 90vh;
  margin: 8px;
  background-color: #ecf2ff;
  border-radius: 8px;
}
.columnn_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 16px;
  background-color: white;
  padding-left: 28px;
  border-radius: 0 8px 0 0;
}
.header_count {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  height: 100%;
  min-width: 20px;
  padding: 8px;
  border-radius: 4px 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(187, 187, 33);
  color: white;
}
.header_text {
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  font-weight: 600;
  text-transform: uppercase;
}
</style>
