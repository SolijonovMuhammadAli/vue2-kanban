<template>
  <draggable
    :list="leads"
    :animation="200"
    ghost-class="ghost-card"
    group="tasks"
  >
    <task-card
      v-for="lead in leads"
      :key="lead.id"
      :task="lead"
      class="mt-3 cursor-move"
    ></task-card>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";
import TaskCard from "./TaskCard.vue";

export default {
  components: {
    TaskCard,
    draggable,
  },
  data() {
    return {
      leads: [
        {
          id: 2,
          title: "Provide documentation on integrations",
          date: "Sep 12",
        },
      ],
    };
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  computed: {},
};
</script>

<style scoped>
.ghost-card {
  opacity: 0.5;
  background: #f7fafc;
  border: 1px solid #4299e1;
}
</style>
