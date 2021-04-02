<template>
  <v-layout wrap>
    <v-flex v-if="$vuetify.breakpoint.smAndUp" xs12 pb-0 mt-4>
      <v-layout wrap align-center>
         <v-flex xs12 sm6>
           <h2 class="title mt-2 mb-2">{{ $t('race.lapsList.program.title') }}</h2>
         </v-flex>
         <v-flex xs12 sm6>
           <h2 class="title mt-2 mb-2">{{ $t('race.lapsList.result.title') }}</h2>
         </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 v-for="(lap, index) in raceLaps" :key="`lap-${index}`" pb-0 mt-4>
      <v-layout wrap>
         <h2 v-if="$vuetify.breakpoint.xsOnly" class="title mt-2 mb-2">{{ $t('race.lapsList.program.title') }}</h2>
         <v-flex xs12 sm6 :class="{ 'pr-3': $vuetify.breakpoint.smAndUp }">
           <h5>{{ $t('race.lapsList.lap') }} {{ index+1 }} - {{ lap.lapDistance }}m</h5>
           <v-data-table
            :items="lap.program"
            :headers="headers"
            :loading="isLoading"
            :loading-text="$t('common.table.dataIsLoading')"
            :mobile-breakpoint="100"
            class="table-custom lapList small mb-4"
            hide-default-footer
            disable-pagination
          >
            <template slot="item" slot-scope="{ item }">
              <tr>
                <td class="text-xs-left">{{ item.position }}</td>
                <td class="text-xs-left">{{ item.name }}</td>
              </tr>
            </template>
            <template slot="no-data">{{ $t('common.table.noData') }}</template>
          </v-data-table>
         </v-flex>
         <h2 v-if="$vuetify.breakpoint.xsOnly" class="title mt-2 mb-2">{{ $t('race.lapsList.result.title') }}</h2>
         <v-flex xs12 sm6 :class="{ 'pl-3': $vuetify.breakpoint.smAndUp }">
           <h5>{{ $t('race.lapsList.lap') }} {{ index+1 }} - {{ lap.lapDistance }}m</h5>
           <v-data-table
            :items="lap.result"
            :headers="headers"
            :loading="isLoading"
            :loading-text="$t('common.table.dataIsLoading')"
            :mobile-breakpoint="100"
            class="table-custom lapList small mb-4"
            hide-default-footer
            disable-pagination
          >
            <template slot="item" slot-scope="{ item }">
              <tr>
                <td class="text-xs-left">{{ item.position }}</td>
                <td class="text-xs-left">{{ item.name }}</td>
              </tr>
            </template>
            <template slot="no-data">{{ $t('common.table.noData') }}</template>
          </v-data-table>
           
         </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'LapsList',
  components: {
  },
  data() {
    return {
      headers: [
        { text: this.$t('race.lapsList.tableHeaders.position'), sortable: false },
        { text: this.$t('race.lapsList.tableHeaders.name'), sortable: false },
      ],
    };
  },
  computed: {
    ...mapState({
      raceLaps: (state) => state.race.raceLaps,
      isLoading: (state) => state.global.loader,
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>
