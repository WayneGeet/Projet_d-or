import { defineStore } from "pinia";

export const useProjects = defineStore("projects", () => {
  const projects = ref(null);
  const getProjects = async () => {
    const { data } = await useFetch("/api/projects/");
    console.log(data + " this is from project store");
    projects.value = data.value;
    return data;
  };

  return { getProjects, projects };
});
