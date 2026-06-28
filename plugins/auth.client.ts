export default defineNuxtPlugin(async () => {
  const {authLoaded, fetchUser} = useAuth();
  if (!authLoaded.value) {
    await fetchUser();
    
  }
})
