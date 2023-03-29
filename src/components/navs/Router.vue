<template>
  <div class="router-container flex justify-content-between align-items-center">
    <div class=""><router-link class="router" :to="{name: 'monitoring'}">Мониторинг свойств</router-link></div>
    <div class="">
      <Dropdown v-model="selectedObject" @change="redirect" :options="getObjects" showClear filter optionLabel="object_name" placeholder="Все объекты" class="md:w-14rem">
        <template #value="slotProps">
          <div v-if="slotProps.value" class="flex align-items-center">
            <div>{{ slotProps.value.object_name }}</div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
        </span>
        </template>
        <template #option="slotProps">
          <div class="flex align-items-center">
            <div>{{ slotProps.option.object_name }}</div>
          </div>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "Router",
  data() {
    return {
      selectedObject: null
    }
  },
  methods: {
    redirect(e) {
      if (e.value == null) {
        return this.$router.push({ name: 'monitoring' });
      }

      this.$router.push({ name: 'object', params: { id: e.value.object_id } });
    }
  },
  mounted() {
    this.$store.dispatch('getObjects');
  },
  computed: {
    getObjects () {
      return this.$store.state.object.objects
    }
  }
}
</script>

<style scoped>
.router-container {
  padding: 20px 0;
}

.router {
  color: #495057;
  text-decoration: none;
  margin-right: 20px;
}
</style>