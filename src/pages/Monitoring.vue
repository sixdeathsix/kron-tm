<template>
    <MyDataTable
        :columns="objectColumns"
        :value="objects"
        :loading="loading"
        :pagination="true"
    />
</template>

<script>
import objectapi from "../service/kron-tm-api-v1/object.js";
import MyDataTable from "../components/datatables/MyDataTable.vue";

export default {
    components: {MyDataTable},
    data() {
        return {
            objects: null,
            loading: true,
            objectColumns: [
                {header: 'Объект', field: 'object_name', sortable: true, link: {name: "object", param: 'object_id'}},
                {header: 'Тип', field: 'object_type', data: 'object_type', option: 'types'},
                {header: '№ фл', field: 'flange_no', sortable: true},
                {header: 'Описание', field: 'description', sortable: true},
                {header: 'Накоп пред сут', field: 'tomorrow_value', sortable: true},
                {header: 'Накоп тек сут', field: 'value', sortable: true},
                {header: 'Qреж м3/сут', field: ''},
                {header: 'Qсут м3/сут', field: ''},
                {header: 'Отк от режима, м3', field: ''},
                {header: 'Рлин, атм', field: ''},
                {header: 'Событие', field: 'event_type', sortable: true},
                {header: 'Дата события', field: 'event_date', sortable: true},
            ]
        }
    },
    methods: {
        getMonitoring() {
            objectapi.getAllMonitoringObjects().then(res => {
                this.objects = res.data;
                this.loading = false;
            }).catch(e => {
                this.$toast.add({severity: 'error', detail: 'Произошла ошибка', life: 3000});
            });
        }
    },
    mounted() {
        this.getMonitoring();
    }
}
</script>