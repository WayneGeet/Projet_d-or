import { defineStore } from "pinia";
import nuxtStorage from "nuxt-storage";

export const useAuth = defineStore("authentication", () => {
  const access = ref(nuxtStorage.localStorage.getData("access") || "");
  const refresh = ref(nuxtStorage.localStorage.getData("refresh") || "");
  const user = ref(nuxtStorage.localStorage.getData("user") || "");
  const isAuthenticated = computed(() => {
    return user.value ? true : false;
  });

  const setAuthentication = async ({ email, password }) => {
    const { data: tokens } = await useFetch("/api/auth/", {
      method: "post",
      body: {
        email,
        password,
      },
    });
    if (!tokens.value) {
      throw createError({
        statusCode: 401,
        message: "fetching tokens has failed",
      });
    } else {
      nuxtStorage.localStorage.setData("access", tokens.access);
      nuxtStorage.localStorage.setData("refresh", tokens.refresh);
      const person = await getUser();
      nuxtStorage.localStorage.setData("user", person.value);
      navigateTo("/projects/");
    }
  };

  const getUser = async () => {
    const { data, error } = await useFetch("/api/user/");
    return data;
  };

  const unAuthenticate = async () => {
    try {
      localStorage.setItem("access", "");
      localStorage.setItem("refresh", "");
      access.value = "";
      refresh.value = "";
      return "success";
    } catch (error) {
      return "failed";
    }
  };

  return {
    access,
    refresh,
    isAuthenticated,
    user,
    setAuthentication,
    unAuthenticate,
    getUser,
  };
});
