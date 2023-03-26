<template>
  <div class="router-container">
    <router-link class="router" :to="{name: 'monitoring'}">Мониторинг свойств</router-link>
  </div>
</template>

<script>
export default {
  name: "Router"
}
</script>

<style scoped>
.router-container {
  padding: 20px 0;
}

.router {
  color: #495057;
  text-decoration: none;
  margin-right: 20px;
}
</style>