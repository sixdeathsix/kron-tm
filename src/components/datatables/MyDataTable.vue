<template>
    <DataTable
        :value="value"
        :loading="loading"
        v-model:filters="filters"
        :paginator="pagination"
        showGridlines
        :rows="10"
        :filterDisplay="filterDisplay"
        :rowClass="rowClass"
    >
        <template #empty>Ничего не найдено</template>
        <template #loading>Идёт загрузка данных. Подождите немного.</template>
        <template v-for="arr in array">
            <Column :field="arr.field" :header="arr.header" :sortable="arr.sortable || false" v-if="!arr.data">
                <template #body={data}>
                    <router-link :to="{ name: arr.link, params: { id: data[arr.param] } }" v-if="arr.link">
                        {{ data[arr.field] }}
                    </router-link>
                    <p v-else>{{ data[arr.field] }}</p>
                </template>
            </Column>

            <Column :header="arr.header" :field="arr.field" :showFilterMenu="false" style="width: 10vw" v-if="arr.data">
                <template #filter="{ filterModel, filterCallback }">
                    <MultiSelect v-model="filterModel.value" @change="filterCallback()" :options="options[arr.option]"
                                 :placeholder="arr.placeholder || arr.header" class="p-column-filter"
                                 style="width: 10vw">
                        <template #option="slotProps">
                            <span>{{ slotProps.option }}</span>
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
        'array',
        'value',
        'loading',
        'filters',
        'options',
        'pagination',
        'filterDisplay'
    ],
    data() {
        return {
            filters: this.filters
        }
    },
    methods: {
        rowClass(data) {
            return [
                {'bg-green-300': data['event_type'] === 'Замер положителен'},
                {'bg-yellow-200': data['event_type'] === 'Нулевой дебит' || data['event_type'] === 'Отсутствует связь'}
            ];
        }
    }
}
</script>
