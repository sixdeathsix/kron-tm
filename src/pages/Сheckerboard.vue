<template>
    <DateMonthFilter @date="getData"/>
    <div class="flex w-12 justify-content-center align-items-center p-5 font-bold text-xl" v-if="getSelectedObject == null">
        Выберите дату и объект
    </div>
    <div class="w-12 flex" v-else>
        <MyDataTable
            :columns="checkerColumns"
            :value="object"
            :loading="loading"
            class="w-4"
            filterDisplay="none"
        />
        <ChartTypeBar :object="object" labels="event_date" label="Количество жидкости" data="value" class="h-30rem w-8 px-5"/>
    </div>
</template>

<script>
import MyDataTable from "../components/datatables/MyDataTable.vue";
import DateMonthFilter from "../components/range/DateMonthFilter.vue";
import eventapi from "../service/kron-tm-api-v1/event.js";
import ChartTypeBar from "../components/charts/ChartTypeBar.vue";

export default {
    name: "Checkerboard",
    components: {ChartTypeBar, DateMonthFilter, MyDataTable},
    data() {
        return {
            object: null,
            loading: true,
            checkerColumns: [
                {header: 'Дата', field: 'event_date'},
                {header: 'Объект', field: 'object_name'},
                {header: 'Значение', field: 'value'}
            ]
        }
    },
    methods: {
        getData(date) {
            if (this.getSelectedObject == null) return;

            this.loading = true;
            eventapi.getCheckerboard(this.getSelectedObject.object_id, date).then(res => {
                this.object = res.data;
                this.loading = false;
            }).catch(e => {
                this.$toast.add({severity: 'error', detail: 'Произошла ошибка', life: 3000});
            });
        }
    },
    computed: {
        getSelectedObject() {
            return this.$store.state.object.selectedObject;
        }
    },
    mounted() {
        this.getData();
    }
}
</script>

<style scoped>

</style>