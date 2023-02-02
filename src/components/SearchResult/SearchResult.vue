<template>
  <li class="list-item">
    <h2 class="list-item__title">{{ dataObject.display_name }}</h2>
    <img :src="dataObject.icon" :alt="dataObject.class" />
  </li>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { Data } from "./types";
import type { PropType } from "vue";

export default defineComponent({
  props: {
    dataObject: Object as PropType<Data>,
  },

  setup(props) {
    return props.dataObject;
  },
});
</script>

<style lang="scss">
  .list-item {
    padding: 20px;
    border: 1px solid #555;
    border-radius: 10px;

    &__title {
      color: #555;
    }
  }
</style>