<template>
  <ClientOnly>
    <div class="my-2">
      <Button icon="pi pi-arrow-left" label="Back" @click="back" variant="text" />
    </div>
    <Toast />
    <Splitter layout="vertical">

      <!-- SECTION - profile informations -->
      <SplitterPanel>
        <Splitter>
          <SplitterPanel :size="35" :minSize="35">
            <div class="mt-4 ml-4">
              <h1 class="font-medium text-2xl mb-3">Profile Informations</h1>
              <p class="text-lg font-light">
                Update your's account profile image
              </p>
            </div>
          </SplitterPanel>
          <SplitterPanel :size="65">
            <Panel>
              <Form :initialValues="initialValues" :resolver="profileResolver" @submit="onFormSubmit"
                class="grid gap-3">
                <!-- SECTION - first name -->
                <FormField v-slot="$form" class="flex flex-col gap-2 col-span-2" name="firstName">
                  <label for="firstName">First Name*</label>
                  <InputText name="firstName" id="firstName" />
                  <Message v-if="$form?.invalid" severity="error" size="small">
                    {{ $form.error.message }}
                  </Message>
                </FormField>
                <!-- !SECTION -->
                <!-- SECTION - surname -->
                <FormField v-slot="$form" name="surname" class="flex flex-col gap-2 col-span-2">
                  <label for="surname">Surname*</label>
                  <InputText name="surname" id="surname" />
                  <Message v-if="$form?.invalid" severity="error" size="small">
                    {{ $form.error.message }}
                  </Message>
                </FormField>
                <!-- !SECTION -->
                <!-- SECTION - username -->
                <FormField v-slot="$form" name="username" class="flex flex-col gap-2 col-span-2">
                  <label for="username">Username</label>
                  <InputText name="username" id="username" />
                  <Message v-if="$form?.invalid" severity="error" size="small">
                    {{ $form.error.message }}
                  </Message>
                </FormField>
                <!-- !SECTION -->
                <!-- SECTION - gender -->
                <div class="flex flex-col gap-2 col-span-2">
                  <label for="gender">Gender</label>
                  <Select name="gender" class="capitalize" :options="genders" optionLabel="name" optionValue="code"
                    placeholder="Select your gender..." id="gender" fluid />
                </div>
                <!-- !SECTION -->
                <div class="flex justify-end mt-2 col-span-3">
                  <Button type="submit" label="SAVE" />
                </div>
              </Form>
            </Panel>
          </SplitterPanel>
        </Splitter>
      </SplitterPanel>
      <!-- !SECTION -->

      <!-- SECTION - contact informations -->
      <SplitterPanel>
        <Splitter>
          <SplitterPanel :size="35" :minSize="35">
            <div class="mt-4 ml-4">
              <h1 class="font-medium text-2xl mb-3">Contact Informations</h1>
              <p class="text-lg font-light text-(--p-secondary-color)">
                The information (such as your telephone number, address, or
                e-mail address) that tells someone how to communicate with
                you.
              </p>
            </div>
          </SplitterPanel>
          <SplitterPanel :size="65">
            <Panel>
              <Form :initialValues="initialValues" :resolver="contactResolver" @submit="onFormSubmit"
                class="grid gap-3">
                <!-- SECTION - email -->
                <FormField v-slot="$form" name="email" class="flex flex-col gap-2 col-span-2">
                  <label for="email">Email</label>
                  <InputText name="email" id="email" />
                  <Message v-if="$form?.invalid" severity="error" size="small">
                    {{ $form.error.message }}
                  </Message>
                </FormField>
                <!-- !SECTION -->
                <!-- SECTION - phone -->
                <FormField v-slot="$form" name="phone" class="flex flex-col gap-2 col-span-2">
                  <label for="phone">Phone No.</label>
                  <InputMask name="phone" mask="99 999 999999" id="phone" />
                  <Message v-if="$form?.invalid" severity="error" size="small">
                    {{ $form.error.message }}
                  </Message>
                </FormField>
                <!-- !SECTION -->
                <!-- SECTION - address -->
                <FormField v-slot="$form" name="address" class="flex flex-col gap-2 col-span-2">
                  <label for="address">Address</label>
                  <Textarea name="address" id="address" autoResize fluid />
                  <Message v-if="$form?.invalid" severity="error" size="small">
                    {{ $form.error.message }}
                  </Message>
                </FormField>
                <!-- !SECTION -->
                <div class="flex justify-end mt-2 col-span-3">
                  <Button type="submit" label="SAVE" />
                </div>
              </Form>
            </Panel>
          </SplitterPanel>
        </Splitter>
      </SplitterPanel>
      <!-- !SECTION -->

      <!-- SECTION - update password -->
      <SplitterPanel>
        <Splitter>
          <SplitterPanel :size="35" :minSize="35">
            <div class="mt-4 ml-4">
              <h1 class="font-medium text-2xl mb-3">Update Password</h1>
              <p class="text-lg font-light">
                Ensure your account is using a long, random password to stay
                secure.
              </p>
            </div>
          </SplitterPanel>
          <SplitterPanel :size="65">
            <Panel>
              <Form :initialValues="initialValues" :resolver="passwordResolver" @submit="changePassword"
                class="grid grid-cols-3 gap-3">

                <!-- SECTION - current password -->
                <FormField v-slot="$form" name="currentPassword" class="flex flex-col gap-2 col-span-2">
                  <label for="currentPassword">Current Password</label>
                  <Password name="currentPassword" id="currentPassword" toggleMask fluid />
                  <Message v-if="$form?.invalid" severity="error" size="small">
                    {{ $form.error.message }}
                  </Message>
                </FormField>
                <!-- !SECTION -->

                <!-- SECTION - new password -->
                <FormField v-slot="$form" name="newPassword" class="flex flex-col gap-2 col-span-2">
                  <label for="newPassword">New Password</label>
                  <Password name="newPassword" id="newPassword" toggleMask fluid />
                  <Message v-if="$form?.invalid" severity="error" size="small">
                    {{ $form.error.message }}
                  </Message>
                </FormField>
                <!-- !SECTION -->

                <!-- SECTION - confirm password -->
                <FormField v-slot="$form" name="confirmPassword" class="flex flex-col gap-2 col-span-2">
                  <label for="confirmPassword">Confirm Password</label>
                  <Password name="confirmPassword" id="confirmPassword" toggleMask fluid />
                  <Message v-if="$form?.invalid" severity="error" size="small">
                    {{ $form.error.message }}
                  </Message>
                </FormField>
                <!-- !SECTION -->

                <div class="flex justify-end mt-2 col-span-3">
                  <Button type="submit" label="SAVE" />
                </div>

              </Form>
            </Panel>
          </SplitterPanel>
        </Splitter>
      </SplitterPanel>
      <!-- !SECTION -->

      <!-- SECTION - delete account -->
      <SplitterPanel>
        <Splitter>
          <SplitterPanel :size="35" :minSize="35">
            <div class="mt-4 ml-4">
              <h1 class="font-medium text-2xl mb-3">Delete Account</h1>
              <p class="text-lg font-light">
                Permanently delete your account.
              </p>
            </div>
          </SplitterPanel>
          <SplitterPanel :size="65">
            <div class="flex flex-col px-4 py-3">
              <div class="grid grid-cols-3">
                <p class="col-span-2">
                  Once your account is deleted, all of its resources and data
                  will be permanently deleted. Before deleting your account,
                  please download any data or information that you wish to
                  retain.
                </p>
              </div>
              <div class="flex justify-start mt-4">
                <Button label="DELETE ACCOUNT" severity="danger" :disabled="disableDeleteAccount"
                  @click="visible = true" />
                <Dialog v-model:visible="visible" modal header="Delete Account" :style="{ width: '24rem' }">
                  <Form :initialValues="initialOfDeleteAccount" :resolver="deleteResolver" @submit="deleteAccount">
                    <FormField v-slot="$form" name="username">
                      <div class="flex flex-col gap-4">
                        <div class="flex flex-col gap-1.5">
                          <Message v-if="deleteError" severity="error" size="small">
                            {{errorMessage}}
                          </Message>
                          <Label for="name">To confirm, type <span class="text-red-600">"{{ user?.username }}"</span> in
                            the box below.</Label>
                          <InputText id="username" name="username" />
                          <Message v-if="$form?.invalid" severity="error" size="small">
                            {{ $form.error.message }}
                          </Message>
                        </div>
                      </div>
                    </FormField>
                    <div class="flex justify-end gap-3 mt-5">
                      <Button severity="secondary" variant="outlined" @click="visible = false">Cancel</Button>
                      <Button type="submit" severity="danger" label="Delete" />
                    </div>
                  </Form>

                  <template #footer>

                  </template>
                </Dialog>
              </div>
            </div>
          </SplitterPanel>
        </Splitter>
      </SplitterPanel>
      <!-- !SECTION -->
    </Splitter>
  </ClientOnly>
