<template>
    <DateFilter @date="getData" />
    <div class="flex w-12 justify-content-center align-items-center p-5 font-bold text-xl" v-if="getSelectedObject == null">
        Выберите дату и объект
    </div>
    <div class="w-12 flex" v-else>
        <MyDataTable
            :columns="checkerColumns"
            :value="object"
            :loading="loading"
            class="w-4"
            filterDisplay="none"
        />
        <ChartTypeBar :object="object" labels="event_date" label="Количество жидкости" data="value" class="h-30rem w-8 px-5"/>
    </div>
</template>

<script>
import MyDataTable from "../components/datatables/MyDataTable.vue";
import DateFilter from "../components/range/DateFilter.vue";
import eventapi from "../service/kron-tm-api-v1/event.js";
import ChartTypeBar from "../components/charts/ChartTypeBar.vue";

export default {
    name: "Twohours",
    components: {ChartTypeBar, DateFilter, MyDataTable},
    data() {
        return {
            object: null,
            loading: true,
            checkerColumns: [
                {header: 'Дата', field: 'event_date'},
                {header: 'Объект', field: 'object_name'},
                {header: 'Значение', field: 'value'}
            ]
        }
    },
    methods: {
        async getData(date) {
            if (this.getSelectedObject == null) return;

            this.loading = true;
            await eventapi.getTwohours(this.getSelectedObject.object_id, date).then(res => {
                this.object = res.data;
                this.loading = false;
                let arr = [];
                res.data.forEach((item, index) => {
                    arr.push(item.value - this.object[index - 1 < 0 ? 0 : index - 1].value);
                });
                for (let i = 0; i < arr.length; i++) {
                    this.object[i].value = arr[i];
                }
            }).catch(e => {
                this.$toast.add({severity: 'error', detail: 'Произошла ошибка', life: 3000});
            });
        }
    },
    computed: {
        getSelectedObject() {
            return this.$store.state.object.selectedObject;
        }
    },
    mounted() {
        this.getData();
    }
}
</script>