<template>
  <v-layout
    align-center
    justify-center
    :class="{ 'pt-2': $vuetify.breakpoint.smAndUp }"
  >
    <v-layout wrap class="mb-1" :class="{ 'pt-4': $vuetify.breakpoint.smAndUp }">
      <v-flex xs12 pt-4>
        <h1 class="headline">{{ $t('notFound.title') }}</h1>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  name: 'NotFoundPage',
};
</script>

<style lang="scss" scoped>
</style>
