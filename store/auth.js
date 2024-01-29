import { defineStore } from "pinia";
import { getData, setData } from "nuxt-storage/local-storage";
import { jwtDecode } from "jwt-decode";

export const useAuth = defineStore("authentication", () => {
  const access_refresh = ref(getData("access_refresh"));
  const dayjs = useDayjs();

  const slug = ref("");
  // const loading = ref(false);
  const registration = async ({ fname, lname, email, id_no, password }) => {
    const { data, error } = await useFetch("/api/register", {
      method: "post",
      body: { fname, lname, email, id_no, password },
    });
    if (data.value) {
      return data;
    } else console.log(error.value);
  };

  const hasexp = () => {
    try {
      if (!access_refresh.value) {
        console.log(access_refresh, " this is access and refresh from hasexp");
        return ref("there's no access and refresh");
      }
      const expirationTime = ref(jwtDecode(access_refresh.value.access).exp);
      const isExpired = ref(dayjs.unix(expirationTime.value).diff(dayjs()) < 1);
      return isExpired;
    } catch (error) {
      console.log(error, " this is from has expired");
    }
  };
  console.log(hasexp(), "has they expired from authStore");

  const updateToken = async () => {
    const { data: token } = await useFetch("/api/refresh/", {
      method: "post",
      body: {
        refresh: access_refresh.value.refresh,
      },
    });
    setData("access_refresh", token.value, 15, "d");
    access_refresh.value = getData("access_refresh");
    return token.value;
  };

  const setAuthentication = async ({ email, password }) => {
    try {
      const { data: tokens } = await useFetch("/api/auth/", {
        method: "post",
        body: {
          email,
          password,
        },
      });
      // if (!tokens.value) {
      //   throw createError({
      //     statusCode: 401,
      //     message: "fetching tokens has failed",
      //   });
      //  }
      access_refresh.value = tokens.value;
      // slug.value = jwtDecode(access.value).slug;
      await getUser();
      setData("access_refresh", tokens.value, 15, "d");
      return tokens.value;
    } catch (error) {
      console.log(error);
    }
  };

  const unAuthenticate = () => {
    try {
      localStorage.clear();
      access_refresh.value = {};
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      console.log(access_refresh.value.access, " this is from get me");
      const { data, error } = await useFetch("http://127.0.0.1:8000/user/me/", {
        method: "get",
        headers: { Authorization: `Bearer ${access_refresh.value.access}` },
        // pick: "liked_projects",
        async onRequest({ request, options }) {
          if (!hasexp().value) return request;
          else {
            const token = await updateToken();
            options.headers.Authorization = `Bearer ${token.access}`;
            // checking if the local storage has expired
          }
        },
      });
      const response = await data.value;
      console.log(response.liked_projects, " this is me");
      setData("liked", response.liked_projects, 15, "d");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    access_refresh,
    setAuthentication,
    unAuthenticate,
    registration,
    slug,
    // getUser,
    hasexp,
    updateToken,
  };
});
