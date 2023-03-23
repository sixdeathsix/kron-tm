<template>
  <DataTable v-model:filters="filters" :value="objects" filterDisplay="row" paginator showGridlines :rows="10" :loading="loading" >
    <template #empty>Ничего не найдено</template>
    <template #loading>Идёт загрузка данных. Подождите немного.</template>
    <template v-for="arr in array">
      <Column :field="arr.field" :header="arr.header" :sortable="arr.sortable || false" v-if="!arr.filterField"></Column>
      <Column header="Тип" :filterField="arr.filterField" :showFilterMenu="false" style="width: 10vw" v-if="arr.filterField">
        <template #body="{ data }">
          <div class="flex align-items-center gap-2">
            <span>{{ data[arr.data.data][arr.data.key] }}</span>
          </div>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect v-model="filterModel.value" @change="filterCallback()" :options="options.types" optionLabel="object_type" placeholder="Тип" class="p-column-filter" style="width: 10vw">
            <template #option="slotProps">
              <span>{{ slotProps.option[arr.slotProps] }}</span>
            </template>
          </MultiSelect>
        </template>
      </Column>
    </template>
  </DataTable>
</template>

<script>

export default {
  name: 'MyDataTable',
  props: [
      'objects',
      'loading',
      'array',
      'filters',
      'options'
  ],
  data () {
    return {
      filters: this.filters,
    }
  },
  mounted() {
    console.log(this.options)
  }
}
</script>