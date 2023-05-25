<template>
    <DateRangeFilter @date="getEvents"/>
    <MyDataTable
        :columns="eventColumns"
        :value="events"
        :loading="loading"
        :pagination="true"
        :headers="headers"
        icon="pi pi-file-excel"
        xlsxname="События"
    />
</template>

<script>
import MyDataTable from "../components/datatables/MyDataTable.vue";
import eventapi from "../service/kron-tm-api-v1/event.js";
import DateRangeFilter from "../components/range/DateRangeFilter.vue";

export default {
    name: "Events",
    components: {DateRangeFilter, MyDataTable},
    data() {
        return {
            events: null,
            loading: true,
            headers: ["Объект", "Номер фланца", "Событие", "Категория", "Дата события", "Свойство", "Значение", "x", "y"],
            eventColumns: [
                {header: 'Объект', field: 'object_name'},
                {header: '№ фл', field: 'flange_no'},
                {header: 'Событие', field: 'event_type', data: 'event_type', option: 'events'},
                {header: 'Категория', field: 'category', data: 'category', option: 'categories'},
                {header: 'Дата события', field: 'event_date', sortable: true},
                {header: 'Свойство', field: 'property_type', data: 'property_type', option: 'properties'},
                {header: 'Значение', field: 'value'}
            ]
        }
    },
    methods: {
        async getEvents(start, end) {
            this.loading = true;
            await eventapi.getAllEvents(this.getSelectedObject && this.getSelectedObject.object_id || '', start || null, end || null).then(res => {
                this.events = res.data;
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
    created() {
        this.$watch(
            () => this.getSelectedObject,
            () => this.getEvents()
        );
    },
    mounted() {
        this.getEvents();
    }
}
</script>