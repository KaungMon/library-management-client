<template>
  <div>
    <div class="header flex justify-content-between align-items-center">
      <h1 class="font-italic">Manage Log</h1>

      <div class="flex justify-content-center align-items-center gap-4">
        <SearchBar @keySent="handleSearchKey" />
        <Button @click="borrow_book" :pt="{
          root: {class: 'bg-orange-400 border-orange-400 hover:bg-orange-600 border-orange-600 active:bg-orange-800 border-orange-800 '}
        }" label="Borrow"></Button>
      </div>
    </div>
    <div class="card">
      <!-- SECTION - Table -->
      <DataTable
      v-if="borrowing_log"
        :pt="tableStyle"
        :value="borrowing_log"
        editMode="cell" 
        @cell-edit-complete="onCellEditComplete"
      >
        <!-- SECTION - Image -->
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          field="book_image"
          header="Image"
        >
          <template v-if="borrowing_log" #body="{ data }">
            <img
              v-if="data.book_image != null"
              :src="`${config.public.baseUrl}/storage/image/${data.book_image}`"
              class="w-24 rounded"
              width="64"
            />
            <img
              v-else
              src="/public/img/images.png"
              class="w-24 rounded"
              width="64"
            />
          </template>
        </Column>
        <!-- !SECTION -->
        <!-- SECTION - Title Name -->
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          field="book_title"
          class="capitalize"
          header="Title Name"
        >
        </Column>
        <!-- !SECTION -->
        <!-- SECTION - Librarian Name -->
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          field="librarian_name"
          header="Libririan Name"
        >
        </Column>
        <!-- !SECTION -->
        <!-- SECTION - Member Name -->
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          field="member_name"
          header="Member Name"
        >
        </Column>
        <!-- !SECTION -->
        <!-- SECTION - Borrow Date -->
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          field="borrow_date"
          header="Borrow Date"
        >
        </Column>
        <!-- !SECTION -->
        <!-- SECTION - Return Date -->
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          field="due_date"
          header="Due Date"
        >
        </Column>
        <!-- !SECTION -->
        <!-- SECTION - Borrow Status -->
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          field="status"
          class="capitalize"
          header="Status"
        >
          <template #editor="{ data, field }">
            <Select :pt="selectStyle" v-model="data[field]" :options="statuses" optionLabel="name" :optionValue="id" placeholder="Select a Status" fluid>
              <template #option="slotProps">
                <Tag :value="slotProps.option.name" :severity="getStatusLabel(slotProps.option.id)" />
              </template>
            </Select>
          </template>
          <template #body="slotProps">
            <Tag :value="slotProps.data.status.name" :severity="getStatusLabel(slotProps.data.status.id)" />
          </template>
        </Column>
        <!-- !SECTION -->
      </DataTable>
      <!-- !SECTION -->
      <!-- SECTION - Paginator -->
      <Paginator
        :pt="paginatorStyle"
        :rows="rowsPerPage"
        @page="onPageChange"
        :totalRecords="totalRecords"
        :rowsPerPageOptions="[4, 8, 16]"
        @update:rows="onRowsPerPageChange"
      >
      </Paginator>
      <!-- !SECTION -->
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import {ref, onMounted} from 'vue';

const config = useRuntimeConfig();
const borrowing_log = ref();
const statuses = ref([]);
const router = useRouter();

const currentPage = ref(1);
const rowsPerPage = ref(4);
const totalRecords = ref();

onMounted(() => {
  fetchBorrowingLog();
  fetchStatuses();
})

const fetchBorrowingLog = (page = 1, rows = rowsPerPage.value) => {
  axios.get(`${config.public.apiBaseUrl}/borrow_book/lists?page=${page}&rows=${rows}`)
  .then((response) => {
    borrowing_log.value = response.data.lists.data;
    totalRecords.value = response.data.lists.total;
  })
  .catch((error) => {
    console.log(error.data);
  })
}

const onPageChange = (event) => {
  currentPage.value = event.page + 1;
  fetchBorrowingLog(currentPage.value, rowsPerPage.value)
}

const onRowsPerPageChange = (event) => {
  rowsPerPage.value = event;
  fetchBorrowingLog(1, rowsPerPage.value);
}

const fetchStatuses = () => {
  axios.get(`${config.public.apiBaseUrl}/status/lists`)
  .then((response) => {
    statuses.value = response.data.statuses;
  })
  .catch((error ) => {
    console.log(error.data);
    
  })
}

const onCellEditComplete = (event) => {
  let {data, newValue,  field} = event;
  
  data[field] = newValue;
  
  axios.post(`${config.public.apiBaseUrl}/borrow_book/update`,{
    'id' : data.id,
    'status_id' : newValue.id
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error.data);
  })
}

const getStatusLabel = (status) => {
    switch (status) {
        case 2:
            return 'success';

        case 1:
            return 'warn';

        case 3:
            return 'danger';

        default:
            return null;
    }
};

const borrow_book = () => {
  router.push(`/borrowing_log/borrow`)
}

const tableStyle = 
{
  root: { class: 'bg-white-alpha-70 border-round px-3 pt-2' },
  bodyRow: { class: 'bg-transparent text-900' },
  headerCell: { class: 'bg-white' },
  pcPaginator: {
    root: { class: 'bg-transparent' },
    content: { class: 'bg-white-alpha-40 border-round' },
    first: { class: 'text-900 hover:bg-blue-800 hover:text-0' },
    prev: { class: 'text-900 hover:bg-blue-800 hover:text-0' },
    next: { class: 'text-900 hover:bg-blue-800 hover:text-0' },
    last: { class: 'text-900 hover:bg-blue-800 hover:text-0' },
    page: { class: 'text-900 hover:bg-blue-800 hover:text-0' },
    pcRowPerPageDropdown: {
      root: { class: 'bg-transparent' },
      label: { class: 'text-900' },
      overlay: { class: 'bg-white-alpha-50' },
      option: {
        class:
          'text-900 hover:bg-blue-800 hover:text-0 select:bg-blue-500',
      },
    },
  },
}

const selectStyle = 
{
  root: { class: 'bg-white' },
  label: {
    class: 'bg-white capitalize text-500 px-1',
  },
  overlay: { class: 'bg-white' },
  option: {
    class:
      'text-900 hover:bg-blue-700 hover:text-200 active:bg-blue-900',
  },
}

const paginatorStyle = 
{
  root: { class: 'bg-white-alpha-70 border-round-bottom-lg' },
  content: { class: 'bg-white-alpha-40' },
  first: { class: 'text-900 hover:bg-blue-800 hover:text-0' },
  prev: { class: 'text-900 hover:bg-blue-800 hover:text-0' },
  next: { class: 'text-900 hover:bg-blue-800 hover:text-0' },
  last: { class: 'text-900 hover:bg-blue-800 hover:text-0' },
  page: { class: 'text-900 hover:bg-blue-800 hover:text-0' },
  pcRowPerPageDropdown: {
    root: { class: 'bg-transparent' },
    label: { class: 'text-900' },
    overlay: { class: 'bg-white-alpha-50' },
    option: {
      class:
        'text-900 hover:bg-blue-800 hover:text-0 select:bg-blue-500',
    },
  },
}

const skeletonStyle = {
  root: {class: 'bg-red-500'}
}

</script>