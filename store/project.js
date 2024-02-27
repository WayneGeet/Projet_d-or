import { defineStore } from "pinia";
import { useAuth } from "~/store/auth";
import { jwtDecode } from "jwt-decode";
import { getData, setData } from "nuxt-storage/local-storage";

export const useProjects = defineStore("projects", () => {
  const AuthStore = useAuth();
  // States
  const projects = ref(null);
  const profile = ref(undefined);
  const filterValue = ref("");
  const project_type_filter = ref("");
  const likedProjects = ref(getData("liked_projects") || []);
  const pending = ref(false);
  const userProjects = ref([]);

  const slug = ref("");

  // toasts
  const notify = () => {
    useNuxtApp().$toast.info("yep", {
      autoClose: 2000,
      dangerouslyHTMLString: true,
    });
  };
  const updateToken = async () => {
    const refreshToken = AuthStore.tokens.refresh;
    const { data: tokens } = await useFetch("/api/refresh/", {
      method: "post",
      body: {
        refresh: refreshToken,
      },
    });
    setData("tokens", tokens.value, 21, "d");

    AuthStore.tokens = ref(getData("tokens"));
    return tokens.value;
  };

  const getProjects = async () => {
    try {
      const { data, error, pending } = await useFetch(
        `/api/projects/?search=${filterValue.value}&project_type=${project_type_filter.value}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${AuthStore.tokens.access}`,
          },
          async onRequest({ request, options }) {
            const isExp = hasexp(AuthStore.tokens.access);
            if (!isExp) return request;
            else {
              const token = await updateToken();
              options.headers.Authorization = `Bearer ${token.access}`;
              // checking if the local storage has expired
            }
          },
        }
      );
      if (error.value) {
        console.error(error.value);
      }
      projects.value = data.value.results;
      return data;
    } catch (error) {
      console.error(error, " from catch block");
      AuthStore.tokens = null;
      localStorage.clear();
    }
  };

  const getProject = async (id) => {
    const { data, error } = await useFetch(`/api/projects/${id}/`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${AuthStore.tokens.access}`,
      },
      async onRequest({ request, options }) {
        const isExp = hasexp(AuthStore.tokens?.access);
        if (!isExp) return request;
        else {
          const token = await updateToken();
          options.headers.Authorization = `Bearer ${token.access}`;
        }
      },
    });
    if (error.value) {
      AuthStore.tokens = null;
      localStorage.clear();
      console.error(error.value + " this is from project store");
    }
    projects.value = data.value;
    return data;
  };

  const postProject = async (formData) => {
    try {
      const { data: message, error } = await useFetch(
        "http://127.0.0.1:8000/projects/",
        {
          method: "post",
          headers: {
            Authorization: `Bearer ${AuthStore.tokens?.access}`,
          },
          body: formData,
          async onRequest({ request, options }) {
            const isExp = hasexp(AuthStore.tokens?.access);
            if (!isExp) return request;
            else {
              const token = await updateToken();
              options.headers.Authorization = `Bearer ${token.access}`;
              // checking if the local storage has expired
            }
          },
        }
      );

      if (message.value) {
        const notify = () => {
          useNuxtApp().$toast.info("yep", {
            autoClose: 2000,
            dangerouslyHTMLString: true,
            backgroundColor: "green",
          });
        };
        notify("project added successfully");
      }

      return message.value;
    } catch (error) {
      throw createError({
        statusCode: 400,
        statusMessage: `something went wrong, ${error}`,
      });
    } finally {
      await navigateTo("/projects");
    }
  };

  const likeFn = async (id) => {
    try {
      const { data, error } = await useFetch(
        `http://127.0.0.1:8000/projects/${id}/like_or_dislike/`,
        {
          method: "post",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${AuthStore.tokens?.access}`,
          },
          async onRequest({ request, options }) {
            const isExp = hasexp(AuthStore.tokens?.access);
            if (!isExp) return request;
            else {
              const token = await updateToken();
              options.headers.Authorization = `Bearer ${token.access}`;
            }
          },
        }
      );
      const response = await data?.value;
      notify();
      return response;
    } catch (error) {
      console.error(error);
      throw createError({ statusCode: 400, statusMessage: error.value });
    }
  };

  const updateProfile = async (fd) => {
    try {
      const slug = getSlug(AuthStore.tokens?.access);
      const { data, error } = await useFetch(`/api/profile/${slug}/`, {
        method: "put",
        body: fd,
        headers: {
          Authorization: `Bearer ${AuthStore.tokens?.access}`,
        },
        async onRequest({ request, options }) {
          const isExp = hasexp(AuthStore.tokens?.access);
          if (!isExp) return request;
          else {
            const token = await updateToken();
            options.headers.Authorization = `Bearer ${token.access}`;
            // checking if the local storage has expired
          }
        },
      });
      if (data.value) return data;
    } catch (error) {
      console.error(error.value);
    }
  };

  const getProfile = async () => {
    try {
      const slug = getSlug(AuthStore.tokens?.access);
      const { data, error } = await useFetch(`/api/profile/${slug}/`, {
        headers: {
          Authorization: `Bearer ${AuthStore.tokens?.access}`,
        },
        async onRequest({ request, options }) {
          const isExp = hasexp(AuthStore.tokens?.access);
          if (!isExp) return request;
          else {
            const token = await updateToken();
            options.headers.Authorization = `Bearer ${token.access}`;
          }
        },
      });
      profile.value = data?.value;
      return profile;
    } catch (error) {
      console.error(error + " this is error from getProfile");
      AuthStore.tokens = null;
      localStorage.clear();
    }
  };

  const getLikedProjects = async () => {
    try {
      const access = AuthStore.tokens.access;
      if (!access) {
        return "No to token present";
      }
      const slug = getSlug(access);
      const { data, error } = await useFetch(
        `http://127.0.0.1:8000/users/${slug}/me/`,
        {
          pick: ["liked_projects", "projects"],
          method: "get",
          headers: {
            Authorization: `Bearer ${access}`,
          },
          async onRequest({ request, options }) {
            const isExp = hasexp(AuthStore.tokens?.access);
            if (!isExp) return request;
            else {
              const token = await updateToken();
              options.headers.Authorization = `Bearer ${token.access}`;
            }
          },
        }
      );
      if (error.value) {
        console.error("get user error", error.value);
      }
      likedProjects.value = await data.value.liked_projects;
      userProjects.value = await data.value.projects;
      setData("liked_projects", likedProjects.value, 1000, "d");
      return;
    } catch (e) {
      localStorage.clear();
      console.error("get liked projects in auth", e);
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
    updateToken,
    filterValue,
    project_type_filter,
    likedProjects,
    getLikedProjects,
    pending,
    userProjects,
    profile,
  };
});
