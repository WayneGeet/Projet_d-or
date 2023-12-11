import { useAuth } from "~/store/auth";
export default defineNuxtRouteMiddleware((to, from) => {
  const AuthStore = useAuth();
  if (AuthStore.isAuthenticated === false) {
    console.log(AuthStore.isAuthenticated, " you are not registered");
    return navigateTo("/accounts/login/");
  } else {
  }
});
