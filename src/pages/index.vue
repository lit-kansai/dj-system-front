<template>
  <div>
    <p>{{ post }}</p>
    <h2>{{ pending }}</h2>
  </div>
</template>

<script setup lang="ts">
import { fetchPost } from '@/sample'

const { post, pending } = await fetchPost()
</script>
