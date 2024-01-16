import { defineStore } from "pinia";
import { useAuth } from "~/store/auth";
import { jwtDecode } from "jwt-decode";
import { getData, setData } from "nuxt-storage/local-storage";

export const useProjects = defineStore("projects", () => {
  const authStore = useAuth();
  authStore.$subscribe((event) => console.log("subscribe is working"));
  const projects = ref(null);
  const dayjs = useDayjs();

  const accessandrefresh = () => {
    return { access: authStore.access, refresh: authStore.refresh };
  };

  const hasexp = () => {
    const expirationTime = ref(jwtDecode(accessandrefresh().access).exp);
    const isExpired = ref(dayjs.unix(expirationTime.value).diff(dayjs()) < 1);
    return isExpired;
  };
  const updateToken = async () => {
    const refreshToken = authStore.refresh;
    const { data: token } = await useFetch("/api/refresh/", {
      method: "post",
      body: {
        refresh: refreshToken,
      },
    });
    setData("access", token.value.access, 1, "d");
    setData("refresh", token.value.refresh, 15, "d");
    authStore.access = ref(getData("access"));
    authStore.refresh = ref(getData("refresh"));
    return token.value;
  };

  const getProjects = async () => {
    const { data, error } = await useFetch("/api/projects/", {
      cache: false,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessandrefresh().access}`,
      },
      async onRequest({ request, options }) {
        if (!hasexp().value) return request;
        else {
          const token = await updateToken();
          options.headers.Authorization = `Bearer ${token.access}`;
          // checking if the local storage has expired
        }
      },
    });
    if (error.value) {
      authStore.access = null;
      authStore.refresh = null;
      localStorage.clear();
    }
    projects.value = data.value;
    return data;
  };

  const getProject = async (id) => {
    const { data, error } = await useFetch(`/api/projects/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessandrefresh().access}`,
      },
      async onRequest({ request, options }) {
        if (!hasexp().value) return request;
        else {
          const token = await updateToken();
          options.headers.Authorization = `Bearer ${token.access}`;
        }
      },
    });
    if (error.value) {
      authStore.access = null;
      authStore.refresh = null;
      localStorage.clear();
      console.log(error.value + " this is from project store");
    }
    projects.value = data.value;
    return data;
  };

  const postProject = async (formData) => {
    const { data: message, error } = await useLazyFetch(
      "http://127.0.0.1:8000/projects/",
      {
        method: "post",
        headers: {
          Authorization: `Bearer ${accessandrefresh().access}`,
        },
        body: formData,
        async onRequest({ request, options }) {
          if (!hasexp().value) return request;
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

            setData("access", token.access, 1, "d");
            setData("refresh", token.refresh, 15, "d");
            authStore.access = ref(nuxtStorage.localStorage.getData("access"));
            authStore.refresh = ref(
              nuxtStorage.localStorage.getData("refresh")
            );
            options.headers.Authorization = `Bearer ${token.access}`;
            // checking if the local storage has expired
          }
        },
      }
    );

    if (error.value)
      throw createError({
        statusCode: 400,
        statusMessage: "something went wrong",
      });
    return message.value;
  };

  const likeFn = async (id) => {
    const { data, error } = await useFetch(
      `http://127.0.0.1:8000/projects/${id}/like/`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessandrefresh().access}`,
        },
        async onRequest({ request, options }) {
          if (!hasexp().value) return request;
          else {
            const token = await updateToken();
            options.headers.Authorization = `Bearer ${token.access}`;
          }
        },
      }
    );
    const response = data.value;
    if (response) return data;
    else throw createError({ statusCode: 400, statusMessage: error.value });
  };
  return { getProjects, getProject, projects, postProject, likeFn };
});
