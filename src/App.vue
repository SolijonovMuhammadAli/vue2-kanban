<template>
  <div id="app">
    <div class="d-flex flex-column align-items-center">
      <div class="d-flex justify-content-between align-items-center w-100 p-4">
        <h1 class="h3 font-weight-bold text-dark">Kanban</h1>
        <b-button variant="primary" @click="showModal = true"
          >Add board</b-button
        >
      </div>

      <div class="min-vh-100 d-flex overflow-auto p-4">
        <div
          v-for="board in boards"
          :key="board.name"
          class="bg-light rounded p-3 column-width mr-3"
        >
          <p class="text-dark font-weight-bold small">
            {{ board.name }}
          </p>
          <column-card :id="board.id" />
        </div>
      </div>

      <!-- Modal for adding board -->
      <b-modal v-model="showModal" title="Add asdfads Board">
        <b-form id="add-board-form" @submit.prevent="addBoard">
          <b-form-group label="Board name" label-for="board-name">
            <b-form-input
              id="board-name"
              v-model="board.name"
              required
              autofocus
              placeholder="Enter board name"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Board order"
            class="mt-2"
            label-for="board-order"
          >
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
          <b-button variant="secondary" @click="showModal = false"
            >Bekor qilish</b-button
          >
          <b-button variant="primary" type="submit" form="add-board-form"
            >Qo'shish</b-button
          >
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
      boards: [
        { id: 1, name: "Unsorted", order: 1 },
        { id: 2, name: "test", order: 2 },
        { id: 3, name: "test 2", order: 3 },
        { id: 4, name: "test 3", order: 4 },
      ],
      showModal: false,
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
        // this.boards = res.data;
        console.log(res.data);
      } catch (error) {
        console.error("Fetch boards error:", error);
      }
    },

    addBoard() {
      console.log("Board qo‘shilmoqda:", this.board);
      // this.resetForm();
    },
    resetForm() {
      this.board = {
        name: "",
        order: this.boards.length + 1,
      };
      // this.showModal = false;
    },
  },
};
</script>

<style scoped>
.column-width {
  min-width: 320px;
  width: 320px;
}
</style>
