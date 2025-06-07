<template>
  <div class="bg-white shadow rounded py-4 px-2 border border-white">
    <div class="flex justify-between">
      <div class="text-gray-700 font-semibold font-sans tracking-wide text-sm">
        {{ task.username }}
      </div>
    </div>
    <div class="flex mt-4 justify-between items-center">
      <badge v-if="task.source">{{ task.source }}</badge>
    </div>
  </div>
</template>
<script>
import Badge from "./Badge.vue";
export default {
  components: { Badge },
  props: {
    task: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {},
};
</script>
