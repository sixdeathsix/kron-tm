<template>
    <Header v-if="token != null"/>
    <div class="container">
        <Router v-if="token != null"/>
        <router-view/>
    </div>
    <Toast position="top-right"/>
</template>

<script>

import Header from "./components/navs/Header.vue";
import Router from "./components/navs/Router.vue";

export default {
    components: {Router, Header},
    data() {
        return {
            token: this.$store.state.user.user.token
        }
    },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
}

.container {
    max-width: 1600px;
    margin: 0 auto;
}
</style>
