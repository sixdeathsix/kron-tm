<template>
    <form class="flex justify-content-center align-items-center p-3 gap-2" @submit.prevent="submit">
        <p>Период:</p>
        <Calendar v-model="date_start" />
        -
        <Calendar v-model="date_end" />
        <Button type="submit" label="обновить" severity="secondary" icon="pi pi-sync"/>
    </form>
</template>

<script>
export default {
    name: "DateRangeFilter",
    data() {
        return {
            date_start: null,
            date_end: null
        }
    },
    methods: {
        submit() {
            this.$emit('date',
                this.date_start ? this.date_start.toLocaleDateString('sv-SE') : null,
                this.date_end ? this.date_end.toLocaleDateString('sv-SE') : null
            );
        }
    }
}
</script>