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
                     :title="$ml.get('selectProgram')"
                     title-classes="nav-link"
                     icon="ti-server">
            <a v-for="(program , key) in programs" class="dropdown-item" href="#"
               @click.prevent="changeCurrentProgram(program.idprogram)">
              <i class="fa fa-check text--info" v-if="program.idprogram == $helper.getCurrentProgramId()"></i>
              {{program.name}}
            </a>
          </drop-down>
          <li class="nav-item">
            <a href="#" @click="logout()" class="nav-link">
              <i class="ti-export"></i>
              <p>
                {{$ml.get('logout')}}
              </p>
            </a>
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
        activeNotifications: false,
        programs: [],
      };
    },
    mounted() {
      this.getAllPrograms();
    },
    methods: {
      changeCurrentProgram(program_id) {
        ls.saveToStorage('current_program_id', program_id)
        location.reload()
      },
      getAllPrograms() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_PROGRAMS)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.programs = response.data;
                return null;
              }
              vm.programs = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.programs = [];
          });
        } catch (e) {
          console.log(e)
        }
      },
      logout() {
        ls.clearAllStorage('auth_data');
        this.$router.push({name: 'login'});
      },
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
