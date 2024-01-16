import { defineStore } from "pinia";
import nuxtStorage from "nuxt-storage";

export const useAuth = defineStore("authentication", () => {
  const access = ref(nuxtStorage.localStorage.getData("access"));
  const refresh = ref(nuxtStorage.localStorage.getData("refresh"));

  // const loading = ref(false);
  const registration = async ({ fname, lname, email, id_no, password }) => {
    const { data, error } = await useFetch("/api/register", {
      method: "post",
      body: { fname, lname, email, id_no, password },
    });
    if (data.value) return data;
    else console.log(error.value);
  };

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
    registration,
  };
});
