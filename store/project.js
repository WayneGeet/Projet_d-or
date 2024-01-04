import { defineStore } from "pinia";
import { useAuth } from "~/store/auth";
import { jwtDecode } from "jwt-decode";
import nuxtStorage from "nuxt-storage";

export const useProjects = defineStore("projects", () => {
  const authStore = useAuth();
  authStore.$subscribe(({ state, mutations }) => console.log(state));
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
        console.log(
          dayjs.unix(expirationTime.value).diff(dayjs()),
          "expiration time"
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

          console.log(token.access, "this is access from refresh");

          nuxtStorage.localStorage.setData("access", token.access);
          authStore.access = ref(nuxtStorage.localStorage.getData("access"));
          options.headers.Authorization = `Bearer ${token.access}`;
          console.log(request, options.headers.Authorization);
          // options.headers.authorization = `Bearer ${token.value}`;
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

  return { getProjects, projects };
});