</template>

<script setup>
import { Form } from "@primevue/forms";
import { FormField } from "@primevue/forms";
import { valibotResolver } from "@primevue/forms/resolvers/valibot";
import { useToast } from "primevue/usetoast";
import * as v from "valibot";

const { userId, user, editUserApi, changePasswordAPI, deleteAccountApi } = useAuth();
const toast = useToast();
const disableDeleteAccount = computed(() => user.value?.id === 1);
const visible = ref(false);
const deleteError = ref(false);
const errorMessage = ref("");

const initialValues = ref({
  firstName: `${user?.value?.first_name}`,
  surname: `${user?.value?.surname}`,
  username: `${user?.value?.username}`,
  gender: `${user?.value?.gender}`,
  email: `${user?.value?.email}`,
  phone: `${user?.value?.phone}`,
  address: `${user?.value?.address}`,
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const initialOfDeleteAccount = ref({
  username: "",
})

const genders = ref([
  { name: "Male", code: "M" },
  { name: "Female", code: "F" },
]);

// SECTION - validate
const profileResolver = valibotResolver(
  v.object({
    firstName: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(1, "Your first name is required."),
    ),
    surname: v.pipe(
      v.string(),
      v.trim("Your surname is required."),
      v.minLength(1, "Your surname is required."),
    ),
    username: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(1, "You need to fill username."),
      v.toLowerCase(),
    ),
    gender: v.pipe(v.string()),
  }),
);

