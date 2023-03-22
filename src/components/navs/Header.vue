<template>
  <div class="flex justify-content-between align-items-center p-4">

    <div class="">
      <h3>Система КРОН-ТМ</h3>
    </div>

    <div class="">
        <div class="flex align-items-center px-3">
          <p class="font-medium text-xl px-3 border-right-2">{{user.username}}</p>
          <Button severity="secondary" @click="logout" class="mx-3" label="Выход" icon="pi pi-user" size="small" outlined  />
        </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.state.user.user
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('onLogout');
    },
  }
}
</script>