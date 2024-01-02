import { defineStore } from "pinia";
import nuxtStorage from "nuxt-storage";

export const useAuth = defineStore("authentication", () => {
  const access = ref(
    nuxtStorage.localStorage.getData("access")
      ? nuxtStorage.localStorage.getData("access")
      : null
  );
  const refresh = ref(
    nuxtStorage.localStorage.getData("refresh")
      ? nuxtStorage.localStorage.getData("refresh")
      : null
  );
  const user = ref(
    nuxtStorage.localStorage.getData("user")
      ? nuxtStorage.localStorage.getData("user")
      : null
  );
  const loading = ref(false);

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
      access.value = tokens.access;
      refresh.value = tokens.refresh;
      const person = await getUser();
      user.value = await person.value.first_name;

      nuxtStorage.localStorage.setData("user", person.value.first_name);
      nuxtStorage.localStorage.setData("access", tokens.value.access);
      nuxtStorage.localStorage.setData("refresh", tokens.value.refresh);
    }
  };

  const getUser = async () => {
    const { data, error } = await useFetch("/api/user/");
    return data;
  };

  const unAuthenticate = async () => {
    try {
      nuxtStorage.localStorage.clear();
      access.value = null;
      refresh.value = null;
      user.value = null;

      return { statusCode: 200 };
    } catch (error) {
      console.log(error, " something went wrong while logging out");
    }
  };

  const updateTokens = async () => {
    if (refresh.value && access.value && user.value) {
      const { data } = await useFetch(
        "http://127.0.0.1:8000/api/token/refresh/",
        {
          method: "post",
          body: {
            refresh: refresh.value,
          },
        }
      );
      console.log(data);
      const tokens = await data.value;
      console.log(tokens.value, "this is from project store");
      return tokens;
    }
  };

  return {
    access,
    refresh,
    user,
    updateTokens,
    setAuthentication,
    unAuthenticate,
    getUser,
  };
});
