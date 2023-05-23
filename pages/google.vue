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

    <h1>Google OAuth</h1>
    <p>status: {{status}}</p>
    <button
      type="button"
      :class="['connect', {success}]"
      @click="handleConnectGoogle"
      :disabled="loading"
    >
    <span v-if="success">{{ name }}</span>
    <span v-else>
      {{ loading ? 'Loading...' : 'Connect Google'  }}
    </span>
    </button>
    <button
      type="button"
      class="connect"
      @click="handleSignoutGoogle"
    >
      Signout Google
    </button>
  </div>
</template>

<style scoped>
.test{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  height: calc(100vh - 100px);
}
.connect {
  padding: 10px 20px;
  border-radius: 5px;
  background-color: var(--blue-main);
  color: #fff;
  cursor: pointer;
}

.connect:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.connect.success {
  background-color: var(--green-approval);
}
</style>
