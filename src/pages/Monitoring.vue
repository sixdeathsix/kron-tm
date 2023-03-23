<template>
  <MyDataTable
      :objects="objects"
      :loading="loading"
      :array="array"
      :filters="filters"
      :options="{types: types}"
  />
</template>

<script>
import objectapi from "../service/object";
import { FilterMatchMode } from "primevue/api";
import MyDataTable from "../components/datatables/MyDataTable.vue";

export default {
  components: {MyDataTable},
  data() {
    return {
      loading: true,
      objects: null,
      types: null,
      filters: {
        objectType: { value: null, matchMode: FilterMatchMode.IN }
      },
      array: [
        {header: 'Объект', field: 'object_name', sortable: true},
        {header: 'Тип', filterField: 'objectType', data: {data: 'objectType', key: 'object_type'}, slotProps: 'object_type'},
        {header: '№ фл', field: 'flange_no', sortable: true},
        {header: 'Описание', field: 'description', sortable: true},
        {header: 'Накоп пред сут', field: '', sortable: true},
        {header: 'Накоп тек сут', field: ''},
        {header: 'Qреж м3/сут', field: ''},
        {header: 'Qсут м3/сут', field: ''},
        {header: 'Отк от режима, м3', field: ''},
        {header: 'Рлин, атм', field: ''},
        {header: 'Событие', field: 'event.eventType.event_type', sortable: true},
        {header: 'Дата события', field: 'event.event_date', sortable: true},
      ]
    }
  },
  methods: {
    async getAllData() {
      try {
        let [objects, types] = await Promise.all([objectapi.getAllObjects(), objectapi.getAllObjectTypes()]);
        this.objects = objects.data;
        this.types = types.data;
        this.loading = false;
      } catch (e) {
        this.$toast.add({severity: 'error', detail: 'Произошла ошибка', life: 3000});
      }
    }
  },
  mounted() {
    this.getAllData();
  }
}
</script>