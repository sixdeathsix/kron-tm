<template>
    <DateFilter @date="getData" />
    <MyDataTable

    />
</template>

<script>
import MyDataTable from "../components/datatables/MyDataTable.vue";
import DateFilter from "../components/range/DateFilter.vue";

export default {
    name: "Сheckerboard",
    components: {DateFilter, MyDataTable},
    data() {
        return {
            loading: true,
            checkerColumns: [
                {header: 'Дата', field: 'event_date'},
                {header: 'Значение', field: ''}
            ]
        }
    },
    methods: {
        getData(date) {

        }
    }
}
</script>

<style scoped>

</style>