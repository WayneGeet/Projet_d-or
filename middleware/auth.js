import { useAuth } from "~/store/auth";
import { storeToRefs } from "pinia";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const AuthStore = useAuth();
  const { access } = storeToRefs(AuthStore);

  if (!access.value) {
    console.log(!!access, "invalid auth from middleware");
    return navigateTo("/accounts/login/");
  } else {
    console.log(!!access.value, "we good from middleware");
  }
});
