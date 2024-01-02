import { defineStore } from "pinia";
import { useAuth } from "~/store/auth";

export const useProjects = defineStore("projects", () => {
  const authStore = useAuth();
  const projects = ref(null);

  const getProjects = async () => {
    const { data, error } = await useFetch("/api/projects/", {
      onResponseError({ request, response, options }) {
        const fetchTokens = async () => {
          if (response.status === 401) {
            console.log("fetch tokens has already ran");
            const { data: message } = await useFetch("/api/refresh/");
            const { access, refresh } = await tokens.value;
            nuxtStorage.localStorage.setData();
          }
        };
        fetchTokens();
      },
    });
    console.log(data.value + " this is from project store");
    if (error) {
      console.log(error.value + " this is from project store");
    }
    projects.value = data.value;
    return data;
  };

  return { getProjects, projects };
});
