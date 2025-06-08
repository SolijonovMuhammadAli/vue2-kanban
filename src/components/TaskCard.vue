<template>
  <div class="bg-white shadow rounded py-2 px-2 border border-white" @dblclick="onShowSidebar">
    <div class="text-gray-700 font-semibold font-sans tracking-wide text-sm pb-2">
      {{ task.username }}
    </div>
    <div class="text-gray-700 font-semibold font-sans tracking-wide text-sm pb-2">{{ task.comment }}</div>
    <div class="flex justify-between items-center">
      <div>
        <span class="badge text-bg-light opacity-50 d-flex gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            class="bi bi-calendar"
            viewBox="0 0 16 16"
          >
            <path
              d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"
            />
          </svg>
          {{ task.created_at.slice(0, 10) }}</span
        >
      </div>
      <div>
        <span class="badge text-bg-primary opacity-50">Instagram</span>
      </div>
    </div>
    <b-sidebar
      width="800px"
      @mousedown.stop
      @touchstart.stop
      v-model="showSidebar"
      title=""
      backdrop-variant="dark"
      right
      backdrop
      shadow
    >
      <div class="d-flex gap-2 px-4">
        <div style="width: 300px; height: 100px;" class="border w-full p-2 rounded bg-white">
          <div class="text-gray-700 font-semibold font-sans tracking-wide text-sm pb-2">
            {{ task.user_name }}
          </div>
          <div class="text-gray-700 font-semibold font-sans tracking-wide text-sm pb-2">{{ task.comment }}</div>
          <div class="flex justify-between items-center">
            <div>
              <span class="badge text-bg-light opacity-50 d-flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="currentColor"
                  class="bi bi-calendar"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"
                  />
                </svg>
                {{ task.created_at.slice(0, 10) }}</span
              >
            </div>
            <div>
              <span class="badge text-bg-primary opacity-50">Instagram</span>
            </div>
          </div>
        </div>
        <div class="bg-white rounded border w-full p-2">
          <b-tabs pills card content-class="mt-3">
            <b-tab active>
              <template #title>
                <span>Izohlar</span> <b-badge variant="light">{{ comments.length }}</b-badge>
              </template>
              <b-form @submit="onSubmit">
                <b-form-textarea
                  id="textarea"
                  v-model="comment"
                  placeholder="Enter something..."
                  rows="4"
                  max-rows="6"
                ></b-form-textarea>
                <div class="flex justify-end items-center">
                  <b-button :disabled="isSubmit" type="submit" class="mt-2" variant="primary">Yuborish</b-button>
                </div>
              </b-form>
              <div v-if="isLoading" class="text-center mt-4">
                <b-spinner label="Spinning"></b-spinner>
              </div>
              <ul v-else class="p-0 mt-4 overflow-auto h-full">
                <li
                  class="m-1 px-2 py-1 border rounded bg-red text-small"
                  v-for="(comment, idx) in comments"
                  :key="idx"
                >
                  <b-avatar variant="primary"></b-avatar>
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
