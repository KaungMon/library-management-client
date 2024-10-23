<template>
  <div>
    <div class="header flex justify-content-between align-items-center">
      <h1 class="font-italic">Manage Categories</h1>

      <CategoryCreate />
    </div>
    <div class="card">
      <DataTable
        pt:root="bg-white-alpha-30 border-round px-5 py-5 "
        pt:table="bg-red-400 p-3"
        v-model:editingRows="editingRows"
        :value="categories"
        editMode="row"
        dataKey="id"
        @row-edit-save="onRowEditSave"
      >
        <Column field="id" header="Id">
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" fluid />
          </template>
        </Column>
        <Column field="category_name" class="capitalize" header="Category Name">
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" fluid />
          </template>
        </Column>
        <Column field="books" header="Books"></Column>
        <Column
          :rowEditor="true"
          style="width: 10%; min-width: 8rem"
          bodyStyle="text-align:center"
        ></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const categories = ref();
const editingRows = ref([]);

onMounted(() => {
  axios
    .get("http://127.0.0.1:8000/api/category/lists")
    .then((response) => {
      categories.value = response.data.categories;
    })
    .catch((error) => {
      console.log(error);
    });
});

const onRowEditSave = (event) => {
  let { newData, index } = event;

  categories.value[index] = newData;
};
</script>

<style lang="scss" scoped></style>
