<template>
    <DataTable
            :value="value"
            :loading="loading"
            :empty="empty"
            v-model:filters="filters"
            :paginator="pagination"
            showGridlines
            :rows="10"
            :rowClass="rowClass"
            filterDisplay="row"
            @row-dblclick="dblclick"
    >
        <template #empty>
            <div class="flex w-12 justify-content-center align-items-center p-3 font-bold text-xl">
                Ничего не найдено
            </div>
        </template>
        <template #loading>
            <div class="flex w-12 justify-content-center align-items-center p-3 font-bold text-xl">
                Идёт загрузка данных.Подождите немного.
            </div>
        </template>
        <template #paginatorstart v-if="paginatorend">
        </template>
        <template #paginatorend v-if="paginatorend">
            <Button type="button" @click="paginatorendFunc" icon="pi pi-plus" severity="success" autofocus />
        </template>

        <template v-for="col in columns">
            <Column :field="col.field" :header="col.header" :sortable="col.sortable || false" v-if="!col.data">
                <template #body={data}>
                    <router-link :to="{ name: col.link.name, params: { id: data[col.link.param] } }" v-if="col.link">
                        {{ data[col.field] }}
                    </router-link>
                    <p v-else>{{ data[col.field] }}</p>
                </template>
            </Column>

            <Column :header="col.header" :field="col.field" :showFilterMenu="false" style="width: 10vw" v-if="col.data">
                <template #filter="{ filterModel, filterCallback }">
                    <MultiSelect
                            v-model="filterModel.value"
                            @change="filterCallback()"
                            :options="(getOptions[col.option] || []).map(opt => opt[col.field])"
                            :placeholder="col.placeholder || col.header"
                            class="p-column-filter"
                            style="width: 10vw"
                    >
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

import {FilterMatchMode} from "primevue/api";
import eventapi from "../../service/kron-tm-api-v1/event.js";
import categoryapi from "../../service/kron-tm-api-v1/category.js";
import propertyapi from "../../service/kron-tm-api-v1/property.js";
import objectapi from "../../service/kron-tm-api-v1/object.js";

export default {
    name: 'MyDataTable',
    props: [
        'columns',
        'value',
        'loading',
        'empty',
        'pagination',
        'dblclick',
        'paginatorend',
        'paginatorendFunc'
    ],
    data() {
        return {
            filters: {
                object_type: {value: null, matchMode: FilterMatchMode.IN},
                event_type: {value: null, matchMode: FilterMatchMode.IN},
                category: {value: null, matchMode: FilterMatchMode.IN},
                property_type: {value: null, matchMode: FilterMatchMode.IN}
            }
        }
    },
    methods: {
        log() {
            console.log(123)
        },
        rowClass(data) {
            return [
                {'bg-green-300': data['event_type'] === 'Замер положителен'},
                {'bg-yellow-200': data['event_type'] === 'Нулевой дебит' || data['event_type'] === 'Отсутствует связь'}
            ];
        }
    },
    computed: {
        getOptions() {
            return this.$store.state.object.options;
        },
    }
}
</script>
