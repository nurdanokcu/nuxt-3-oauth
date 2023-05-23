<script setup>
definePageMeta({
  layout: false,
})
const {signIn, status, getCsrfToken, data} = useAuth()
const access_token = ref(null)
onMounted(async () => {
  if(status.value === 'authenticated') {
    access_token.value = await getCsrfToken()
    if (window.opener == null) {
      window.location = "/"
    };
    console.log(window.location.origin);
    const userName = data.value.user.name 
    window.opener.postMessage({access_token: access_token.value, userName: userName}, window.location.origin);
    window.close();
     return;
  }
  await signIn('google')
})


</script>
<template>
  <div class="wait">
    <p>Please wait...</p>
  </div>
</template>

<style scoped>
.wait {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>