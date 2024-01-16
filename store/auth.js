import { defineStore } from "pinia";
import nuxtStorage from "nuxt-storage";

export const useAuth = defineStore("authentication", () => {
  const access = ref(nuxtStorage.localStorage.getData("access"));
  const refresh = ref(nuxtStorage.localStorage.getData("refresh"));

  // const loading = ref(false);

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
      console.log("login has run", tokens.value);

      access.value = tokens.value.access;
      refresh.value = tokens.value.refresh;

      nuxtStorage.localStorage.setData("access", tokens.value.access, 1, "d");
      nuxtStorage.localStorage.setData(
        "refresh",
        tokens.value.refresh,
        15,
        "d"
      );
    }
  };

  const unAuthenticate = () => {
    try {
      nuxtStorage.localStorage.clear();
      access.value = null;
      refresh.value = null;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    access,
    refresh,
    setAuthentication,
    unAuthenticate,
  };
});
