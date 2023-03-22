<template>
  <form class="w-full xl:w-5 p-3" @submit.prevent="register">
    <p class="text-center text-xl xl:text-3xl font-bold mb-3">Регистрация в системе КРОН-ТМ</p>
    <InputText placeholder="Фамилия" type="text" class="w-full mb-3" v-model="surname" required />
    <InputText placeholder="Имя" type="text" class="w-full mb-3" v-model="name" required />
    <InputText placeholder="Отчество" type="text" class="w-full mb-3" v-model="patronymic" required />
    <InputText placeholder="Электронный адрес" type="email" class="w-full mb-3" v-model="email" required />
    <InputMask placeholder="Номер телефона" date="phone" class="w-full mb-3" mask="+7 (999) 999-99-99" v-model="phone" required />
    <InputText placeholder="Имя пользователя" type="text" class="w-full mb-3" v-model="login" required />
    <InputText placeholder="Пароль" type="password" class="w-full mb-3" v-model="password" minlength="6" required />
    <InputText placeholder="Подтвердите пароль" type="password" class="w-full mb-3" v-model="password_confirm" minlength="6" required />
    <Button type="submit" label="Зарегистрироваться" class="w-full mb-3" />
  </form>
</template>

<script>
export default {
  data() {
    return {
      surname: '',
      name: '',
      patronymic: '',
      email: '',
      phone: '',
      login: '',
      password: '',
      password_confirm: ''
    }
  },
  methods: {
    register() {
      if (this.password !== this.password_confirm) {
        this.$toast.add({severity: 'error', detail: "Пароли не совпадают", life: 3000});
      } else
        this.$store.dispatch('onRegister', {
          surname: this.surname,
          name: this.name,
          patronymic: this.patronymic,
          email: this.email,
          phone: this.phone,
          username: this.login,
          password: this.password
        }).catch((e) => {
          this.$toast.add({
            severity:'error',
            detail: e.response.data === 'Пользователь уже зарегистрирован' ? e.response.data : 'Произошла ошибка',
            life: 3000
          });
        });
    },
  }
}
</script>