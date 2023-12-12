<template>
  <div class="relative pt-1">
    <div class="flex mb-2 items-center justify-between">
      <div>
        <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
          En cours
        </span>
      </div>
      <div class="text-right">
        <span class="text-xs font-semibold inline-block text-teal-600">
          {{ completionPercentage.toFixed(0) }}%
        </span>
      </div>
    </div>
    <div class="flex items-center justify-between">
      <div class="text-xs leading-none text-center text-white" :style="{ width: completionPercentage + '%' }">
        <span class="inline-block py-1 px-3 rounded-full bg-teal-600" :style="{ width: completionPercentage + '%' }"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    completionPercentage: number
  }>()
  defineExpose(props)
</script>

<style scoped>
  /* Ajoutez des styles supplémentaires au besoin */
</style>
