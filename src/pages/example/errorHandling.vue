<template>
  <div>
    <h2>Error handling example</h2>
    <button @click="triggerError">triggerError</button>
    <div v-if="currentError">
      {{ JSON.stringify(currentError) }}
      <br />
      <button @click="clearError()">clear</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { currentError } = useCurrentError()
  const triggerError = () => {
    throw createError({ statusMessage: 'triggerError' })
  }
</script>
