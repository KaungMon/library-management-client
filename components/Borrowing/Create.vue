<template>
  <Card>
      <!-- SECTION - back button -->
      <template #header>
        <span class="block pt-5 pl-3" @click="back"> <i class="pi pi-chevron-left"></i> Back </span>
      </template>
      <!-- !SECTION -->
      <template #content>
        <!-- SECTION - Form -->
        <Form @submit="onFormSubmit">
            <div>
              <!-- SECTION - Book -->
              <div class="grid grid-cols-4 mb-3 items-center">
                <label class="col-span-2">Book Name</label>
                <Select
                v-model="selectedBooks" editable :options="books" optionLabel="name" placeholder="Select a Book" class="col-span-2" />
              </div>
              <!-- !SECTION -->
              <!-- SECTION - Librarian Name -->
              <div class="grid grid-cols-4 mb-3 items-center">
                <label class="col-span-2">Librarian Name</label>
                <Select 
                v-model="selectedLibrarian" editable :options="librarians" optionLabel="name" placeholder="Enter Your Name" class="col-span-2" />
              </div>
              <!-- !SECTION -->
              <!-- SECTION - member name -->
              <div class="grid grid-cols-4 mb-3 items-center">
                <label class="col-span-2">Member Name</label>
                <Select 
                v-model="selectedMember" editable :options="members" optionLabel="name" placeholder="Enter Member Name" class="col-span-2" />
              </div>
              <!-- !SECTION -->
              <!-- SECTION - borrowing period -->
              <div class="grid grid-cols-4 mb-3 items-center">
                <label class="col-span-2">Borrowing Period</label>
                <InputNumber class="col-span-2" :pt="numberStyle" v-model="borrowing_period" prefix="Allow to keep " suffix=" days" fluid />
              </div>
              <!-- !SECTION -->
              <!-- SECTION - borrow date -->
              <div class="grid grid-cols-4 mb-3 items-center">
                <label class="col-span-2">Borrow Date</label>
                <DatePicker class="col-span-2" v-model="borrow_date" showIcon fluid iconDisplay="input" />
              </div>
              <!-- !SECTION -->
              <!-- SECTION - due date -->
              <div class="grid grid-cols-4 mb-3 items-center">
                <label class="col-span-2">Due Date</label>
                <DatePicker class="col-span-2" v-model="due_date" showIcon fluid iconDisplay="input" disabled />
              </div>
              <!-- !SECTION -->
            </div>
          <div>
            <Button @click="add" label="Submit"></Button>
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
</script>

<style lang="scss">

</style>
