<template>
    <MyDataTable
        :columns="objectColumns"
        :value="getObjects"
        :loading="false"
        :pagination="true"
        :dblclick="editProduct"
        :paginatorFunc="openObjectDialog"
        icon="pi pi-plus"
    />

    <Dialog v-model:visible="objectDialog" :header="header" modal class="p-fluid w-10 lg:w-8 xl:w-6">
        <div class="field">
            <label>Название объекта</label>
            <InputText v-model="selectedObject.object_name"/>
        </div>
        <div class="field">
            <label>Номер фланца</label>
            <InputText type="number" v-model="selectedObject.flange_no"/>
        </div>
        <div class="field" v-if="!selectedObject.object_type">
            <label class="mb-3">Тип объекта</label>
            <Dropdown v-model="selectedObject.objectType" :options="getObjectTypes" showClear optionLabel="object_type"
                      placeholder="Выберите тип объекта"/>
        </div>
        <div class="field">
            <label>Описание</label>
            <Textarea v-model="selectedObject.description" rows="3" cols="20"/>
        </div>
        <div class="formgrid grid">
            <div class="field col">
                <label>Координата Х</label>
                <InputText type="number" v-model="selectedObject.loc_x" required/>
            </div>
            <div class="field col">
                <label>Координата У</label>
                <InputText type="number" v-model="selectedObject.loc_y" required/>
            </div>
        </div>

        <MyDataTable
            :columns="propertyColumns"
            :value="selectedObject.objectProperties"
            :loading="loading"
            :empty="empty"
            :rowClass="false"
            filterDisplay="none"
            :dblclick="confirmPropertyDelete"
            v-if="selectedObject.object_type"
            class="field"
        />

        <Button
            label="Добавить свойство"
            severity="success"
            @click="openPropertyDialog"
            v-if="selectedObject.object_type"
        />

        <template #footer>
            <div class="flex justify-content-between">
                <Button
                    label="Удалить"
                    icon="pi pi-trash"
                    text
                    severity="danger"
                    @click="deleteObject"
                    v-if="selectedObject.object_type"
                />
                <div v-else></div>
                <div>
                    <Button label="Отмена" icon="pi pi-times" text @click="objectDialog = false"/>
                    <Button label="Сохранить" icon="pi pi-check" text severity="success" @click="saveObject"/>
                </div>
            </div>
        </template>
    </Dialog>

    <Dialog v-model:visible="propertyDialog" :header="header" modal class="p-fluid w-8 lg:w-4">
        <div class="field">
            <label class="mb-3">Свойство объекта</label>
            <Dropdown
                v-model="property"
                :options="getObjectProperties"
                showClear
                optionLabel="property_type"
                placeholder="Выберите свойство объекта"
            />
        </div>
        <div class="field">
            <label class="mb-3">Единица измерения</label>
            <Dropdown
                v-model="value"
                :options="values"
                showClear
                optionLabel="value_type"
                placeholder="Выберите единицу измерения"
            />
        </div>
        <div class="field">
            <label>Путь объекта</label>
            <InputText v-model="path" required/>
        </div>
        <template #footer>
            <Button label="Отмена" icon="pi pi-times" text @click="propertyDialog = false"/>
            <Button label="Сохранить" icon="pi pi-check" text severity="success" @click="addPropertyForObject"/>
        </template>
    </Dialog>

    <ConfirmDialog></ConfirmDialog>

</template>

<script>
import MyDataTable from "../components/datatables/MyDataTable.vue";
import objectapi from "../service/kron-tm-api-v1/object.js";
import propertyapi from "../service/kron-tm-api-v1/property.js";

