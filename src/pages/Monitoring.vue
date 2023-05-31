<template>
    <MyDataTable
        :columns="objectColumns"
        :value="objects"
        :loading="loading"
        :empty="empty"
        :pagination="true"
        :headers="headers"
        icon="pi pi-file-excel"
        :xlsxname="'Мониторинг за' + ' ' + new Date(Date.now()).toLocaleDateString()"
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
            empty: false,
            headers: ["Номер объекта", "Объект", "Тип объекта", "Номер фланца", "Описание", "Событие", "Дата события", "Текущие сутки", "Пред сутки"],
            objectColumns: [
                {header: 'Объект', field: 'object_name', sortable: true, link: {name: "object", param: 'object_id'}},
                {header: 'Тип', field: 'object_type', data: 'object_type', option: 'types'},
                {header: '№ фл', field: 'flange_no', sortable: true},
                {header: 'Описание', field: 'description', sortable: true},
                {header: 'Накоп пред сут', field: 'tomorrow_value', sortable: true},
                {header: 'Накоп тек сут', field: 'value', sortable: true},
                {header: 'Событие', field: 'event_type', sortable: true},
                {header: 'Дата события', field: 'event_date', sortable: true},
            ]
        }
    },
    methods: {
        async getMonitoring() {
            await objectapi.getAllMonitoringObjects().then(res => {
                this.objects = res.data;
            }).catch(e => {
                if(e.response.data === 'Ничего не найдено') {
                    return this.empty = true;
                }
                this.$toast.add({severity: 'error', detail: 'Произошла ошибка', life: 3000});
            });
            this.loading = false;
        }
    },
    mounted() {
        this.getMonitoring();
    }
}
</script>