<template>
  <div class="text-center">
    <h1 class="font-weight-bold">{{$ml.get('dashboard')}}</h1>
  </div>
</template>
<script>
  import {StatsCard, ChartCard} from "@/components/index";
  import Chartist from 'chartist';

  export default {
    components: {
      StatsCard,
      ChartCard
    },
    /**
     * Chart data used to render stats, charts. Should be replaced with server data
     */
    data() {
      return {};
    }
  };
</script>
<style>
</style>
