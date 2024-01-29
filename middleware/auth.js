import { useAuth } from "~/store/auth";
import { storeToRefs } from "pinia";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const AuthStore = useAuth();
  const { access_refresh } = storeToRefs(AuthStore);

  if (!access_refresh.value) {
    console.log(!!access_refresh, "invalid auth from middleware");
    return navigateTo("/accounts/login/");
  } else {
    console.log(!!access_refresh.value, "we good from middleware");
  }
});
