<template>
  <div class="container">
    <SearchInput />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import SearchInput from "../components/SearchInput";
export default defineComponent({
  components: { SearchInput },
  setup() {},
});
</script>

<style lang="scss">
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>