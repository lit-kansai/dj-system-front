<template>
  <div class="q-ml-md">
    <q-input v-model="form.title" label="title" />
    <q-input v-model="form.body" label="body" />
    <q-btn class="q-mt-md" color="black" label="Submit" @click="addPost" />
    <p v-show="pending">loading</p>
    <p v-show="error">error</p>
    <PostCard v-for="post in posts" :key="post.id" v-bind="post" />
  </div>
</template>

<script setup lang="ts">
  // prettier-ignore
  // eslint-disable
  import { Ref } from 'nuxt/dist/app/compat/capi'
  import { Post } from '@/features/post/api/create-post'

  const posts: Ref<Post[]> = ref([])
  const pending = ref(false)
  const error: Ref<null | boolean | Error> = ref(false)
  const form = reactive({
    userId: 1,
    title: '',
    body: '',
  })
  const _createPosts = await createPost(form)
  const _getPosts = await getPosts()
  watch(_getPosts.data, (data) =>
    data ? data.map((post) => posts.value.push(post)) : null
  )
  watch(_getPosts.pending, (data) => (pending.value = data))
  watch(_getPosts.error, (data) => (error.value = data))
  watch(_createPosts.data, (data) => (data ? posts.value.unshift(data) : null))
  watch(_createPosts.pending, (data) => (pending.value = data))
  watch(_createPosts.error, (data) => (error.value = data))
  const addPost = async () => {
    await _createPosts.execute()
  }
</script>
