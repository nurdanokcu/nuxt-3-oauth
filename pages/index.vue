<script setup>
const { status, signOut, data, getCsrfToken, signIn } = useAuth()
const popup = ref(null);
const loading = ref(false);
const name = ref(data.value?.user?.name);

const handleSignoutGoogle = async () => {
  await signOut();
  console.log('signed out');
}

const handleConnectGoogle = () => {
  popup.value = window.open('/auth/google', 'popup', 'popup=true');
  loading.value = true;
}

onMounted(() => {
  window.addEventListener('message', receiveMessage, false);
})

async function receiveMessage(event) {
  if (event.origin !== window.location.origin) {
    console.warn(`Message received by ${event.origin}; IGNORED.`);
    return;
  }

  const {access_token, userName} = event.data;
  
  if (access_token) {
    console.log(access_token);
    name.value = userName;
    window.removeEventListener('message', receiveMessage, false);
    loading.value = false;
  }
}
const success = computed(() => {
  if (name.value) {
    return true;
  }
  return status.value === 'authenticated';
})
</script>


<template>
  <div class="test">
    <h1>OAuth</h1>
  </div>
</template>

<style scoped>
.test{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 100px);
}
</style>
