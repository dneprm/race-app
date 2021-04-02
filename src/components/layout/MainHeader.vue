<template>
  <div>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="header__left">
        <router-link class="logo" to="/">
          <v-toolbar-title>{{ $t('appTitle') }}</v-toolbar-title>
        </router-link>
      </div>

      <v-spacer />

      <div v-if="$route.name === 'race'" class="header__right">
        <v-btn
          class="ml-5 justify-end"
          color="info"
          :disabled="isLoading"
          @click="clickGenerateRaceProgram"
        >
          <span v-if="$vuetify.breakpoint.smAndUp">{{ $t('race.button.generate') }}</span>
          <v-icon :class='{ "ml-1": $vuetify.breakpoint.smAndUp }'>mdi-creation</v-icon>
        </v-btn>
        <v-btn
          class="ml-5 justify-end"
          color="info"
          :disabled="isLoading || !isRaceProgramGenerated"
        >
          <span v-if="$vuetify.breakpoint.smAndUp">{{ $t('race.button.start') }} / {{ $t('race.button.pause') }}</span>
          <v-icon :class='{ "ml-1": $vuetify.breakpoint.smAndUp }'>mdi-play-pause</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data: () => ({
  }),
  computed: {
    ...mapState({
      isLoading: (state) => state.global.loader,
      isRaceProgramGenerated: (state) => state.race.isRaceProgramGenerated,
    }),
  },
  methods: {
    ...mapMutations({
      generateRaceLapsProgram: 'race/generateRaceLapsProgram',
    }),
    clickGenerateRaceProgram() {
      this.generateRaceLapsProgram();
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  color: #fff;
  text-decoration: none;
}

.navigation {
  display: flex;
  gap: 1em;
  list-style: none;
  padding-left: 0.7em;

  a {
    color: #fff;
    text-decoration: none;
  }
}
</style>
