import { defineStore } from "pinia";
import nuxtStorage from "nuxt-storage";

export const useAuth = defineStore("authentication", () => {
  const access = nuxtStorage.localStorage.getData("access")
    ? nuxtStorage.localStorage.getData("access")
    : "";
  const refresh = nuxtStorage.localStorage.getData("refresh")
    ? nuxtStorage.localStorage.getData("refresh")
    : "";
  const isAuthenticated = computed(() => {
    user.value ? true : false;
  });
  const user = ref({}) || nuxtStorage.localStorage.getData("user");

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
      user.value = person.value;
      nuxtStorage.localStorage.setData("user", person.value);
    }
  };

  const getUser = async () => {
    const { data, error } = await useFetch("/api/user/");
    return data;
  };

  const unAuthenticate = async () => {
    nuxtStorage.localStorage.setData("access", "");
    nuxtStorage.localStorage.setData("refresh", "");
    access.value = "";
    refresh.value = "";
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
