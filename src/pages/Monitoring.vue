<template>
  <DataTable v-model:filters="filters" :value="objects" filterDisplay="row" paginator showGridlines :rows="10" :loading="loading">
    <template #empty> No objects found. </template>
    <template #loading> Loading objects data. Please wait. </template>
    <Column field="object_name" header="Объект" sortable></Column>
    <Column header="Тип" filterField="objectType" :showFilterMenu="false" style="width: 10vw">
      <template #body="{ data }">
        <div class="flex align-items-center gap-2">
          <span>{{ data.objectType.object_type }}</span>
        </div>
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <MultiSelect v-model="filterModel.value" @change="filterCallback()" :options="types" optionLabel="object_type" placeholder="Тип" class="p-column-filter" style="width: 10vw">
          <template #option="slotProps">
              <span>{{ slotProps.option.object_type }}</span>
          </template>
        </MultiSelect>
      </template>
    </Column>
    <Column field="flange_no" header="№ фл" ></Column>
    <Column field="description" header="Описание" sortable ></Column>
    <Column field="" header="Накоп пред сут" ></Column>
    <Column field="" header="Накоп тек сут" ></Column>
    <Column field="" header="Qреж м3/сут" sortable ></Column>
    <Column field="" header="Qсут м3/сут" sortable ></Column>
    <Column field="" header="Отк от режима, м3" sortable ></Column>
    <Column field="" header="Рлин, атм" ></Column>
    <Column field="" header="Дата обновления" ></Column>
    <Column field="" header="Событие" sortable ></Column>
    <Column field="" header="Дата события" sortable ></Column>
  </DataTable>
</template>

<script>
import objectapi from "../service/object";
import { FilterMatchMode } from "primevue/api";

export default {
  data() {
    return {
      loading: true,
      objects: null,
      types: null,
      names: ['Скважина-12', 'Скважина-13', 'Скважина-14', 'КНС-2'],
      filters: {
        objectType: { value: null, matchMode: FilterMatchMode.IN },
        object_name: { value: null, matchMode: FilterMatchMode.IN }
      },
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