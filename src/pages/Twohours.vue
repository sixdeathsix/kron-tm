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
        />
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-30rem w-8 px-5"  />
    </div>

</template>

<script>
import MyDataTable from "../components/datatables/MyDataTable.vue";
import DateFilter from "../components/range/DateFilter.vue";
import eventapi from "../service/kron-tm-api-v1/event.js";

export default {
    name: "Twohours",
    components: {DateFilter, MyDataTable},
    data() {
        return {
            object: null,
            loading: true,
            checkerColumns: [
                {header: 'Дата', field: 'event_date'},
                {header: 'Объект', field: 'object_name'},
                {header: 'Значение', field: 'value'}
            ],
            chartData: null,
            chartOptions: null
        }
    },
    methods: {
        getData(date) {
            if (this.getSelectedObject == null) return;

            this.loading = true;
            eventapi.getTwohours(this.getSelectedObject.object_id, date).then(res => {
                this.object = res.data;
                this.loading = false;
                this.chartData = this.setChartData();
                this.chartOptions = this.setChartOptions();
            }).catch(e => {
                this.$toast.add({severity: 'error', detail: 'Произошла ошибка', life: 3000});
            });
        },
        setChartData() {

            return {
                labels: [...this.object.map(a => a['event_date'])],
                datasets: [
                    {
                        label: 'Количество жидкости',
                        data: [...this.object.map(a => a['value'])]
                    }
                ]
            };
        },
        setChartOptions() {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            return {
                indexAxis: 'y',
                maintainAspectRatio: false,
                aspectRatio: 0.8,
                plugins: {
                    legend: {
                        labels: {
                            fontColor: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary,
                            font: {
                                weight: 500
                            }
                        },
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }
                }
            };
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