<template>
    <MyDataTable
        :array="propertyColumns"
        :value="objectProperties"
        :loading="loading"
    />
    <form class="flex w-12 justify-content-center align-items-center p-3 gap-2" @submit.prevent="getObjectEvents">
        <p>Период:</p>
        <Calendar v-model="date_start" showTime hourFormat="24"/>
        -
        <Calendar v-model="date_end" showTime hourFormat="24"/>
        <Button type="submit" label="обновить" severity="secondary" icon="pi pi-sync"/>
        <Button label="Показать на карте" @click="visible = true" />
    </form>
    <MyDataTable
        :array="eventColumns"
        :value="objectEvents"
        :loading="loading"
        :filters="filters"
        :pagination="true"
        filterDisplay="row"
        :options="{types: types, categories: categories, properties: properties}"
    />
    <Dialog v-model:visible="visible" modal dismissableMask :style="{ width: '50vw' }">
        <Map :coordinates="[objectEvents[0].loc_x, objectEvents[0].loc_y]" />
    </Dialog>
</template>

<script>
import eventapi from "../service/event";
import categoryapi from "../service/category";
import propertyapi from "../service/property";
import {FilterMatchMode} from "primevue/api";
import MyDataTable from "../components/datatables/MyDataTable.vue";
import Map from "../components/maps/Map.vue";

export default {
    components: {Map, MyDataTable},
    data() {
        return {
            objectEvents: null,
            objectProperties: null,
            types: null,
            categories: null,
            properties: null,
            loading: true,
            date_start: null,
            date_end: null,
            visible: false,
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
            propertyColumns: [
                {header: '№ фл', field: 'flange_no'},
                {header: 'Свойство', field: 'property_type'},
                {header: 'Путь', field: 'path'},
                {header: 'Значение', field: 'value'},
                {header: 'Единица измерения', field: 'value_type'},
                {header: 'Дата обновления', field: 'event_date'},
                {header: 'Событие', field: 'event_type'},
            ]
        }
    },
    methods: {
        async getObjectEvents() {
            try {
                this.loading = true;

                let [objectEvents, objectProperties, types, categories, properties] = await Promise.all([
                    eventapi.getOneObjectEvents(
                        this.$route.params.id,
                        this.date_start != null ? this.date_start.toLocaleDateString('sv-SE') + ' ' + this.date_start.toLocaleTimeString() : null,
                        this.date_end != null ? this.date_end.toLocaleDateString('sv-SE') + ' ' + this.date_end.toLocaleTimeString() : null
                    ),
                    propertyapi.getObjectProperties(this.$route.params.id),
                    eventapi.getAllEventTypes(),
                    categoryapi.getAllCategoryTypes(),
                    propertyapi.getAllPropertyTypes()
                ]);

                this.objectEvents = objectEvents.data;
                this.objectProperties = objectProperties.data;
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
        this.getObjectEvents();
    },
    created() {
        this.$watch(
            () => this.$route.params,
            () => this.getObjectEvents()
        );
    },
}
</script>