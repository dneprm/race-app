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
          :disabled="isLoading || isRaceProgramGenerated"
          @click="clickGenerateRaceProgram"
        >
          <span v-if="$vuetify.breakpoint.smAndUp">{{ $t('race.button.generate') }}</span>
          <v-icon :class='{ "ml-1": $vuetify.breakpoint.smAndUp }'>mdi-creation</v-icon>
        </v-btn>
        <v-btn
          class="ml-5 justify-end"
          color="info"
          :disabled="isLoading || !isRaceProgramGenerated || raceFinished || isPauseBetweenLapsActive"
          @click="clickStartPauseRaceLaps"
        >
          <span v-if="$vuetify.breakpoint.smAndUp">{{ $t('race.button.start') }} / {{ $t('race.button.pause') }}</span>
          <v-icon :class='{ "ml-1": $vuetify.breakpoint.smAndUp }'>mdi-play-pause</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data: () => ({
  }),
  computed: {
    ...mapState({
      isLoading: (state) => state.global.loader,
      isRaceProgramGenerated: (state) => state.race.isRaceProgramGenerated,
      raceLaps: (state) => state.race.raceLaps,
      raceFinished: (state) => state.race.raceFinished,
      isPauseBetweenLapsActive: (state) => state.race.isPauseBetweenLapsActive,
    }),
    ...mapGetters({
      currentRaceLapIndex: 'race/getCurrentRaceLapIndex',
    }),
  },
  destroyed() {
    this.clearLapRaceProgramIntervals(this.currentRaceLapIndex);
  },
  methods: {
    ...mapMutations({
      generateRaceLapsProgram: 'race/generateRaceLapsProgram',
      setIsCurrentRaceLapState: 'race/setIsCurrentRaceLapState',
      setRaceLapPropertyState: 'race/setRaceLapPropertyState',
      clearLapRaceProgramIntervals: 'race/clearLapRaceProgramIntervals',
      initRaceLaps: 'race/initRaceLaps',
      setRaceFinished: 'race/setRaceFinished',
    }),
    ...mapActions({
      increaseLapRaceProgramProgress: 'race/increaseLapRaceProgramProgress',
    }),
    clickGenerateRaceProgram() {
      if (this.raceFinished) {
        this.initRaceLaps();
        this.setRaceFinished(false);
      }
      this.generateRaceLapsProgram();
    },
    clickStartPauseRaceLaps() {
      if (this.currentRaceLapIndex === null) {
        // set isCurrent to true for 0 index
        this.setRaceLapPropertyState({ index: 0, property: 'isCurrent', state: true });
      }

      if (!this.raceLaps[this.currentRaceLapIndex].isInProgress) {
        // start
        this.startLapRace(this.currentRaceLapIndex);
        return;
      }

      if (this.raceLaps[this.currentRaceLapIndex].isInProgress) {
        // pause
        this.pauseLapRace();
      }
    },
    startLapRace(lapIndex) {
      // set isInProgress to true for lapIndex
      this.setRaceLapPropertyState({ index: lapIndex, property: 'isInProgress', state: true });
      // set intervals for increase horses progress for lapIndex lap
      this.increaseLapRaceProgramProgress(lapIndex);
    },
    pauseLapRace() {
      // set isInProgress to false for currentRaceLapIndex
      this.setRaceLapPropertyState({ index: this.currentRaceLapIndex, property: 'isInProgress', state: false });
      // clear intervals for current lap programs
      this.clearLapRaceProgramIntervals(this.currentRaceLapIndex);
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
