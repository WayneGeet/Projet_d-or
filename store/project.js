import { defineStore } from "pinia";
import { useAuth } from "~/store/auth";
import { jwtDecode } from "jwt-decode";
import nuxtStorage from "nuxt-storage";

export const useProjects = defineStore("projects", () => {
  const authStore = useAuth();
  const projects = ref(null);

  const dayjs = useDayjs();

  // computed properties
  const tokens = computed(() => {
    const authStoreAccess =
      authStore.access || nuxtStorage.localStorage.getData("access");

    const authStoreRefresh =
      authStore.refresh || nuxtStorage.localStorage.getData("refresh");
    return { access: authStoreAccess, refresh: authStoreRefresh };
  });
  const getProjects = async () => {
    const { data, error } = await useFetch("/api/projects/", {
      retry: 3,
      retryDelay: 500,
      timeout: 3000,
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
        Authorization: `Bearer ${tokens.value.access}`,
      },
      async onRequest({ request, options }) {
        console.log(authStore.access, " this is options");
        // options.headers.authorization = `Bearer ${authStore.access}`;
      },
      async onResponseError({ request, response, options }) {
        // Handle the response errors
        // if (response.status === 401) {
        const { data, error } = await useFetch("/api/refresh/", {
          method: "post",
          body: { refresh: tokens.value.refresh },
        });
        console.log(
          authStore.access,
          "this is from response error interceptorsss"
        );
        authStore.access =
          data.value.access || nuxtStorage.localStorage.getData("access");
        error.value &&
          console.log("something went wrong while refreshing tokens");

        // }
      },
      async onRequest({ request, options }) {
        console.log("Request has been made");
        const expirationTime = jwtDecode(
          nuxtStorage.localStorage.getData("access")
        ).exp;
        const isExpired = dayjs.unix(expirationTime).diff(dayjs()) < 1;
        if (!isExpired) return request;
        const { data } = await useFetch("/api/refresh/");
        options.headers.authorization = `Bearer ${authStore.access}`;
      },
    });
    if (error.value) {
      authStore.access = null;
      authStore.refresh = null;
      authStore.user = null;
      localStorage.clear();
      console.log(error.value + " this is from project store");
    }
    projects.value = data.value;
    return data;
  };

  return { getProjects, projects };
});
