<template>
    <DateRangeFilter @date="getData" />
    <div class="flex w-12 justify-content-center align-items-center p-5 font-bold text-xl" v-if="getSelectedObject == null">
        Выберите дату и объект
    </div>
    <ChartTypeLine :object="object" labels="event_date" label="Количество жидкости" data="value" class="h-30rem w-12 px-5" />
</template>

<script>
import DateRangeFilter from "../components/range/DateRangeFilter.vue";
import eventapi from "../service/kron-tm-api-v1/event.js";
import ChartTypeLine from "../components/charts/ChartTypeLine.vue";

export default {
    name: "Trends",
    components: {ChartTypeLine, DateRangeFilter},
    data() {
        return {
            object: null,
        };
    },
    methods: {
        getData(start, end) {
            if (this.getSelectedObject == null) return;

            eventapi.getTrends(this.getSelectedObject.object_id, start, end).then(res => {
                this.object = res.data;
            }).catch(e => {
                this.$toast.add({severity: 'error', detail: 'Произошла ошибка', life: 3000});
            });
        }
    },
    computed: {
        getSelectedObject() {
            return this.$store.state.object.selectedObject;
        }
    }
};
</script>