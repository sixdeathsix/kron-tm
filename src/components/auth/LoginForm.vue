<template>
    <form class="w-full xl:w-5 p-3" @submit.prevent="auth">
        <p class="text-center text-xl xl:text-3xl font-bold mb-3">Авторизация в систему КРОН-ТМ</p>
        <InputText placeholder="Введите логин" type="text" class="w-full mb-3" v-model="username" required/>
        <InputText placeholder="Введите пароль" type="password" class="w-full mb-3" v-model="password" required/>
        <Button type="submit" label="Войти" class="w-full mb-3" :disabled="password.length < 6"/>
    </form>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        async auth() {
            await this.$store.dispatch('onLogin', {
                username: this.username,
                password: this.password
            }).catch((e) => {
                this.$toast.add({severity: 'error', detail: e.response.data, life: 3000});
            });
        }
    }
}
</script>