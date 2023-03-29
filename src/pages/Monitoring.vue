<template>
    <MyDataTable
        :array="array"
        :value="objects"
        :loading="loading"
        :filters="filters"
        :pagination="true"
        filterDisplay="row"
        :options="{types: types}"
    />
</template>

<script>
import objectapi from "../service/object";
import {FilterMatchMode} from "primevue/api";
import MyDataTable from "../components/datatables/MyDataTable.vue";

export default {
    components: {MyDataTable},
    data() {
        return {
            objects: this.$store.state.object.objects,
            types: null,
            loading: true,
            filters: {
                object_type: {value: null, matchMode: FilterMatchMode.IN}
            },
            array: [
                {header: 'Объект', field: 'object_name', sortable: true, link: {name: "object", param: 'object_id'}},
                {header: 'Тип', field: 'object_type', data: 'object_type', option: 'types'},
                {header: '№ фл', field: 'flange_no', sortable: true},
                {header: 'Описание', field: 'description', sortable: true},
                {header: 'Накоп пред сут', field: '', sortable: true},
                {header: 'Накоп тек сут', field: ''},
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
        async getAllTypes() {
            try {
                let types = await objectapi.getAllObjectTypes();
                this.types = types.data.map(a => a.object_type);
                this.loading = false;
            } catch (e) {
                this.$toast.add({severity: 'error', detail: 'Произошла ошибка', life: 3000});
            }
        },
    },
    mounted() {
        this.getAllTypes();
    }
}
</script>