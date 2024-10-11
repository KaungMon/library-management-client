<template>
  <div class="h-screen relative">
    <div class="grid h-full">
      <div class="col-6">
        <div class="p-3">
          <div class="grid">
            <div class="col-12 p-0 mb-8">
              <CompanyName />
            </div>
            <div class="col-12">
              <RegistractionLoginText />
            </div>
            <div class="col-12">
              <slot />
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 p-3 flex justify-content-center">
        <img
          class="border-round"
          style="width: 100%; object-fit: cover"
          src="/public/img/library.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style></style>
