<template>
    <YandexMap
        ref="map"
        :coordinates="coordinates"
        zoom="13"
        :controls="controls"
    >
        <YandexMarker
            :coordinates="coordinates"
            marker-id="1"
        />
    </YandexMap>
</template>

<script>

export default {
    props: ['coordinates'],
    data() {
        return {
            controls: ['fullscreenControl', 'routePanelControl']
        }
    }
}
</script>

<style scoped>
.yandex-container {
    width: 100%;
    height: 500px;
}
</style>