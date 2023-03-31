<template>
  <textarea
    v-model="textComputed"
    type="text"
    :placeholder="placeholder"
    autocomplete="on"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>
<script setup lang="ts">
  const emits = defineEmits<{(e: 'change', value?: string): void}>()
  interface Props {
    text: string
    placeholder: string,
    onFocus: () => void,
    onBlur: () => void,
  }
  const props = withDefaults(defineProps<Props>(), {
    placeholder: '',
    onFocus: () => {},
    onBlur: () => {}
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
    background: $background-color-gray;
    color: $color-body;
    border: none;
    padding: 16px 12px;
    border-radius: 8px;
    &::placeholder {
      color: $color-gray;
    }
  }
</style>
