<template>
  <v-layout
    align-center
    justify-center
    :class="{ 'pt-2': $vuetify.breakpoint.smAndUp }"
  >
    <v-layout wrap class="mb-1" :class="{ 'pt-4': $vuetify.breakpoint.smAndUp }">
      <v-flex xs12 pt-4>
        <h1 class="headline">{{ $t('race.pageTitle') }}</h1>
      </v-flex>
      <v-flex xs12 sm12 md3>
        <horses-list></horses-list>
      </v-flex>
      <v-flex :class="{ 'pr-4 pl-4': $vuetify.breakpoint.mdAndUp }" xs12 sm12 md5>
        <race-lap></race-lap>
      </v-flex>
      <v-flex xs12 sm12 md4>
        <laps-list></laps-list>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import HorsesList from '@/components/race/HorsesList.vue';
import LapsList from '@/components/race/LapsList.vue';
import RaceLap from '@/components/race/RaceLap.vue';

export default {
  name: 'RacePage',
  components: {
    HorsesList,
    LapsList,
    RaceLap,
  },
};
</script>

<style lang="scss" scoped>
</style>
