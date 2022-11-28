<template>
  <div>
    <button @click="createPost">createPost</button>
    <div v-if="isSecondFetch && pending">pending</div>
    <div v-for="post in posts" v-else :key="post.id">
      {{ post }}
    </div>
  </div>
</template>

<script setup lang="ts">
  // やりたいこと: 型きかせながらNuxt3の標準ライブラリ使いながらPostしたい
  import { CreatePostBody } from '~~/src/composables/useCreatePost'

  const count = ref(0)
  const isSecondFetch = ref(false)
  const body = ref<CreatePostBody>({
    body: '',
    title: '',
    userId: 1,
  })
  const { posts, execute, pending } = await useCreatePost(body)
  const createPost = async () => {
    if (!isSecondFetch.value) {
      isSecondFetch.value = true
    }
    count.value++
    body.value = {
      title: `title${count.value}`,
      body: `body${count.value}`,
      userId: Math.floor(Math.random() * 100),
    }
    await execute()
  }
</script>
