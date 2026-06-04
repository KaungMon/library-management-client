export default defineNuxtRouteMiddleware((to) => {
  const user = useCookie('user')

  const authPages = [
    "/auth/login",
    "/auth/register",
    "/auth/register/contactinfo",
    "/auth/register/registration",
  ];

  if (authPages.includes(to.path) && user.value) {
    return navigateTo("/dashboard");
  }

  if (!authPages.includes(to.path) && !user.value) {
    return navigateTo("/auth/login");
  }
});
