<script>
import api from "@/api";

export default {
  data() {
    return {
      showSidebar: false,
      isLoading: false,
      isSubmit: false,
      comments: [],
      comment: "",
    };
  },
  props: {
    task: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    onShowSidebar() {
      this.showSidebar = true;
      this.fetchData();
    },
    fetchData() {
      this.isLoading = true;
      api
        .get(`/leads/${this.task.id}`)
        .then((res) => {
          this.comments = res.data.result.data.comments;
        })
        .finally(() => (this.isLoading = false));
    },
    onSubmit(event) {
      event.preventDefault();
      this.isSubmit = true;
      api
        .post("store-comment", {
          lead_id: this.task.id,
          body: this.comment,
        })
        .then(() => {
          this.comment = "";
          this.fetchData();
        })
        .catch((err) => console.log(err))
        .finally(() => (this.isSubmit = false));
    },
  },
  computed: {},
};
</script>
<template>
  <div
    class="task_card shadow rounded borde bg-white "
    @dblclick="onShowSidebar"
  >
    <div class="task_item">
      <b-icon
        font-scale="1"
        icon="person-fill"
        style="color: #00000055;"
      ></b-icon>
      <span class="">{{ task.username }}</span>
    </div>
    <div class="task_item">
      <b-icon
        font-scale="1"
        icon="pencil-square"
        style="color: #00000055;"
      ></b-icon>
      <span class="">{{ task.comment }}</span>
    </div>
    <div class="task_item">
      <b-icon
        font-scale="1"
        icon="calendar2-check-fill"
        style="color: #00000055;"
      ></b-icon>
      <span> {{ task.created_at.slice(0, 10) }}</span>
    </div>
    <!-- <div class="task_item">
      <b-icon font-scale="1" icon="person" style="color: #00000055;"></b-icon> {{ task.user_name }}
    </div> -->

    <div class="task_footer">
      <span class="badge text-bg-primary opacity-50">Instagram</span>
    </div>
    <b-sidebar
      width="1000px"
      @mousedown.stop
      @touchstart.stop
      v-model="showSidebar"
      backdrop-variant="dark"
      right
      backdrop
      shadow
      class="cursor-text"
    >
      <template #title>
        <div class="sidebar_title ">{{ task.username }}</div>
      </template>
      <div class="d-flex gap-8 px-4">
        <div
          style="width: 500px; height: 200px"
          class="sidebar_card shadow border rounded"
        >
          <div class="task_item">
            <b-icon
              font-scale="1"
              icon="person-fill"
              style="color: #00000055;"
            ></b-icon>
            <span class="">{{ task.username }}</span>
          </div>
          <div class="task_item">
            <b-icon
              font-scale="1"
              icon="pencil-square"
              style="color: #00000055;"
            ></b-icon>
            <span class="">{{ task.comment }}</span>
          </div>
          <div class="task_item">
            <b-icon
              font-scale="1"
              icon="calendar2-check-fill"
              style="color: #00000055;"
            ></b-icon>
            <span> {{ task.created_at.slice(0, 10) }}</span>
          </div>
          <div class="task_item">
            <b-icon
              font-scale="1"
              icon="person"
              style="color: #00000055;"
            ></b-icon>
            {{ task.user_name }}
          </div>

          <div class="task_footer">
            <span class="badge text-bg-primary opacity-50">Instagram</span>
          </div>
        </div>
        <div class="  w-full  ">
          <b-tabs pills card content-class="mt-3">
            <b-tab active>
              <template #title>
                <span>Izohlar</span>
                <b-badge variant="light">{{ comments.length }}</b-badge>
              </template>
              <b-form
                @mousedown.stop
                @touchstart.stop
                @submit="onSubmit"
                class="bg-white py-4 px-2 shadow border rounded"
              >
                <label>Izoh</label>
                <b-form-textarea
                  id="textarea"
                  v-model="comment"
                  placeholder="Eslatma uchun yozing..."
                  rows="4"
                  max-rows="6"
                ></b-form-textarea>
                <div class="flex justify-end items-center">
                  <b-button
                    :disabled="isSubmit"
                    type="submit"
                    class="mt-2"
                    variant="primary"
                    >Yuborish</b-button
                  >
                </div>
              </b-form>
              <div v-if="isLoading" class="text-center mt-4">
                <b-spinner label="Spinning"></b-spinner>
              </div>
              <ul v-else class="comment_list">
                <li
                  class="comment_item border rounded shadow-md"
                  v-for="(comment, idx) in comments"
                  :key="idx"
                >
                  <div class="comment_header">
                    <span class="badge text-bg-primary ">{{
                      comment.created_at.slice(0, 10)
                    }}</span>
                    <span class="opacity-50">Aliyev Shaxnoza</span>
                  </div>
                  <p>{{ comment.body }}</p>
                </li>
              </ul>
            </b-tab>
            <b-tab title="SMS"><p>SMS</p></b-tab>
            <b-tab title="Boshqa"><p>Other</p></b-tab>
          </b-tabs>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>
<style scoped>
.task_card {
  background-color: white;
  padding: 16px 12px;
}
.task_item {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}
.task_footer {
  display: flex;
  justify-content: flex-end;
}

.sidebar_card {
  background-color: white;
  padding: 16px 8px;
  position: sticky;
  cursor: text;
  top: 0;
}
.comment_list {
  margin: 0;
  padding: 0;
  margin-top: 8px;
  /* height: 60vh; */
  overflow-y: auto;
}
.comment_item {
  padding: 4px 16px;
  margin-bottom: 8px;
  background-color: white;
}
.comment_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
</style>
