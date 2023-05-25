<template>
    <div class="flex justify-content-between align-items-center p-4">
        <h3>Система КРОН-ТМ</h3>

        <div class="flex align-items-center px-3">
            <p class="font-bold text-l px-2 text-primary">{{ user.username }}, </p>
            <p class="font-bold text-l cursor-pointer" @click="logout">выход</p>
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