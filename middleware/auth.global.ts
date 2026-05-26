export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('auth_token');

  const authPages = [
    '/auth/login',
    '/auth/register',
    '/auth/register/contactinfo',
    '/auth/register/registration'
  ]

  if(authPages.includes(to.path) && token.value != null) {
    return navigateTo('/dashboard');
  }

  if(!authPages.includes(to.path) && token.value == null) {
    return navigateTo('/auth/login');
  }

  
}
)