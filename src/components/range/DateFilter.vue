<template>
    <form class="flex justify-content-center align-items-center p-3 gap-2" @submit.prevent="submit">
        <p>Период:</p>
        <Calendar v-model="date" />
<!--        <Calendar v-model="date" view="month" dateFormat="mm/yy" />-->
        <Button type="submit" label="обновить" severity="secondary" icon="pi pi-sync"/>
    </form>
</template>

<script>
export default {
    name: "DateFilter",
    data() {
        return {
            date: null
        }
    },
    methods: {
        submit() {
            this.$emit('date',
                this.date ? this.date.toLocaleDateString('sv-SE') : null,
            );
        }
    }
}
</script>