<template>
  <div class="bg-white shadow rounded py-4 px-2 border border-white" @dblclick="onShowSidebar">
    <div class="flex justify-between">
      <div class="text-gray-700 font-semibold font-sans tracking-wide text-sm">
        {{ task.username }}
      </div>
    </div>
    <div class="flex mt-4 justify-between items-center">
      <badge v-if="task.source">{{ task.source }}</badge>
    </div>
    <b-sidebar
      width="80%"
      @mousedown.stop
      @touchstart.stop
      v-model="showSidebar"
      title="Lead"
      backdrop-variant="dark"
      right
      backdrop
      shadow
    >
      <div class="d-flex p-2">
        <div class="w-full">
          Lead data
        </div>
        <div class="w-full">
          <b-tabs content-class="mt-3">
            <b-tab title="Commit" active>
              <b-form @submit="onSubmit">
                <b-form-textarea
                  id="textarea"
                  v-model="comment"
                  placeholder="Enter something..."
                  rows="2"
                  max-rows="6"
                ></b-form-textarea>

                <b-button :disabled="isSubmit" type="submit" class="mt-1 w-full" variant="primary">Submit</b-button>
              </b-form>
              <div v-if="isLoading" class="text-center mt-4">
                <b-spinner label="Spinning"></b-spinner>
              </div>
              <ul v-else class="p-0 mt-4 ">
                <li class="m-1 px-2 py-1 border rounded" v-for="(comment, idx) in comments" :key="idx">
                  {{ comment.body }}
                </li>
              </ul>
            </b-tab>
            <b-tab title="SMS"><p>SMS</p></b-tab>
            <b-tab title="Other"><p>Other</p></b-tab>
          </b-tabs>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>
<script>
import api from "@/api";
import Badge from "./Badge.vue";
export default {
  components: { Badge },
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
