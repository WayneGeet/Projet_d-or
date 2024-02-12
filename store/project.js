import { defineStore } from "pinia";
import { useAuth } from "~/store/auth";
import { jwtDecode } from "jwt-decode";
import { getData, setData } from "nuxt-storage/local-storage";

export const useProjects = defineStore("projects", () => {
  const authStore = useAuth();
  authStore.$subscribe((event) => console.log("subscribe is working"));
  const projects = ref(null);
  const dayjs = useDayjs();
  const profile = ref(undefined);
  const filterValue = ref("");
  const project_type_filter = ref("");
  const likedProjects = ref(getData("liked_projects") || []);
  const accessandrefresh = () => {
    return { access: authStore.access, refresh: authStore.refresh };
  };

  const slug = ref("");
  const hasexp = () => {
    if (!accessandrefresh().access) return;
    const expirationTime = ref(jwtDecode(authStore.access).exp);
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
    console.log("project type", project_type_filter.value);
    try {
      const { data, error } = await useFetch(
        `/api/projects/?search=${filterValue.value}&project_type=${project_type_filter.value}`,
        {
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
        }
      );
      if (error.value) {
        console.log(error.value);
      }
      projects.value = data.value;
      return data;
    } catch (error) {
      console.log(error.value, " from catch block");
      authStore.access = null;
      authStore.refresh = null;
      localStorage.clear();
    }
  };

  const getProject = async (id) => {
    const { data, error } = await useFetch(`/api/projects/${id}/`, {
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
    console.log("formdata", formData);
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
            const token = await updateToken();
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
        `http://127.0.0.1:8000/projects/${id}/like_or_dislike/`,
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
          if (!hasexp().value) return request;
          else {
            const token = await updateToken();
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
        headers: {
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
      profile.value = data?.value;
      return data;
    } catch (error) {
      authStore.access = null;
      authStore.refresh = null;
      localStorage.clear();
      console.log(error.value + " this is from project store");
    }
  };

  const getLikedProjects = async () => {
    try {
      slug.value = jwtDecode(accessandrefresh().access).slug;
      const { data, error } = await useFetch(
        `http://127.0.0.1:8000/users/${slug.value}/me/`,
        {
          pick: ["liked_projects"],
          method: "get",
          // body: { slug: slug.value },
          headers: {
            Authorization: `Bearer ${accessandrefresh().access}`,
          },
          async onRequest({ request, options }) {
            console.log("hasexp", hasexp().value);
            if (!hasexp().value) return request;
            else {
              const token = await updateToken();
              options.headers.Authorization = `Bearer ${token.access}`;
            }
          },
        }
      );
      if (error.value) {
        console.error("get user error", error.value);
        throw createError("Getting user from backend failed");
      }
      likedProjects.value = await data.value.liked_projects;
      setData("liked_projects", likedProjects.value, 9999, "m");
      console.log("liked_projects", likedProjects.value);
      return;
    } catch (e) {
      console.error("get liked projects in auth", e);
      throw createError("Ooh snap!");
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
    hasexp,
    updateToken,
    accessandrefresh,
    filterValue,
    project_type_filter,
    likedProjects,
    getLikedProjects,
  };
});
