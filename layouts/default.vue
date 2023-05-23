<template>
  <nav>
    <ul>
      <li>
        <nuxt-link class="link" to="/">Home</nuxt-link>
      </li>
      <li>
        <nuxt-link class="link" to="/google">Google</nuxt-link>
      </li>
      <li>
        <nuxt-link class="link" to="/facebook">Facebook</nuxt-link>
      </li>
      <li>
        <nuxt-link class="link" to="/instagram">Instagram</nuxt-link>
      </li>
    </ul>
  </nav>
  <slot />
</template>

<script setup>

</script>

<style scoped>
ul{
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 0 200px;
  height: 100px;
  background-color:#171fd6;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}
.link {
  padding: 32px;
  color: #faf9f9;
  font-size: 18px;
  transition: all 0.3s ease;
}

.link:hover {
  color: #c2c6e3;
}
</style>