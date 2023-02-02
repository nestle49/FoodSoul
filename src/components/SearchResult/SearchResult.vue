<template>
  <li class="list-item">
    <h2 class="list-item__title">{{ dataObject.display_name }}</h2>
    <img :src="dataObject.icon" :alt="dataObject.class" />
  </li>
</template>

<script lang="ts">
import { defineComponent, toRefs, PropType } from "vue";
import { Data } from "./types";

export default defineComponent({
  props: {
    dataObject: {
      type: Object as PropType<Data>,
      default: () => {},
    },
  },
  setup(props) {
    const { dataObject } = toRefs(props);

    return dataObject;
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