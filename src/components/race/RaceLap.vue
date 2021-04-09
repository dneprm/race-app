<template>
  <v-layout wrap>
    <v-flex xs12 pb-0 mt-4>
      <v-layout wrap align-center>
        <h2 v-if="currentRaceLapIndex !== null" class="title mt-2 mb-2">
          {{ $t('race.lapsList.lap') }} {{ currentRaceLapIndex + 1 }} - {{ raceLaps[currentRaceLapIndex].lapDistance }}m
          <span v-if="raceLaps[currentRaceLapIndex].isInProgress">{{ $t('race.raceLap.isRunning') }}</span>
          <span v-if="!raceLaps[currentRaceLapIndex].isInProgress">{{ $t('race.raceLap.isPaused') }}</span>
        </h2>
        <h2 v-if="isPauseBetweenLapsActive" class="title mt-2 mb-2">
          {{ $t('race.raceLap.pauseBetweenLaps') }}
        </h2>
        <h2 v-if="raceFinished" class="title mt-2 mb-2">
          {{ $t('race.raceLap.isFinished') }}
        </h2>
        <p v-if="raceFinished" class="font-italic">
          <v-icon color="info">mdi-information</v-icon>
          {{ $t('race.raceLap.generateProgram') }}
        </p>
      </v-layout>
    </v-flex>
    <v-flex xs12 mb-4 class="text-right text-uppercase font-weight-bold finish-title">
      {{ $t('race.raceLap.finish') }}
    </v-flex>
    <v-flex xs12 pb-0 mt-4>
      <v-layout wrap align-top v-for="(index) in horsesInLap" :key="`lap-${index}`">
        <v-flex xs1 pt-4 pb-4>
          <v-avatar
            color="primary"
            size="26"
          >
            <span class="white--text">{{ index }}</span>
          </v-avatar>
        </v-flex>
        <v-flex xs10 pt-4 class="horse-slider">
          <v-slider
            v-if="currentRaceLapIndex !== null"
            :value="raceLaps[currentRaceLapIndex].program[index-1].progress"
            :thumb-size="28"
            thumb-color="transparent"
            thumb-label="always"
            readonly
          >
            <template v-slot:thumb-label="{}">
              <svgicon
                class="horse-icon"
                name="horse"
                width="55"
                height="40"
                :color="raceLaps[currentRaceLapIndex].program[index-1].color"
                :original="true"
              />
            </template>
          </v-slider>
          <v-slider
            v-if="currentRaceLapIndex === null"
            v-model="defaultSlider"
            :thumb-size="28"
            thumb-color="transparent"
            thumb-label="always"
            readonly
          >
          </v-slider>
        </v-flex>
      </v-layout>
    </v-flex>
    
  </v-layout>
</template>

<script>
import '@/static/compiled-svg/horse';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'RaceLap',
  components: {
  },
  data() {
    return {
      defaultSlider: 0,
      horsesInLap: +process.env.VUE_APP_HORSES_IN_LAP_COUNT
    }
  },
  computed: {
    ...mapState({
      raceLaps: (state) => state.race.raceLaps,
      isLoading: (state) => state.global.loader,
      isPauseBetweenLapsActive: (state) => state.race.isPauseBetweenLapsActive,
      raceFinished: (state) => state.race.raceFinished,
    }),
    ...mapGetters({
      currentRaceLapIndex: 'race/getCurrentRaceLapIndex',
    }),
  },
};
</script>

<style lang="scss" scoped>
.horse-icon {
  transform: scaleX(-1);
  fill: #616161;
}
.horse-slider {
  border-right: 3px solid red;
}
.finish-title {
  color: red;
  padding-right: 10px;
}
</style>
