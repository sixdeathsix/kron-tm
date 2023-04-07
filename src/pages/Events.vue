<template>
    <form class="flex w-12 justify-content-center align-items-center p-3 gap-2" @submit.prevent="getEvents">
        <p>Период:</p>
        <Calendar v-model="date" />
        <Button type="submit" label="обновить" severity="secondary" icon="pi pi-sync"/>
    </form>
    <MyDataTable
        :array="eventColumns"
        :value="events"
        :loading="loading"
        :filters="filters"
        :pagination="true"
        filterDisplay="row"
        :options="{types: types, categories: categories, properties: properties}"
    />
</template>

<script>
import MyDataTable from "../components/datatables/MyDataTable.vue";
import eventapi from "../service/event.js";
import propertyapi from "../service/property.js";
import categoryapi from "../service/category.js";
import {FilterMatchMode} from "primevue/api";

export default {
    name: "Events",
    components: {MyDataTable},
    data() {
        return {
            events: null,
            types: null,
            categories: null,
            properties: null,
            loading: true,
            date: null,
            filters: {
                event_type: {value: null, matchMode: FilterMatchMode.IN},
                category: {value: null, matchMode: FilterMatchMode.IN},
                property_type: {value: null, matchMode: FilterMatchMode.IN}
            },
            eventColumns: [
                {header: 'Объект', field: 'object_name'},
                {header: '№ фл', field: 'flange_no'},
                {header: 'Событие', field: 'event_type', data: 'event_type', option: 'types'},
                {header: 'Категория', field: 'category', data: 'category', option: 'categories'},
                {header: 'Дата события', field: 'event_date', sortable: true},
                {header: 'Свойство', field: 'property_type', data: 'property_type', option: 'properties'},
                {header: 'Значение', field: 'value'}
            ],

        }
    },
    methods: {
        async getEvents() {
            try {
                this.loading = true;

                let [events, types, categories, properties] = await Promise.all([
                    eventapi.getAllEvents(
                        this.date != null ? this.date.toLocaleDateString('sv-SE') : null
                    ),
                    eventapi.getAllEventTypes(),
                    categoryapi.getAllCategoryTypes(),
                    propertyapi.getAllPropertyTypes()
                ]);

                this.events = events.data;
                this.types = types.data.map(a => a.event_type);
                this.categories = categories.data.map(a => a.category);
                this.properties = properties.data.map(a => a.property_type);

                this.loading = false;
            } catch (e) {
                this.$toast.add({severity: 'error', detail: 'Произошла ошибка', life: 3000});
            }
        },
    },
    mounted() {
        this.getEvents();
    }
}
</script>

<style scoped>

</style>