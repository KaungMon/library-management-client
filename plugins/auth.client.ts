export default defineNuxtPlugin(async () => {
  const {authLoaded, fetchUser, userId} = useAuth();
  if (!authLoaded.value) {
    await fetchUser();
  }else {
    userId.value = null;
  }
})
