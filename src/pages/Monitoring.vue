<template>
  <MyDataTable
      :objects="objects"
      :loading="loading"
      :array="array"
      :filters="filters"
      :options="{types: types}"
      :rowClass="rowClass"
      :pagination="true"
      filterDisplay="row"
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
      objects: this.$store.state.object.objects,
      types: null,
      filters: {
        objectType: { value: null, matchMode: FilterMatchMode.IN }
      },
      array: [
        {header: 'Объект', field: 'object_name', sortable: true, link: "object", param: 'object_id'},
        {header: 'Тип', filterField: 'objectType', data: {data: 'objectType', key: 'object_type'}, slotProps: 'object_type', optionLabel: 'object_type', option: 'types', placeholder: 'Тип'},
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
    async getAllTypes() {
      try {
        let types = await objectapi.getAllObjectTypes();
        this.types = types.data;
        this.loading = false
      } catch (e) {
        this.$toast.add({severity: 'error', detail: 'Произошла ошибка', life: 3000});
      }
    },
    rowClass(data) {
      return [
        { 'bg-green-300': data['event']['eventType']['event_type'] === 'Замер положителен' },
        { 'bg-yellow-200': data['event']['eventType']['event_type'] === 'Нулевой дебит' },
        { 'bg-yellow-200': data['event']['eventType']['event_type'] === 'Отсутствует связь' }
      ];
    },
  },
  mounted() {
    this.getAllTypes();
  }
}
</script>