<template>
  <div class="min-h-screen relative bg-linear-to-tr from-blue-950 to-blue-600">
    <div class="grid grid-cols-12 gap-5 h-full">
      <div class="col-span-6">
        <div class="pt-10 pl-10">
          <div class="grid grid-row-12">
            <div class="row-span-12 p-0 mb-8">
              <div class="flex items-center">
                <div class="inline-block mr-2">
                  <img src="/public/icons/Logo.svg" alt="Logo" />
                </div>
                <h2 class="inline-block text-white">
                  <span class="text-3xl">The Bug</span>
                  <span class="block text-3xl">Slayer</span>
                </h2>
              </div>
            </div>

            <div class="pb-[7rem]">
              <slot />
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-6 p-3 flex justify-center">
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

<script setup>
</script>

<style></style>
