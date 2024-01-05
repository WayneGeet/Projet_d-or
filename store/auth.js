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

  const unAuthenticate = async () => {
    try {
      nuxtStorage.localStorage.clear();
      access.value = null;
      refresh.value = null;

      return { statusCode: 200 };
    } catch (error) {}
  };

  const updateTokens = async () => {
    if (refresh.value && access.value) {
      const { data } = await useFetch(
        "http://127.0.0.1:8000/api/token/refresh/",
        {
          method: "post",
          body: {
            refresh: refresh.value,
          },
        }
      );
      const token = await data.value;
      return token;
    }
  };

  return {
    access,
    refresh,
    updateTokens,
    setAuthentication,
    unAuthenticate,
  };
});