export default {
    name: "Objects",
    components: {MyDataTable},
    data() {
        return {
            loading: true,
            empty: false,
            header: '',
            selectedObject: {},
            objectDialog: false,
            propertyDialog: false,
            values: null,
            property: null,
            value: null,
            path: null,
            objectColumns: [
                {header: 'Объект', field: 'object_name', sortable: true, link: {name: "object", param: 'object_id'}},
                {header: 'Тип', field: 'object_type', data: 'object_type', option: 'types'},
                {header: '№ фл', field: 'flange_no', sortable: true},
                {header: 'Описание', field: 'description', sortable: true},
            ],
            propertyColumns: [
                {header: '№ фл', field: 'flange_no'},
                {header: 'Свойство', field: 'property_type'},
                {header: 'Путь', field: 'path'},
                {header: 'Единица измерения', field: 'value_type'}
            ]
        }
    },
    methods: {
        openObjectDialog() {
            this.selectedObject = {};
            this.header = 'Создание объекта';
            this.objectDialog = true;
        },
        async openPropertyDialog() {
            await propertyapi.getAllValues().then(res => {
                this.values = res.data;
                this.propertyDialog = true;
            }).catch(e => {
                this.$toast.add({severity: 'error', detail: 'Произошла ошибка', life: 3000});
            });
        },
        async editProduct(e) {
            this.selectedObject = e.data;
            this.header = e.data.object_name;

            await propertyapi.getObjectProperties(e.data.object_id).then(res => {
                this.selectedObject.objectProperties = res.data;
                this.loading = false;
            }).catch(err => {
                if (err.response.data !== 'Ничего не найдено') {
                    return this.$toast.add({severity: 'error', detail: 'Произошла ошибка', life: 3000});
                }
                this.loading = false;
                this.empty = true;
            });

            this.objectDialog = true;
        },
        async saveObject() {
            try {
                if (this.selectedObject.object_type) {
                    await objectapi.updateObject(this.selectedObject);
                } else {
                    await objectapi.createObject(this.selectedObject);
                }
                this.$toast.add({severity: 'success', detail: 'Объект успешно сохранен', life: 3000});
            } catch (e) {
                this.$toast.add({severity: 'error', detail: 'Произошла ошибка', life: 3000});
            }

            this.$store.dispatch('getObjects');
            this.objectDialog = false;
        },
        async deleteObject() {
            await objectapi.deleteObject(this.selectedObject.object_id).then(() => {
                this.$toast.add({severity: 'success', detail: 'Объект успешно удален', life: 3000});
            }).catch(e => {
                this.$toast.add({severity: 'error', detail: 'Произошла ошибка', life: 3000});
            });
            this.$store.dispatch('getObjects');
            this.objectDialog = false;
        },
        async addPropertyForObject() {
            let postdata = {
                object: this.selectedObject,
                property_value_type: this.value,
                propertyType: this.property,
                path: this.path
            };

            try {
                await propertyapi.createPropertyForObject(postdata);
                let objectPropertiesResponse = await propertyapi.getObjectProperties(this.selectedObject.object_id);
                this.selectedObject.objectProperties = objectPropertiesResponse.data;
                await this.$store.dispatch('getObjects');
            } catch (e) {
                this.$toast.add({severity: 'error', detail: 'Произошла ошибка', life: 3000});
            }

            this.property = null;
            this.value = null;
            this.path = null;
            this.propertyDialog = false;
        },
        confirmPropertyDelete(e) {
            this.$confirm.require({
                message: 'Вы точно хотите удалить свойство у объекта?',
                header: 'Подтвердите удаление',
                icon: 'pi pi-exclamation-triangle',
                acceptClass: 'p-button-danger',
                accept: async () => {

                    try {
                        await propertyapi.deleteObjectProperty(e.data.property_id);
                        let objectPropertiesResponse = await propertyapi.getObjectProperties(this.selectedObject.object_id);
                        this.selectedObject.objectProperties = objectPropertiesResponse.data;
                        await this.$store.dispatch('getObjects');
                    } catch (e) {
                        if (e.response.data === 'Ничего не найдено') {
                           return this.selectedObject.objectProperties = null;
                        }
                        this.$toast.add({severity: 'error', detail: 'Произошла ошибка', life: 3000});
                    }

                    this.propertyDialog = false;
                },
                reject: () => {
                    this.propertyDialog = false;
                }
            });
        }
    },
    computed: {
        getObjects() {
            return this.$store.state.object.objects;
        },
        getObjectTypes() {
            return this.$store.state.object.options.types;
        },
        getObjectProperties() {
            return this.$store.state.object.options.properties;
        }
    }
}
</script>