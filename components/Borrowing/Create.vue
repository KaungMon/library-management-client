<template>
  <Card
      :pt="{
        root: { class: 'bg-white-alpha-50 rounded p-4' },
        header: {
          class:
            'mt-3 ml-3 text-xl text-900 cursor-pointer mb-4  hover:underline',
        },
        content: { class: 'mb-4' },
      }"
    >
      <!-- SECTION - back button -->
      <template #header>
        <span @click="back"> <i class="pi pi-chevron-left"></i> Back </span>
      </template>
      <!-- !SECTION -->
      <template #content>
        <!-- SECTION - Form -->
        <Form @submit="onFormSubmit" class="grid">
          <div class="col-12">
            <div class="grid">
              <!-- SECTION - Book -->
              <div class="col-6">
                <label>Book Name</label>
                <Select 
                :pt="selectStyle"
                v-model="selectedBooks" editable :options="books" optionLabel="name" placeholder="Select a Book" class="w-full md:w-56" />
              </div>
              <!-- !SECTION -->
              <!-- SECTION - Librarian Name -->
              <div class="col-6">
                <label>Librarian Name</label>
                <Select 
                :pt="selectStyle" 
                v-model="selectedLibrarian" editable :options="librarians" optionLabel="name" placeholder="Enter Your Name" class="w-full md:w-56" />
              </div>
              <!-- !SECTION -->
              <!-- SECTION - member name -->
              <div class="col-6">
                <label>Member Name</label>
                <Select 
                :pt="selectStyle" 
                v-model="selectedMember" editable :options="members" optionLabel="name" placeholder="Enter Member Name" class="w-full md:w-56" />
              </div>
              <!-- !SECTION -->
              <!-- SECTION - borrowing period -->
              <div class="col-6">
                <label>Borrowing Period</label>
                <InputNumber :pt="numberStyle" v-model="borrowing_period" prefix="Allow to keep " suffix=" days" fluid />
              </div>
              <!-- !SECTION -->
              <!-- SECTION - borrow date -->
              <div class="col-6">
                <label>Borrow Date</label>
                <DatePicker :pt="dayPickerStyle" v-model="borrow_date" showIcon fluid iconDisplay="input" />
              </div>
              <!-- !SECTION -->
              <!-- SECTION - due date -->
              <div class="col-6">
                <label>Due Date</label>
                <DatePicker :pt="dayPickerStyle" v-model="due_date" showIcon fluid iconDisplay="input" disabled />
              </div>
              <!-- !SECTION -->
            </div>
          </div>
          <div class="col-12 flex justify-content-end">
            <Button @click="add"  :pt="{root: {class: 'bg-orange-400'}}" label="Submit"></Button>
          </div>
        </Form>
        <!-- !SECTION -->
      </template>
    </Card>
</template>

<script setup>
import { ref,onMounted, watch } from 'vue';
import axios from 'axios';

const config = useRuntimeConfig();
const router = useRouter();
const books = ref([]);
const members = ref([]);
const librarians = ref([]);

const selectedBooks = ref('');
const selectedMember = ref('');
const selectedLibrarian = ref('');
const borrow_date = ref(0);
const due_date = ref();
const borrowing_period = ref(0);

onMounted(() => {
  fetchBooks();
  fetchUsers();
})

const calculateDueDate = () => {
  if(borrow_date.value && borrowing_period.value) {
    const newDate = new Date(borrow_date.value);
    newDate.setDate(newDate.getDate() + borrowing_period.value);
    due_date.value = newDate;
  }else {
    due_date.value = null;
  }
}

watch([borrow_date, borrowing_period], calculateDueDate)

const add = () => {
  axios.post(`${config.public.apiBaseUrl}/borrow_book/create`, {
    book_id : selectedBooks.value.id,
    librarian_id : selectedLibrarian.value.id,
    member_id : selectedMember.value.id,
    borrow_date : borrow_date.value,
    due_date : due_date.value
  }).then((response) => {
    if(response.data.message) {
      back();
    }
  })
}

const fetchBooks = () => {
  axios.get(`${config.public.apiBaseUrl}/borrow_book/book_lists`)
  .then((response) => {
    books.value = response.data.books;
  })
  .catch((error) => {
    console.log(error.data);
    
  })
}

const fetchUsers = () => {
  axios.get(`${config.public.apiBaseUrl}/borrow_book/users/librarians`)
  .then((response) => {
    librarians.value = response.data.librarians;
  })
  .catch((error) => {
    console.log(error.data);
  })

  axios.get(`${config.public.apiBaseUrl}/borrow_book/users/members`)
  .then((response) => {
    members.value = response.data.members;
  })
  .catch((error) => {
    console.log(error.data);
  })
}

const back = () => {
  router.push(`/borrowing_log`)
}

const selectStyle = {
  root: { class: 'bg-white border-none mt-1' },
  label: {
    class: 'bg-white capitalize text-900 px-1',
  },
  overlay: { class: 'bg-white' },
  option: {
    class:
      'text-900 hover:bg-blue-700 hover:text-200 active:bg-blue-900',
  },
}

const dayPickerStyle = {
  pcInputText : {
    root : {class : 'bg-white text-900'}
  },
  panel : {class : 'bg-white'},
  header : {class : 'bg-white'},
  pcPrevButton: {root : {class: 'text-900 hover:bg-blue-700 hover:text-50'}},
  selectMonth : {class : 'text-900 hover:bg-blue-700 hover:text-50'},
  selectYear : {class : 'text-900 hover:bg-blue-700 hover:text-50'},
  decade : {class: 'text-900'},
  pcNextButton: {root : {class: 'text-900 hover:bg-blue-700 hover:text-50'}},
  weekDay : {class : 'text-900'},
  day : {class : 'text-900'}
}

const numberStyle = {
  pcInputText : {
    root : {class : 'bg-white text-900'}
  }
}

</script>

<style lang="scss">

</style>
