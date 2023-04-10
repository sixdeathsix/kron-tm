<template>
    <div class="router-container flex justify-content-between align-items-center">
        <div class="">
            <router-link class="router" :to="{name: 'monitoring'}">Мониторинг свойств</router-link>
            <router-link class="router" :to="{name: 'events'}">События</router-link>
            <Dropdown v-model="selectedLink" @change="archiveRoute" :options="links" optionLabel="name" placeholder="Архив значений" class="border-none" />
            <router-link class="router" :to="{name: 'trends'}">Тренды</router-link>
            <router-link class="router" :to="{name: 'objects'}" v-if="user.user_role == 'ROLE_ADMIN'">Все объекты</router-link>
        </div>
        <Dropdown v-model="getSelectedObject" @change="redirect" :options="getObjects" showClear filter optionLabel="object_name" placeholder="Все объекты" />
    </div>
</template>

<script>

export default {
    name: "Router",
    data() {
        return {
            user: this.$store.state.user.user,
            selectedLink: null,
            links: [
                {name: 'Шахматка жидкости', to: 'checkerboard'},
                {name: '2-х часовки жидкости', to: 'twohours'}
            ]
        }
    },
    methods: {
        redirect(e) {
            if (e.value === null && this.$route.fullPath.startsWith('/object')) {
                this.$router.push({name: 'monitoring'});
            }

            if (this.$route.fullPath.startsWith('/object') || this.$route.fullPath === '/') {
                this.$router.push({name: 'object', params: {id: e.value.object_id}});
            }

            this.$store.commit('setSelectedObject', e.value);
        },
        checkRoute() {
            if (this.$route.fullPath === '/') {
                return this.$store.commit('setSelectedObject', null);
            }

            if (this.$route.fullPath.startsWith('/object')) {
                return this.$store.commit('setSelectedObject', this.getObjects.filter(obj => obj.object_id == this.$route.params.id)[0]);
            }
        },
        archiveRoute(e) {
            this.$router.push({name: e.value.to});
        }
    },
    computed: {
        getObjects() {
            return this.$store.state.object.objects;
        },
        getSelectedObject() {
            return this.$store.state.object.selectedObject;
        }
    },
    created() {
        this.$watch(
            () => this.$route,
            () => this.checkRoute()
        );
    },
    mounted() {
        this.$store.dispatch('getObjects');
    }
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