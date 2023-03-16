<template>
  <textarea
    v-model="textComputed"
    type="text"
    :placeholder="placeholder"
    autocomplete="on"
  />
</template>
<script setup lang="ts">
  const emits = defineEmits<{(e: 'change', value?: string): void}>()
  interface Props {
    text: string
    placeholder: string
  }
  const props = withDefaults(defineProps<Props>(), {
    placeholder: ''
  })
  const textComputed = computed({
    get: () => props.text,
    set: value => emits('change', value)
  })
</script>
<style scoped lang="scss">
  textarea {
    display: block;
    width: 100%;
    background: $background-color-textfield;
    color: $text-color-black;
    border: none;
    padding: 16px 12px;
    border-radius: 8px;
    &::placeholder {
      color: $text-color-placeholder;
    }
  }
</style>
