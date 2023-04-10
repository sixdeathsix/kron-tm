<template>
    <Chart type="bar" :data="chartData" :options="chartOptions"/>
</template>

<script>
export default {
    name: "ChartTypeBar",
    props: ['object', 'labels', 'label', 'data'],
    data() {
        return {
            chartData: null,
            chartOptions: null
        }
    },
    methods: {
        setChartData() {
            return {
                labels: [...(this.object || []).map(a => a[this.labels])],
                datasets: [
                    {
                        label: this.label,
                        data: [...(this.object || []).map(a => a[this.data])]
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
    updated() {
        this.chartData = this.setChartData();
        this.chartOptions = this.setChartOptions();
    }
}
</script>

<style scoped>

</style>