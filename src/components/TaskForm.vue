<template>
    <form @submit.prevent="handleSubmit">
        <input
            type="text"
            placeholder="Eu precisso..."
            v-model="newTask"
        >
        <button>Adicionar</button>
    </form>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/TaskStore';
import { ref } from 'vue';

const taskStore = useTaskStore()
const newTask = ref<string>('')

function handleSubmit(){    
    if (newTask.value.length > 0) {
        taskStore.addTask({
            title: newTask.value,
            id: Math.floor(Math.random() * 10000).toString(),
            isFav: false
        })
    }

    newTask.value = ''
}
</script>