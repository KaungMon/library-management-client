<template>
  <div class="search_bar" :class="[{ expand: isExpand }]">
    <input
      :placeholder="isExpand ? 'Search...' : ''"
      class="search_input"
      v-model="key"
      @keyup.enter="search"
      :class="[{ expand: isExpand }]"
      type="search"
    />
    <i @click="expand" class="pi pi-search search_icon"></i>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
const isExpand = ref(false);
const emit = defineEmits();
const expand = () => {
  key.value = "";
  isExpand.value = !isExpand.value;
};
const key = ref("");
const search = () => {
  emit("keySent", key.value);
};
</script>

<style lang="scss" scoped>
.search_bar {
  position: relative;
  background-color: white;
  border-radius: 50px;
  display: flex;
  justify-content: end;
  padding: 0 1em;
  align-items: center;
  min-width: 2.5em;
  min-height: 2.5em;
  color: black;
  overflow: hidden;
  transition: 0.5s;

  .search_input {
    opacity: 0;
    width: 0;
    background-color: transparent;
    font-size: 16px;
    color: black;
    border: none;
    outline: none;
    right: 2.5em;
    position: absolute;
    display: none;
  }

  .search_icon {
    position: relative;
    z-index: 1;
    cursor: pointer;
  }
}
.search_bar.expand {
  justify-content: end;
  border-radius: 50px;
  min-width: 20em;
  .search_input {
    width: calc(100% - 18%);
    display: inline;
    opacity: 100%;
  }
}
</style>
