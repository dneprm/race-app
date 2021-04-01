<template>
  <v-layout wrap>
    <v-flex xs12 pb-0 mt-4>
      <v-layout wrap align-center>
        <h2 class="title mt-2 mb-2">{{ $t('race.horsesList.title') }}</h2>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <v-data-table
        id="horsesList"
        :items="horsesList"
        :headers="headers"
        :loading="isLoading"
        :loading-text="$t('common.table.dataIsLoading')"
        :mobile-breakpoint="100"
        class="table-custom horsesList small mb-4"
        hide-default-footer
        disable-pagination
      >
        <template slot="item" slot-scope="{ item }">
          <tr>
            <td class="text-xs-left">
              <div>{{ item.name }}</div>
            </td>
            <td class="text-xs-left">{{ item.condition }}</td>
            <td class="text-xs-left">{{ item.color }}</td>
          </tr>
        </template>
        <template slot="no-data">{{ $t('common.table.noData') }}</template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import { generateHorsesList } from '@/helpers/generateHorsesList';

export default {
  name: 'HorsesList',
  components: {
  },
  data() {
    return {
      headers: [
        { text: this.$t('race.horsesList.tableHeaders.name'), sortable: false },
        { text: this.$t('race.horsesList.tableHeaders.condition'), sortable: false },
        { text: this.$t('race.horsesList.tableHeaders.color'), sortable: false },
      ],
    };
  },
  computed: {
    ...mapState({
      horsesList: (state) => state.race.horsesList,
      isLoading: (state) => state.global.loader,
    }),
  },
  async created() {
    await this.generateHorsesListForRace();
  },
  destroyed() {
    this.setLoader(false);
    this.setHorsesList([]);
  },
  methods: {
    ...mapActions({
      fetchHorsesData: 'race/fetchHorsesData',
    }),
    ...mapMutations({
      setLoader: 'global/setLoader',
      setHorsesList: 'race/setHorsesList',
    }),
    async generateHorsesListForRace() {
      this.setLoader(true);
      const initialHorsesList = await this.fetchHorsesData();
      const horsesList = generateHorsesList(initialHorsesList, 20);
      this.setHorsesList(horsesList);
      this.setLoader(false);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
