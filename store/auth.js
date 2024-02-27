import { defineStore } from "pinia";
import { getData, setData } from "nuxt-storage/local-storage";
// import { useProjects } from "~/store/project";

export const useAuth = defineStore("authentication", () => {
  const tokens = ref(getData("tokens"));
  const isAuthenticated = computed(() => {
    return !!tokens.value;
  });
  // const ProjectStore = useProjects();
  // const loading = ref(false);
  const registration = async ({ fname, lname, email, id_no, password }) => {
    try {
      const { data, error } = await useFetch("/api/register", {
        method: "post",
        body: { fname, lname, email, id_no, password },
      });
      if (data.value) {
        return data;
      } else console.error(error.value);
    } catch (error) {
      console.error(error);
    }
  };

  const setAuthentication = async ({ email, password }) => {
    const { data } = await useFetch("/api/auth/", {
      method: "post",
      body: {
        email,
        password,
      },
    });
    if (!data.value) {
      throw createError({
        statusCode: 401,
        message: "fetching tokens has failed",
      });
    } else {
      tokens.value = data.value;

      setData("tokens", data.value, 1000, "d");
    }
  };

  const unAuthenticate = () => {
    try {
      localStorage.clear();
      tokens.value = null;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    isAuthenticated,
    setAuthentication,
    unAuthenticate,
    registration,
    tokens,
  };
});
