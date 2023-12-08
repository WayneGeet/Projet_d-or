import { useAuth } from "~/store/auth";
export default defineNuxtRouteMiddleware((to, from) => {
  const AuthStore = useAuth();
  if (!AuthStore.user) {
    console.log(AuthStore.user, "this route has been ran");
    return navigateTo("/accounts/login/");
  } else {
  }
});
