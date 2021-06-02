<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <div class="bg-white text-blue-grey-9">
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />
          <q-avatar class="logo">
            <img src="static/img/dggs.svg" />
          </q-avatar>

          <q-toolbar-title class="text-orange-9">
            WebGIS H3
          </q-toolbar-title>

          <div>DGGS</div>
        </q-toolbar>
      </div>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Menu
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          :to="link.link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksData = [
  {
    title: "Home",
    caption: "main page of application",
    icon: "account_circle",
    link: "/"
  },
  {
    title: "Map",
    caption: "map with layers",
    icon: "layers",
    link: "/map"
  }
];

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    };
  }
};
</script>

<style scoped>
.logo {
  margin-left: 10px;
}
</style>
