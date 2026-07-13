<template>
  <div>
    <Toast />
    <Splitter layout="vertical">
      <!-- SECTION - profile -->
      <SplitterPanel>
        <Panel header="Profile">
          <div class="flex items-center">
            <!-- SECTION - image -->
            <div v-if="editStatus" class="mr-8 relative">
              <Cropper ref="cropper" class="size-[15rem]"
                :stencil-props="{ handlers: {}, movable: false, resizable: false, aspectRatio: 1 / 1, }"
                :resize-image="{ adjustStencil: false }" :src="cropperImg" :stencil-component="CircleStencil"
                :default-size="defaultSize" image-restriction="stencil" />
              <SpeedDial :model="editImage" direction="up" :style="{ position: 'absolute', right: 0, bottom: 0 }" />
            </div>
            <div v-else class="mr-8 relative">
              <img :src="profileImg" alt="" class="size-[15rem] object-cover object-center rounded-full" />
              <input type="file" ref="fileInput" accept="image/*" @change="onFileChange" hidden>
              <SpeedDial :model="items" direction="up" :style="{ position: 'absolute', right: 0, bottom: 0 }" mask />
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
              <InputText class="capitalize" id="username" :model-value="user?.username" variant="filled" disabled
                fluid />
              <label for="username">Username</label>
            </IftaLabel>
            <IftaLabel>
              <InputText class="capitalize" id="firstName" :model-value="user?.first_name" variant="filled" disabled
                fluid />
              <label for="firstName">First Name</label>
            </IftaLabel>
            <IftaLabel>
              <InputText class="capitalize" id="surname" :model-value="user?.surname" variant="filled" disabled fluid />
              <label for="surname">Surname</label>
            </IftaLabel>
            <IftaLabel>
              <InputText id="email" :model-value="user?.email" variant="filled" disabled fluid />
              <label for="email">Email Address</label>
            </IftaLabel>
            <IftaLabel>
              <InputMask id="phone" mask="99 999 999999" :model-value="user?.phone" variant="filled" disabled fluid />
              <label for="phone">Phone Number</label>
            </IftaLabel>
            <IftaLabel>
              <InputText class="capitalize" id="address" :model-value="user?.address" variant="filled" disabled fluid />
              <label for="address">Address</label>
            </IftaLabel>
            <IftaLabel>
              <InputText id="gender" :model-value="gender" variant="filled" disabled fluid />
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
import { Cropper, CircleStencil } from 'vue-advanced-cropper';
import { SpeedDial } from 'primevue';
import 'vue-advanced-cropper/dist/style.css';
import { useToast } from "primevue/usetoast";

const { user, updateImageAPI, deleteImageApi } = useAuth();
const editStatus = ref(false);
const profileImg = useState("profileImg", () => '/img/default_avatar.avif');
const cropperImg = ref(null);
const fileInput = ref(null);
const cropper = ref(null);
const toast = useToast();

watch(() => user.value?.image, (image) => {
  profileImg.value = image ?? '/img/default_avatar.avif';
}, { immediate: true })

const defaultSize = ({ imageSize, visibleArea }) => ({
  width: (visibleArea || imageSize).width,
  height: (visibleArea || imageSize).height,
});

const gender = computed(() => {
  return user.value?.gender == "M" ? "Male" : "Female";
});

const items = ref([
  {
    icon: "pi pi-trash",
    command: async () => {
      const message = await deleteImageApi();
      if (message == "Delete Image Successfully!!!") {
        profileImg.value = "/img/default_avatar.avif";
        toast.add({
          severity: "success",
          summary: "Info",
          detail: "Delete Image Successfully!!!",
          life: 3000,
        })
      }
    }
  },
  {
    icon: "pi pi-upload",
    command: () => {
      fileInput.value?.click();
    }
  },

]);

const editImage = ref([
  {
    icon: "pi pi-times",
    severity: "danger",
    command: () => {
      profileImg.value = cropperImg.value;
      editStatus.value = false;
    }
  },
  {
    icon: "pi pi-check",
    command: () => {
      editingImg();
    }
  },
]);

const onFileChange = (event) => {
  const input = event.target.files[0];

  if (!input) return;
  cropperImg.value = URL.createObjectURL(input);

  editStatus.value = true;
};

const editingImg = () => {
  const { canvas } = cropper.value.getResult();
  canvas.toBlob(async (blob) => {
    if (!blob) return;
    const formData = new FormData;
    formData.append("image", blob, "profile-image");
    const message = await updateImageAPI(formData);
    editStatus.value = false;
    if (message === "Update Image Successfully!!!") {
      profileImg.value = canvas.toDataURL();
      toast.add({
        severity: "success",
        summary: "Info",
        detail: "Update Image Successfully!!!",
        life: 3000,
      });
    } else {
      toast.add({
        severity: "error",
        summary: "Something went wrong",
        detail: "Update Image Successfully!!!e",
        life: 3000,
      });
    }
  },"image/jpeg",
  0.9)
}

const edit = () => {
  navigateTo("/auth/profile/edit");
};

onMounted(() => {
  console.log(user.value.image)
})
</script>

<style lang="scss" scoped></style>
