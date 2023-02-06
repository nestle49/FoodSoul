<template>
  <div class="container">
    <h1>Minimal reproduction</h1>
    <component :is="dynamicLoadComponent" />
  </div>
</template>

<script lang="ts" setup>
import { useDynamicLoadComponent } from '@/composables/useDynamicComponent';

const { dynamicLoadComponent } = useDynamicLoadComponent('Test');
</script>

<style lang="scss">
  .container {
    max-width: 1200px;
    padding: 0 20px;
    margin: 0 auto;
  }
</style>
