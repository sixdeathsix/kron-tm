<template>
    <Chart type="line" :data="chartData" :options="chartOptions" />
</template>

<script>
export default {
    name: "ChartTypeLine",
    props: ['object', 'labels', 'label', 'data'],
    data() {
        return {
            chartData: null,
            chartOptions: null
        };
    },
    methods: {
        setChartData() {
            const documentStyle = getComputedStyle(document.documentElement);

            return {
                labels: [...(this.object || []).map(a => a[this.labels])],
                datasets: [
                    {
                        label: this.label,
                        data: [...(this.object || []).map(a => a[this.data])],
                        fill: false,
                        borderColor: documentStyle.getPropertyValue('--blue-500'),
                        tension: 0.4
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
                maintainAspectRatio: false,
                aspectRatio: 0.6,
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
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
};
</script>