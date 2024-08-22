import { defineStore } from "pinia";
import axios from "axios";

interface TaskType {
  id: string;
  title: string;
  isFav: boolean;
}
export const useTaskStore = defineStore("todo list store", {
  state: (): { tasks: TaskType[]; isLoading: boolean } => ({
    tasks: [],
    isLoading: false,
  }),
  getters: {
    favorites(): TaskType[] {
      return this.tasks.filter((task) => task.isFav);
    },
    favotitesCount(): Number {
      return this.tasks.reduce((prev, current) => {
        return current.isFav ? prev + 1 : prev;
      }, 0);
    },
    totalCount: (state) => {
      return state.tasks.length;
    },
  },
  actions: {
    async getAllTasks() {
      this.isLoading = true;

      try {
        await axios
          .get("http://localhost:3000/tasks/")
          .then((res) => (this.tasks = res.data))
          .finally(() => {
            this.isLoading = false;
          });
      } catch (error) {
        console.error("Error trying to get all tasks", error);
      }
    },
    async addTask(task: TaskType) {
      this.tasks.push(task);

      try {
        await axios.post("http://localhost:3000/tasks/", task);
      } catch (error) {
        console.error("Error trying to add task to json", error);
      }
    },
    async delete(id: string) {
      this.tasks = this.tasks.filter((t) => t.id !== id);

      try {
        await axios.delete("http://localhost:3000/tasks/" + id);
      } catch (error) {
        console.error("Error trying to delete task to json", error);
      }
    },
    async toggleFav(id: string) {
      const task = this.tasks.find((t) => t.id === id);

      if (task) {
        task.isFav = !task.isFav;
      }
      try {
        await axios.patch("http://localhost:3000/tasks/" + id, { isFav: task?.isFav });
      } catch (error) {
        console.error("Error trying to change favorite task to json", error);
      }
    },
  },
});
