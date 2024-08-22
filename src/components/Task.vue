<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i class="material-icons" @click="taskStore.delete(task.id)">delete</i>
      <i class="material-icons" :class="{active: task.isFav}" @click="taskStore.toggleFav(task.id)">favorite</i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "@/stores/TaskStore";

interface TaskType {
  id: string;
  title: string;
  isFav: boolean;
}

defineProps<{ task: TaskType }>();
const taskStore = useTaskStore();
</script>
