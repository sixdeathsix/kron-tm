<template>
    <MyDataTable
        :columns="propertyColumns"
        :value="objectProperties"
        :loading="loading"
        :empty="empty"
        filterDisplay="none"
    />
    <div class="flex justify-content-center align-items-center">
        <DateRangeFilter @date="getObjectEvents" />
        <Button label="Показать на карте" @click="visible = true" />
    </div>
    <MyDataTable
        :columns="eventColumns"
        :value="objectEvents"
        :loading="loading"
        :pagination="true"
        :headers="headers"
        icon="pi pi-file-excel"
        :xlsxname="getSelectedObject.object_name + ' ' + new Date(Date.now()).toLocaleDateString()"
    />
    <Dialog v-model:visible="visible" modal dismissableMask :style="{ width: '50vw' }">
        <Map :coordinates="[objectEvents[0].loc_x, objectEvents[0].loc_y]" />
    </Dialog>
</template>

<script>
import eventapi from "../service/kron-tm-api-v1/event.js";
import propertyapi from "../service/kron-tm-api-v1/property.js";
import MyDataTable from "../components/datatables/MyDataTable.vue";
import Map from "../components/maps/Map.vue";
import DateRangeFilter from "../components/range/DateRangeFilter.vue";

export default {
    components: {DateRangeFilter, Map, MyDataTable},
    data() {
        return {
            objectEvents: null,
            objectProperties: null,
            loading: true,
            empty: false,
            visible: false,
            headers: ["Объект", "Номер фланца", "Событие", "Категория", "Дата события", "Свойство", "Значение", "x", "y"],
            eventColumns: [
                {header: 'Объект', field: 'object_name'},
                {header: '№ фл', field: 'flange_no'},
                {header: 'Событие', field: 'event_type', data: 'event_type', option: 'events'},
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
                {header: 'Событие', field: 'event_type'}
            ]
        }
    },
    methods: {
        async getObjectEvents(start, end) {
            if (this.getSelectedObject === null) return;

            try {
                this.loading = true;

                let [objectEvents, objectProperties] = await Promise.all([
                    eventapi.getOneObjectEvents(this.getSelectedObject.object_id, start || null, end || null),
                    propertyapi.getObjectProperties(this.getSelectedObject.object_id)
                ]);

                this.objectEvents = objectEvents.data;
                this.objectProperties = objectProperties.data;

                this.loading = false;
            } catch (e) {
                this.loading = false;
                this.empty = true;
                this.$toast.add({severity: 'error', detail: 'Произошла ошибка', life: 3000});
            }
        },
    },
    computed: {
        getSelectedObject() {
            return this.$store.state.object.selectedObject;
        }
    },
    created() {
        this.$watch(
            () => this.$route,
            () => this.getObjectEvents()
        );
    },
    mounted() {
        this.getObjectEvents();
    }
}
</script>