import { useAuth } from "~/store/auth";
import { storeToRefs } from "pinia";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const AuthStore = useAuth();
  const { tokens } = storeToRefs(AuthStore);

  if (!tokens.value) {
    console.log(!!tokens.value, "invalid auth from middleware");
    return navigateTo("/accounts/login/");
  } else {
    console.log(!!tokens.value, "we good from middleware");
  }
});
