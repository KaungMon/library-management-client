export default defineNuxtRouteMiddleware((to) => {
  const currentStep = useState('reg_step').value || '1';

  if(to.path === '/auth/register/contactinfo' && currentStep !== '2' && currentStep !== '3') {
    return navigateTo('/auth/register');
  }
  if(to.path === '/auth/register/registration' && currentStep !== '3') {
    if(currentStep === '2') {
      return navigateTo('/auth/register/contactinfo');
    }
    return navigateTo('/auth/register');
  }
})