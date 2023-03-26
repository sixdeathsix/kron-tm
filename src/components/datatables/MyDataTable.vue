<template>
  <DataTable
      v-model:filters="filters"
      :value="objects"
      :filterDisplay="filterDisplay"
      :paginator="pagination"
      showGridlines
      :rows="10"
      :loading="loading"
      :rowClass="rowClass"
  >
    <template #empty>Ничего не найдено</template>
    <template #loading>Идёт загрузка данных. Подождите немного.</template>
    <template v-for="arr in array">
      <Column :header="arr.header" :sortable="false" v-if="!arr.filterField && arr.link">
        <template #body={data}>
          <router-link :to="{ name: arr.link, params: { id: data[arr.param] } }">{{data[arr.field]}}</router-link>
        </template>
      </Column>
      <Column :field="arr.field" :header="arr.header" :sortable="arr.sortable || false" v-if="!arr.filterField && !arr.link"></Column>
      <Column :header="arr.header" :filterField="arr.filterField" :showFilterMenu="false" style="width: 10vw" v-if="arr.filterField">
        <template #body="{ data }">
          <div class="flex align-items-center gap-2">
            <span>{{ data[arr.data.data][arr.data.key] }}</span>
          </div>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect v-model="filterModel.value" @change="filterCallback()" :options="options[arr.option]" :optionLabel="arr.optionLabel" :placeholder="arr.placeholder" class="p-column-filter" style="width: 10vw">
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
      'options',
      'rowClass',
      'pagination',
      'filterDisplay'
  ],
  data () {
    return {
      filters: this.filters
    }
  }
}
</script>
