<template>
  <q-layout view="lHh Lpr lFf">
    <q-header id="app-bar" elevated class="bg-grey-1 text-dark">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>DJ Gassi Console</q-toolbar-title>
        <div class="profile">
          <div class="button">
            <q-btn dense round @click="toggleProfileOpen">
              <q-avatar size="36px">
                <img :src="state.user.image">
              </q-avatar>
            </q-btn>
            <div class="toggle">
              <svg v-if="!state.profileOpen" viewBox="0 0 8 6" fill="black" xmlns="http://www.w3.org/2000/svg" class="fill-current"><path d="M4.21053 5.05263L8 0H0.421053L4.21053 5.05263Z" /></svg>
              <svg v-else viewBox="0 0 8 6" fill="black" xmlns="http://www.w3.org/2000/svg" class="fill-current rotate-180"><path d="M4.21053 5.05263L8 0H0.421053L4.21053 5.05263Z" /></svg>
            </div>
          </div>
          <div v-if="state.profileOpen" class="menu">
            <div class="content">
              <q-avatar size="42px">
                <img :src="state.user.image">
              </q-avatar>
              <div class="q-ml-sm">
                <p class="text-weight-bold">{{ state.user.name }}</p>
                <p>{{ state.user.email }}</p>
              </div>
            </div>
            <hr>
            <q-btn flat align="left" class="q-pl-none width-max" @click="logout">Logout</q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="state.leftDrawerOpen" show-if-above side="left" bordered>
      <div class="column justify-between window-height no-wrap">
        <div class="q-pt-lg">
          <div class="column q-pb-xl items-start">
            <p class="q-px-lg q-mb-none text-subtitle1 text-weight-bold">自分のルーム</p>
            <q-btn
              v-for="room of rooms"
              :key="room.id"
              flat
              no-caps
              align="left"
              class="q-px-lg q-py-sm full-width"
              :to="'/room/' + room.displayId"
            >
              <span class="column items-start">
                {{ room.name }}
                <span class="text-caption text-grey">{{ `${room.description}(/${room.displayId})` }}</span>
              </span>
            </q-btn>
            <q-btn flat align="left" class="q-px-lg q-py-sm full-width" to="/room/create">
              <q-icon name="add" size="0.9em" />ルームを追加
            </q-btn>
          </div>
        </div>
        <div class="column">
          <q-btn flat align="left" class="q-px-lg q-py-md full-width" to="/settings">
            <q-icon name="settings" size="1.6em" class="q-mr-sm" />外部サービス連携
          </q-btn>
          <q-btn flat align="left" class="q-px-lg q-py-md full-width" href="https://forms.gle/AbUwewkPuLWJjgrL8" target="_blank">
            <q-icon name="reviews" size="1.6em" class="q-mr-sm" />フィードバックを送信
          </q-btn>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <div class="q-mx-xl q-py-xl container">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  import { auth } from '@/features'
  import { LOGIN_PAGE } from '@/constants'

  const { rooms } = useRoomsState()
  const userState = useUserState()
  const state = reactive({
    leftDrawerOpen: false,
    profileOpen: false,
    user: {
      image: userState.state.value?.icon,
      email: userState.state.value?.email,
      name: userState.state.value?.name
    }
  })
  const toggleLeftDrawer = () => {
    state.leftDrawerOpen = !state.leftDrawerOpen
  }
  const toggleProfileOpen = () => {
    state.profileOpen = !state.profileOpen
  }
  const logout = () => {
    auth.api.logout()
    navigateTo(LOGIN_PAGE)
  }
</script>

<style scoped lang="scss">
  .container {
    max-width: 1024px;
    margin: 0 12px;

    @media (min-width: $breakpoint-md-min) {
      margin: 0 auto;
      padding-right: 24px;
      padding-left: 24px;
    }
  }
  .profile {
    position: relative;

    .button {
      display: flex;
      align-items: center;

        .toggle {
          width: 9px;
          height: 9px;
          margin-left: 8px;
          margin-bottom: 12px;
        }
      }

    .menu {
      position: absolute;
      right: 0;
      width: 310px;
      margin-top: 4px;
      padding: 20px 20px 13px 20px;
      box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, .2);
      border-radius: 1rem;
      background-color: white;
      z-index: 30;

      hr {
        margin: 15px 0 5px 0;
      }

      .content{
        display: flex;
        align-items: center;

        img {
          width: 2rem;
          height: 2rem;
          object-fit: cover;
        }

        p {
          margin: 0;
        }

        :global(.width-max) {
          width: 100%;
        }
      }
    }
  }
</style>
