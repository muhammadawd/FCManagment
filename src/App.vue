<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <Loader :ref="'loader'"/>
    <notifications></notifications>
    <router-view></router-view>
  </div>
</template>

<script>
  import Loader from './components/Loader'

  export default {
    data() {
      return {
        show: true,
      }
    },
    mounted() {
      let vm = this;
      if (vm.$ml.current == 'ar') {
        import("@/assets/css/app.css")
      }
      setTimeout(() => {
        vm.$refs.loader.show_loader = false;
      }, 1000)
    },
    components: {
      Loader
    }
  };
</script>

<style lang="scss">
  .vue-notifyjs.notifications {
    .alert {
      z-index: 10000;
    }

    .list-move {
      transition: transform 0.3s, opacity 0.4s;
    }

    .list-item {
      display: inline-block;
      margin-right: 10px;
    }

    .list-enter-active {
      transition: transform 0.2s ease-in, opacity 0.4s ease-in;
    }

    .list-leave-active {
      transition: transform 1s ease-out, opacity 0.4s ease-out;
    }

    .list-enter {
      opacity: 0;
      transform: scale(1.1);
    }

    .list-leave-to {
      opacity: 0;
      transform: scale(1.2, 0.7);
    }
  }
</style>
