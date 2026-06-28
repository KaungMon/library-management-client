<template>
  <div>
    <Splitter layout="vertical">
      <!-- SECTION - profile -->
      <SplitterPanel>
        <Panel header="Profile">
          <div class="flex items-center">
            <!-- SECTION - image -->
            <div v-if="imageStatus" class="mr-8">
              <img
                :src="user?.image"
                alt=""
                class="size-[15rem] object-cover object-center rounded-full"
              />
            </div>
            <div v-else class="mr-8">
              <img
                :src="`/img/default_avatar.avif`"
                alt=""
                class="size-[15rem] object-cover object-center rounded-full"
              />
            </div>
            <!-- !SECTION -->

            <!-- SECTION - name -->
            <div>
              <div class="flex items-center mb-4">
                <h1 class="font-bold text-4xl mr-3 capitalize">
                  {{ user?.first_name }} {{ user?.surname }}
                </h1>
                <h4 class="text-3xl">( {{ user?.username }} )</h4>
              </div>
              <div>
                <p class="text-2xl font-light capitalize">{{ user?.role }}</p>
              </div>
              <div>
                <p class="text-(--p-primary-color) font-normal">
                  {{ user?.email }}
                </p>
              </div>
            </div>
            <!-- !SECTION -->
          </div>
        </Panel>
      </SplitterPanel>
      <!-- !SECTION -->
      <!-- SECTION - informations -->
      <SplitterPanel>
        <Panel>
          <!-- SECTION - header -->
          <template #header>
            <h1 class="font-bold">Informations</h1>
          </template>
          <!-- !SECTION -->
          <!-- SECTION - edit button -->
          <template #icons>
            <Button @click="edit" icon="pi pi-pencil" text rounded />
          </template>
          <!-- !SECTION -->
          <div class="grid grid-cols-3 gap-3">
            <IftaLabel>
              <InputText
                class="capitalize"
                id="username"
                :model-value="user?.username"
                variant="filled"
                disabled
                fluid
              />
              <label for="username">Username</label>
            </IftaLabel>
            <IftaLabel>
              <InputText
                class="capitalize"
                id="firstName"
                :model-value="user?.first_name"
                variant="filled"
                disabled
                fluid
              />
              <label for="firstName">First Name</label>
            </IftaLabel>
            <IftaLabel>
              <InputText
                class="capitalize"
                id="surname"
                :model-value="user?.surname"
                variant="filled"
                disabled
                fluid
              />
              <label for="surname">Surname</label>
            </IftaLabel>
            <IftaLabel>
              <InputText
                id="email"
                :model-value="user?.email"
                variant="filled"
                disabled
                fluid
              />
              <label for="email">Email Address</label>
            </IftaLabel>
            <IftaLabel>
              <InputMask
                id="phone"
                mask="99 999 999999"
                :model-value="user?.phone"
                variant="filled"
                disabled
                fluid
              />
              <label for="phone">Phone Number</label>
            </IftaLabel>
            <IftaLabel>
              <InputText
                class="capitalize"
                id="address"
                :model-value="user?.address"
                variant="filled"
                disabled
                fluid
              />
              <label for="address">Address</label>
            </IftaLabel>
            <IftaLabel>
              <InputText
                id="gender"
                :model-value="gender"
                variant="filled"
                disabled
                fluid
              />
              <label for="gender">Gender</label>
            </IftaLabel>
          </div>
        </Panel>
      </SplitterPanel>
      <!-- !SECTION -->
    </Splitter>
    <!-- !SECTION -->
  </div>
</template>

<script setup>
const { user } = useAuth();
const imageStatus = ref(false);

const gender = computed(() => {
  return user.value?.gender == "M" ? "Male" : "Female";
});

onMounted(() => {
  if (user.value.image != null) {
    imageStatus.value = true;
  } else {
    imageStatus.value = false;
  }
});

const edit = () => {
  navigateTo("/auth/profile/edit");
};
</script>

<style lang="scss" scoped></style>
