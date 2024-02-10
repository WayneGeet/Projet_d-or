export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path === "/") {
    return navigateTo("/projects/");
  } else return;
});