const contactResolver = valibotResolver(
  v.object({
    address: v.pipe(
      v.string(),
      v.trim(),
    ),
    phone: v.pipe(
      v.string(),
      v.trim(),
    ),
    email: v.pipe(
      v.string(),
      v.trim(),
      v.email("You can't leave empty!!!"),
      v.endsWith("@gmail.com"),
    ),
  }),
);

const passwordResolver = valibotResolver(
  v.pipe(
    v.object({
      currentPassword: v.pipe(
        v.string(),
        v.trim(),
        v.minLength(8, "Your password have to be longer than 8 letters."),
      ),
      newPassword: v.pipe(
        v.string(),
        v.trim(),
        v.minLength(8, "Your password have to be longer than 8 letters."),
      ),
      confirmPassword: v.pipe(
        v.string(),
        v.trim(),
        v.minLength(8, "Please confirm your password."),
      ),
    }),
    v.forward(
      v.partialCheck(
        [["newPassword"], ["confirmPassword"]],
        (input) => input.newPassword === input.confirmPassword,
        "The two password do not match.",
      ),
      ["confirmPassword"],
    ),
  )
)

const deleteResolver = valibotResolver(
  v.object({
    username: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(1, "You need to fill username."),
      v.toLowerCase(),
    )
  }),
)
// !SECTION

// SECTION - return back
const back = () => {
  navigateTo("/auth/profile");
};
// !SECTION

// SECTION - on Form Submit
const onFormSubmit = (e) => {
  const message = editUserApi(
    e.values.email,
    e.values.firstName,
    e.values.surname,
    e.values.username,
    e.values.gender,
    e.values.address,
    e.values.phone
  );

  if (message) {
    toast.add({
      severity: "success",
      summary: "Info",
      detail: "Updated Successful!!!",
      life: 3000,
    });
  }
};
// !SECTION

// SECTION - change password
const changePassword = async (e) => {
  const message = await changePasswordAPI(e.values.currentPassword, e.values.newPassword);

  if (message === "Password Changed!!!") {
    toast.add({
      severity: "success",
      summary: "Info",
      detail: "Password Changed Successfully!!!",
      life: 3000,
    });

    userId.value = null;
    await navigateTo('/auth/login')
  } else {
    toast.add({
      severity: "error",
      summary: "Something went wrong",
      detail: "Password Change Unable",
      life: 3000,
    });
  }
}
// !SECTION

// SECTION - delete account
const deleteAccount = async (e) => {
  const message = await deleteAccountApi(e.values.username);

  if (message === null) {
    deleteError.value = true;
    errorMessage.value = "Something went wrong.";
    return;
  }

  if (message === "The username is incorrect.") {
    deleteError.value = true;
    errorMessage.value = message;
    return;
  }

  user.value = null;
  userId.value = null;

  await navigateTo("/auth/login");
};
// !SECTION
</script>

<style lang="scss" scoped></style>
