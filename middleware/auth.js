import { useAuth } from "~/store/auth";
import { storeToRefs } from "pinia";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const AuthStore = useAuth();
  const { user } = storeToRefs(AuthStore);

  if (!user.value) {
    console.log(user, "invalid auth from middleware");
    return navigateTo("/accounts/login/");
  } else {
    console.log(user.value, "we good from middleware");
  }
});
