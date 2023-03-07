import { Ref } from 'nuxt/dist/app/compat/capi'

export const useRoomId = (): Ref<string> => {
  // NOTE: なんか初回だけuseRouteがundefinedを返すのでuseRouterを使っています。
  // NOTE: でもuseRouterはreactiveではないので、2回目以降はuseRouteを使います
  const router = useRouter()
  const route = useRoute()
  const _id = router.currentRoute.value.params.id
  const id: Ref<string> = ref(Array.isArray(_id) ? _id.join(',') : _id)
  watch(route, () => {
    // TODO: zodでパースしたい
    const _id = route.params.id
    Array.isArray(_id) ? id.value = _id.join(',') : id.value = _id
  })
  return id
}
