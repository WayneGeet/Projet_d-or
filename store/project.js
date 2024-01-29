import { defineStore } from "pinia";
import { useAuth } from "~/store/auth";
import { jwtDecode } from "jwt-decode";
import { getData, setData } from "nuxt-storage/local-storage";

export const useProjects = defineStore("projects", () => {
  const authStore = useAuth();
  authStore.$subscribe((event) => console.log("subscribe is working"));
  const projects = ref(null);
  const profile = ref(undefined);
  const filterValue = ref("");
  const likedProjects = ref(getData("liked") || []);

  const accessandrefresh = () => {
    return authStore.access_refresh;
  };

  const slug = ref("");
  // const hasexp().value () => {
  //   if (!accessandrefresh().access) return;
  //   const expirationTime = ref(jwtDecode(authStore.access).exp);
  //   const isExpired = ref(dayjs.unix(expirationTime.value).diff(dayjs()) < 1);
  //   return isExpired;
  // };

  // const updateToken = async () => {
  //   const refreshToken = authStore.refresh;
  //   const { data: token } = await useFetch("/api/refresh/", {
  //     method: "post",
  //     body: {
  //       refresh: refreshToken,
  //     },
  //   });
  //   setData("access", token.value.access, 1, "d");
  //   setData("refresh", token.value.refresh, 15, "d");
  //   authStore.access = ref(getData("access"));
  //   authStore.refresh = ref(getData("refresh"));
  //   return token.value;
  // };
  console.log(authStore.hasexp().value, " has token expired");

  const getProjects = async () => {
    console.log(" the next three are from getProjects");
    console.log(accessandrefresh().access, " from get Projects");

    try {
      const { data, error } = await useFetch(
        `/api/projects/?search=${filterValue.value}`,
        {
          cache: false,
          headers: {
            Authorization: `Bearer ${accessandrefresh().access}`,
          },
          async onRequest({ request, options }) {
            if (!authStore.hasexp().value) return request;
            else {
              const token = await authStore.updateToken();
              console.log(token, " this is from update token get projects");
              options.headers.Authorization = `Bearer ${token.access}`;
              // checking if the local storage has expired
            }
          },
        }
      );
      if (error.value) {
        const token = await authStore.updateToken();
        console.log(token, " this is from error value get projects");
        console.log(error.value, " getProjects");
      }
      projects.value = data.value;
      return data;
    } catch (error) {
      console.log(error, " from catch block");
      // authStore.access_refresh = null;
      // localStorage.clear();
    }
  };

  const getProject = async (id) => {
    const { data, error } = await useFetch(`/api/projects/${id}/`, {
      headers: {
        Authorization: `Bearer ${accessandrefresh().access}`,
      },
      async onRequest({ request, options }) {
        if (!authStore.hasexp().value) return request;
        else {
          const token = await authStore.authStore.updateToken();
          options.headers.Authorization = `Bearer ${token.access}`;
        }
      },
    });
    if (error.value) {
      // authStore.access_refresh = {};
      // localStorage.clear();
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
          if (!authStore.hasexp().value) return request;
          else {
            const token = await authStore.updateToken();
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
    try {
      const { data, error } = await useFetch(
        `http://127.0.0.1:8000/projects/${id}/like/`,
        {
          method: "post",
          headers: {
            Authorization: `Bearer ${accessandrefresh().access}`,
          },
          async onRequest({ request, options }) {
            if (!authStore.hasexp().value) return request;
            else {
              const token = await authStore.updateToken();
              options.headers.Authorization = `Bearer ${token.access}`;
            }
          },
        }
      );
      const response = await data?.value;
      return response;
    } catch (error) {
      console.log(error);
      throw createError({ statusCode: 400, statusMessage: error.value });
    }
  };

  const updateProfile = async (fd) => {
    try {
      slug.value = jwtDecode(accessandrefresh().access).slug;
      const { data, error } = await useFetch(`/api/profile/${slug.value}/`, {
        method: "put",
        body: fd,
        headers: {
          Authorization: `Bearer ${accessandrefresh().access}`,
        },
        async onRequest({ request, options }) {
          if (!authStore.hasexp().value) return request;
          else {
            const token = await authStore.updateToken();
            options.headers.Authorization = `Bearer ${token.access}`;
            // checking if the local storage has expired
          }
        },
      });
      if (data.value) return data;
    } catch (error) {
      console.log(error.value);
    }
  };

  const getProfile = async () => {
    try {
      slug.value = jwtDecode(accessandrefresh().access).slug;
      const { data, error } = await useFetch(`/api/profile/${slug.value}/`, {
        key: "profile",
        headers: {
          Authorization: `Bearer ${accessandrefresh().access}`,
        },
        async onRequest({ request, options }) {
          if (!authStore.hasexp().value) return request;
          else {
            const token = await authStore.updateToken();
            options.headers.Authorization = `Bearer ${token.access}`;
          }
        },
      });
      profile.value = data?.value;
      return data;
    } catch (error) {
      // authStore.access_refresh = null;
      // localStorage.clear();
      console.log(error + " this is from project store");
    }
  };
  return {
    getProjects,
    getProject,
    projects,
    postProject,
    likeFn,
    updateProfile,
    getProfile,
    accessandrefresh,
    filterValue,
    likedProjects,
  };
});
