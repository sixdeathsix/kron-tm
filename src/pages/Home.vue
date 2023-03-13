<template>
  homepage
  <Button @click="logout" label="Logout" class="w-full mb-3" />
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    logout() {
      this.$store.dispatch('onLogout');
    }
  }
}
</script>

<style scoped>

</style>