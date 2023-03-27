<template>
  <MyDataTable
      :objects="properties"
      :loading="loading"
      :array="propertyColumns"
  />
  <form class="flex w-12 justify-content-center align-items-center p-3 gap-2" @submit.prevent="getObjectEvents">
    <p>Период:</p>
    <Calendar v-model="date_start" showTime hourFormat="24" />
    -
    <Calendar v-model="date_end" showTime hourFormat="24" />
    <Button type="submit" label="обновить" severity="secondary" icon="pi pi-sync" />
  </form>
  <MyDataTable
      :objects="object"
      :loading="loading"
      :array="eventColumns"
      :filters="filters"
      :options="{types: types, categories: categories}"
      :rowClass="rowClass"
      :pagination="true"
      filterDisplay="row"
  />
</template>

<script>
import eventapi from "../service/event";
import categoryapi from "../service/category";
import propertyapi from "../service/property";
import { FilterMatchMode } from "primevue/api";
import MyDataTable from "../components/datatables/MyDataTable.vue";

export default {
  components: {MyDataTable},
  data() {
    return {
      object: null,
      types: null,
      categories: null,
      properties: null,
      loading: true,
      filters: {
        eventType: { value: null, matchMode: FilterMatchMode.IN },
        category: { value: null, matchMode: FilterMatchMode.IN }
      },
      eventColumns: [
        {header: 'Объект', field: 'property.object.object_name'},
        {header: '№ фл', field: 'property.object.flange_no'},
        {header: 'Событие', filterField: 'eventType', data: {data: 'eventType', key: 'event_type'}, slotProps: 'event_type', optionLabel: 'event_type', option: 'types', placeholder: 'Событие'},
        {header: 'Категория', filterField: 'category', data: {data: 'category', key: 'category'}, slotProps: 'category', optionLabel: 'category', option: 'categories', placeholder: 'Категория'},
        {header: 'Дата события', field: 'event_date', sortable: true},
        {header: 'Свойство', field: 'property.propertyType.property_type'},
        {header: 'Значение', field: 'value'}
      ],
      propertyColumns: [
        {header: '№ фл', field: 'object.flange_no'},
        {header: 'Свойство', field: 'propertyType.property_type'},
        {header: 'Путь', field: 'path.path'},
        {header: 'Значение', field: 'value'},
        {header: 'Единица измерения', field: 'valueType.value_type'},
        {header: 'Дата обновления', field: 'event_date'},
        {header: 'Событие', field: 'eventType.event_type'},
      ],
      date_start: null,
      date_end: null
    }
  },
  methods: {
    async getObjectEvents() {
      try {
        this.loading = true;
        let [object, types, categories, properties] = await Promise.all([
            eventapi.getOneObjectEvents(
                this.$route.params.id,
                this.date_start != null ? this.date_start.toLocaleDateString('sv-SE') + ' ' +  this.date_start.toLocaleTimeString() : null,
                this.date_end != null ? this.date_end.toLocaleDateString('sv-SE') + ' ' + this.date_end.toLocaleTimeString() : null
            ),
            eventapi.getAllEventTypes(),
            categoryapi.getAllCategoryTypes(),
            propertyapi.getObjectProperties(this.$route.params.id)
        ]);
        this.object = object.data;
        this.types = types.data;
        this.categories = categories.data;
        this.properties = properties.data;

        this.loading = false;
      } catch (e) {
        this.$toast.add({severity: 'error', detail: 'Произошла ошибка', life: 3000});
      }
    },
    rowClass(data) {
      return [
        { 'bg-green-300': data['eventType']['event_type'] === 'Замер положителен' },
        { 'bg-yellow-200': data['eventType']['event_type'] === 'Нулевой дебит' },
        { 'bg-yellow-200': data['eventType']['event_type'] === 'Отсутствует связь' }
      ];
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