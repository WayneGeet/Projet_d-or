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

  return {
    access,
    refresh,
    user,
    setAuthentication,
    unAuthenticate,
    getUser,
  };
});
