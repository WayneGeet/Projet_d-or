import { defineStore } from "pinia";
import { getData, setData } from "nuxt-storage/local-storage";
// import { useProjects } from "~/store/project";

export const useAuth = defineStore("authentication", () => {
  const tokens = ref(getData("tokens"));
  const isAuthenticated = computed(() => {
    return !!tokens.value;
  });
  const error = ref("");
  //toasts
  const register = (success) => {
    useNuxtApp().$toast.info(`${success ? "yep" : "nop"}`, {
      autoClose: 3000,
      dangerouslyHTMLString: true,
      backgroundColor: `${success ? "green" : "red"}`,
    });
  };
  const login = (success, message) => {
    useNuxtApp().$toast.info(message, {
      autoClose: 3000,
      dangerouslyHTMLString: true,
      backgroundColor: `${success ? "green" : "red"}`,
    });
  };
  // const ProjectStore = useProjects();
  // const loading = ref(false);
  const registration = async ({ fname, lname, email, id_no, password }) => {
    try {
      const { data, error } = await useFetch("/api/register", {
        method: "post",
        body: { fname, lname, email, id_no, password },
      });
      if (data.value) {
        register(true);
        return data;
      } else {
        register(false);
        console.error(error.value);
      }
    } catch (error) {
      console.error(error);
      throw createError({
        statusCode: 500,
        statusMessage: "System's down",
      });
    }
  };

  const setAuthentication = async ({ email, password }) => {
    try {
      const { data } = await useFetch("/api/auth/", {
        method: "post",
        body: {
          email,
          password,
        },
      });
      if (data.value.access) {
        console.log(data.value.access);
        tokens.value = data.value;
        login(true, "Login successful");
        setData("tokens", data.value, 100, "d");
        return true;
      } else {
        login(false, `${data.value.detail}`);
        error.value = data.value.detail;
      }
    } catch (error) {
      console.error(error);
      throw createError({
        statusCode: 500,
        statusMessage: "System's down",
      });
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
