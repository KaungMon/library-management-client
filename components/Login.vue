<template>
  <div class="h-screen relative">
    <div class="grid h-full">
      <div class="col-6">
        <div class="p-3">
          <div class="grid">
            <div class="col-12 p-0 mb-8">
              <div class="flex align-items-center">
                <div class="inline-block mr-2">
                  <img src="/public/icons/Logo.svg" alt="Logo" />
                </div>
                <h2 class="inline-block">
                  <span>The Bug</span>
                  <span class="block">Slayer</span>
                </h2>
              </div>
            </div>

            <div class="col-12">
              <h1 class="capitalize">welcome back !</h1>
              <p class="capitalize text-orange-400">
                fill the form below to login your account.
              </p>
            </div>

            <div class="col-12">
              <div class="mt-2">
                <FloatLabel>
                  <InputText
                    class="bg-white w-11 text-700"
                    id="username"
                    v-model="value"
                  />
                  <label for="username">Username</label>
                </FloatLabel>
              </div>
              <!-- NOTE - Component nal thone yin background color ka black phyit nay tar yal width yaw bg-color yaw pyoung ma ya loz -->
              <div class="mt-5">
                <FloatLabel>
                  <input
                    type="password"
                    style="height: 2.8rem"
                    class="w-11 border-round"
                  />
                  <label for="password">Password</label>
                </FloatLabel>
              </div>
              <!-- !NOTE -->
              <div class="mt-5 flex justify-content-between">
                <Button
                  class="bg-orange-500 border-none px-4"
                  label="SIGN IN"
                />
                <div class="flex items-center">
                  <Checkbox
                    v-model="pizza"
                    inputId="ingredient1"
                    name="pizza"
                    value="Cheese"
                  />
                  <label for="ingredient1" class="ml-2"> Remember Me </label>
                </div>
              </div>
              <div class="mt-5">
                <p>
                  You don't have an account?
                  <nuxt-link class="text-orange-500" to="/auth/register"
                    >Sign up here</nuxt-link
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-6 p-3 flex justify-content-center">
        <img
          class="border-round"
          style="width: 100%; object-fit: cover"
          src="/public/img/library.png"
          alt="Library"
        />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style></style>
