<template>
  <q-card class="q-mt-md">
    <q-card-section>
      <div class="text-h6">{{ post.title }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{ post.body }}
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
  /* import { Post } from '@/features/post/api/create-post' */

  const post = defineProps<{
    title: string
    userId: number
    id: number
    body: string
  }>()
</script>
