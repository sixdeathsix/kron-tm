<template>
  <DataTable :value="filteredObjects" paginator showGridlines :rows="10" :loading="loading">
    <Column field="object_name" header="Объект" sortable></Column>
    <Column field="objectType.object_type">
      <template #header>
        <Dropdown style="width: 10vw" v-model="selectedType" @change="filter" :options="types" :placeholder="selectedType" class="p-column-filter" showClear>
          <template #option="slotProps">
            <p>{{slotProps.option.object_type}}</p>
          </template>
        </Dropdown>
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

export default {
  data() {
    return {
      objects: null,
      filteredObjects: null,
      loading: true,
      selectedType: "Тип",
      types: null
    }
  },
  methods: {
    async getAllData() {
      try {
        let [objects, types] = await Promise.all([objectapi.getAllObjects(), objectapi.getAllObjectTypes()]);
        this.objects = objects.data;
        this.filteredObjects = objects.data;
        this.types = types.data;
        this.loading = false;
      } catch (e) {
        this.$toast.add({severity: 'error', detail: 'Произошла ошибка', life: 3000});
      }
    },
    filter() {
      if (this.selectedType === null) {
        this.selectedType = "Тип";
        this.filteredObjects = this.objects;
      } else {
        this.filteredObjects = this.objects.filter((i) => i.objectType.object_type === this.selectedType.object_type)
        this.selectedType = this.selectedType.object_type;
      }
    }
  },
  mounted() {
    this.getAllData();
  }
}
</script>