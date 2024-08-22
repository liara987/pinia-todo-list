<template>
  <main>
    <header>
      <img src="./assets/pinia-logo.svg" alt="Pinia Logo" />
      <h1>Lista de tarefas do Pinia</h1>
    </header>

    <div class="new-task-form">
      <TaskForm />
    </div>

    <nav class="filter">
      <button @click="fav = false">Lista Completa</button>
      <button @click="fav = true">Somente os favoritos</button>
    </nav>

    <div class="loading" v-if="isLoading">Loading...</div>

    <ul class="task-list" v-if="fav">
      <p>Você tem um total de {{ favotitesCount }} tarefas favoritas</p>
      <li v-for="taskItem in favorites">
        <Task :task="taskItem" />
      </li>
    </ul>
    <ul class="task-list" v-else>
      <p>Você tem um total de {{ totalCount }} tarefas</p>
      <li v-for="taskItem in tasks">
        <Task :task="taskItem" />
      </li>
      <div class="reset">
        <button class="reset-button" @click="taskStore.$reset">Limpar</button>
      </div>
    </ul>

  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import Task from "./components/Task.vue";
import TaskForm from "./components/TaskForm.vue";
import { useTaskStore } from "./stores/TaskStore";
import { ref } from "vue";

const taskStore = useTaskStore();
const fav = ref(false);
const { tasks, totalCount, favorites, favotitesCount, isLoading } = storeToRefs(taskStore);
taskStore.getAllTasks();
</script>
