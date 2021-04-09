<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import { generateHorsesList } from '@/helpers/generateHorsesList';

export default {
  name: 'App',
  components: {
  },
  data: () => ({
  }),
  async created() {
    this.setLoader(true);
    // generate initial horse list for race
    await this.generateHorsesListForRace();
    // generate initial race laps
    this.initRaceLaps();
    this.setLoader(false);
  },
  methods: {
    ...mapActions({
      fetchHorsesData: 'race/fetchHorsesData',
    }),
    ...mapMutations({
      setLoader: 'global/setLoader',
      setHorsesList: 'race/setHorsesList',
      initRaceLaps: 'race/initRaceLaps',
      setRaceLaps: 'race/setRaceLaps',
    }),
    async generateHorsesListForRace() {
      const initialHorsesList = await this.fetchHorsesData();
      const horsesList = generateHorsesList(initialHorsesList, process.env.VUE_APP_HORSES_LIST_COUNT);
      this.setHorsesList(horsesList);
    },
  },
};
</script>

<style lang="scss">
  @import '~@/assets/styles/index';
</style>
