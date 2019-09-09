<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid direction">
      <a class="navbar-brand" href="#">{{$ml.get(routeName)}}</a>
      <button class="navbar-toggler navbar-burger"
              type="button"
              @click="toggleSidebar"
              :aria-expanded="$sidebar.showSidebar"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto direction">
          <li class="nav-item">
            <a href="#" class="nav-link" @click="changeLang()">
              <i class="ti-panel"></i>
              <b class="p-t-5">{{$ml.get($ml.current)}}</b>
            </a>
          </li>
          <drop-down class="nav-item"
                     :title="$ml.get('notification')"
                     title-classes="nav-link"
                     icon="ti-bell">
            <a class="dropdown-item" href="#">Notification 1</a>
            <a class="dropdown-item" href="#">Notification 2</a>
            <a class="dropdown-item" href="#">Notification 3</a>
            <a class="dropdown-item" href="#">Notification 4</a>
            <a class="dropdown-item" href="#">Another notification</a>
          </drop-down>
          <li class="nav-item">
            <router-link :to="{name:'login'}" class="nav-link">
              <i class="ti-export"></i>
              <p>
                {{$ml.get('logout')}}
              </p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  export default {
    computed: {
      routeName() {
        const {name} = this.$route;

        return name;
        // return this.capitalizeFirstLetter(name);
      }
    },
    data() {
      return {
        activeNotifications: false
      };
    },
    methods: {
      changeLang() {
        if (this.$ml.current == 'ar') {
          this.$ml.change('en')
        } else {
          this.$ml.change('ar');
        }
        location.reload()
      },
      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      },
      toggleNotificationDropDown() {
        this.activeNotifications = !this.activeNotifications;
      },
      closeDropDown() {
        this.activeNotifications = false;
      },
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      }
    }
  };
</script>
<style>
</style>
