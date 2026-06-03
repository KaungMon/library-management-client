export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useState("user");
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
