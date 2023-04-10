<template>
    <MyDataTable
            :columns="objectColumns"
            :value="getObjects"
            :loading="false"
            :pagination="true"
            :dblclick="log"
            :paginatorend="true"
            :paginatorendFunc="() => create = true"
    />

    <Dialog v-model:visible="visible" modal :header="header" :style="{ width: '50vw' }">
        <p>

        </p>
        <template #footer>
            <Button label="Удалить объект" icon="pi pi-trash" severity="danger" @click="visible = false" text />
            <Button label="Отмена" icon="pi pi-times" @click="visible = false" text />
            <Button label="Применить" icon="pi pi-check" severity="success" @click="visible = false" autofocus />
        </template>
    </Dialog>

    <Dialog v-model:visible="create" modal header="Добавить объект" :style="{ width: '50vw' }">
        <div class="flex flex-wrap w-12 justify-content-around p-3 gap-4">
            <InputText type="text" v-model="object_name" placeholder="Название объекта" class="w-5" />
            <Dropdown v-model="selectedObject" :options="getObjectsType" showClear filter optionLabel="object_type" placeholder="Тип объекта" class="w-5" />
            <InputText type="text" v-model="flange_no" placeholder="Номер фланца" class="w-5" />
            <InputText type="text" v-model="description" placeholder="Описание" class="w-5" />
            <InputText type="text" v-model="coor_x" placeholder="Координата Х" class="w-5" />
            <InputText type="text" v-model="coor_y" placeholder="Координата У" class="w-5" />
        </div>
        <template #footer>
            <Button label="Отмена" icon="pi pi-times" @click="create = false" text />
            <Button label="Добавить" icon="pi pi-check" severity="success" @click="createObject" autofocus />
        </template>
    </Dialog>
</template>

<script>
import MyDataTable from "../components/datatables/MyDataTable.vue";
import objectapi from "../service/kron-tm-api-v1/object.js";

export default {
    name: "Objects",
    components: {MyDataTable},
    data() {
        return {
            visible: false,
            create: false,
            selected: null,
            header: '',
            selectedObject: null,
            objectColumns: [
                {header: 'Объект', field: 'object_name', sortable: true, link: {name: "object", param: 'object_id'}},
                {header: 'Тип', field: 'object_type', data: 'object_type', option: 'types'},
                {header: '№ фл', field: 'flange_no', sortable: true},
                {header: 'Описание', field: 'description', sortable: true},
            ],
            object_name: null,
            flange_no: null,
            description: null,
            coor_x: null,
            coor_y: null
        }
    },
    methods: {
        log(e) {
            this.selected = e.data;
            this.header = e.data.object_name;
            this.visible = true
        },
        createObject() {

            objectapi.createObject(
                {
                    object_name: this.object_name,
                    objectType: this.selectedObject,
                    flange_no: this.flange_no,
                    description: this.description,
                    loc_x: this.coor_x,
                    loc_y: this.coor_y
                }
            ).then(res => {

                this.create = false

            }).catch(e => {

            })
        }
    },
    computed: {
        getObjects() {
            return this.$store.state.object.objects;
        },
        getObjectsType() {
            return this.$store.state.object.options.types;
        }
    },
}
</script>

<style scoped>

</style>