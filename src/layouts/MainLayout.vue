<template>
  <v-main>
    <main-header></main-header>
    <v-container
      class="fill-height"
      fluid
    >
      <v-layout class="m-container" column>
        <!-- Content -->
        <div class="content" :class='{ "pt": $vuetify.breakpoint.smAndDown }'>
          <router-view />
        </div>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import MainHeader from '@/components/layout/MainHeader.vue';

export default {
  name: 'MainLayout',
  components: {
    MainHeader,
  },
};
</script>

<style lang="scss">
</style>
