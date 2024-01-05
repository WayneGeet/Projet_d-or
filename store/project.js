import { defineStore } from "pinia";
import { useAuth } from "~/store/auth";
import { jwtDecode } from "jwt-decode";
import nuxtStorage from "nuxt-storage";

export const useProjects = defineStore("projects", () => {
  const authStore = useAuth();
  // authStore.$subscribe(({ state, mutations }) => console.log(state));
  const projects = ref(null);

  const dayjs = useDayjs();

  const getProjects = async () => {
    const accessToken = authStore.access;
    const refreshToken = authStore.refresh;

    const { data, error } = await useFetch("/api/projects/", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      async onRequest({ request, options }) {
        // retrieve the expiration time of the token
        const expirationTime = ref(
          jwtDecode(nuxtStorage.localStorage.getData("access")).exp
        );
        // check to see if the token has expired
        const isExpired = ref(
          dayjs.unix(expirationTime.value).diff(dayjs()) < 1
        );

        if (!isExpired.value) return request;
        else {
          const { data } = await useFetch(
            "http://127.0.0.1:8000/api/token/refresh/",
            {
              method: "post",
              body: {
                refresh: refreshToken,
              },
            }
          );
          const token = await data.value;
          console.log(token, " tokne");

          nuxtStorage.localStorage.setData("access", token.access, 1, "d");
          nuxtStorage.localStorage.setData("refresh", token.refresh, 15, "d");
          authStore.access = ref(nuxtStorage.localStorage.getData("access"));
          authStore.refresh = ref(nuxtStorage.localStorage.getData("refresh"));
          options.headers.Authorization = `Bearer ${token.access}`;
          // checking if the local storage has expired
        }
      },
    });
    if (error.value) {
      // authStore.access = null;
      // authStore.refresh = null;
      // localStorage.clear();
      console.log(error.value + " this is from project store");
    }
    projects.value = data.value;
    return data;
  };

  const postProject = async (formData) => {
    const accessToken = authStore.access;
    const refreshToken = authStore.refresh;
    const {
      data: message,
      error,
      pending,
    } = await useLazyFetch("http://127.0.0.1:8000/projects/", {
      method: "post",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
      async onRequest({ request, options }) {
        // retrieve the expiration time of the token
        const expirationTime = ref(
          jwtDecode(nuxtStorage.localStorage.getData("access")).exp
        );
        // check to see if the token has expired
        const isExpired = ref(
          dayjs.unix(expirationTime.value).diff(dayjs()) < 1
        );

        if (!isExpired.value) return request;
        else {
          const { data } = await useFetch(
            "http://127.0.0.1:8000/api/token/refresh/",
            {
              method: "post",
              body: {
                refresh: refreshToken,
              },
            }
          );
          const token = await data.value;

          nuxtStorage.localStorage.setData("access", token.access, 1, "d");
          nuxtStorage.localStorage.setData("refresh", token.refresh, 15, "d");
          authStore.access = ref(nuxtStorage.localStorage.getData("access"));
          authStore.refresh = ref(nuxtStorage.localStorage.getData("refresh"));
          options.headers.Authorization = `Bearer ${token.access}`;
          // checking if the local storage has expired
        }
      },
    });

    if (error.value)
      throw createError({
        statusCode: 400,
        statusMessage: "something went wrong",
      });
    return message.value;
  };
  return { getProjects, projects, postProject };
});
