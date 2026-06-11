export default defineNuxtRouteMiddleware(async (to) => {
  const { userId } = useAuth();

  const authPages = [
    "/auth/login",
    "/auth/register",
    "/auth/register/contactinfo",
    "/auth/register/registration",
  ];

  if (authPages.includes(to.path) && userId.value)
    return navigateTo("/dashboard");
  if (!authPages.includes(to.path) && !userId.value)
    return navigateTo("/auth/login");
});
