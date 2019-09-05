<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link :to="{name:'dashboard'}" :name="$ml.get('dashboard')" icon="ti-panel"/>
        <sidebar-link :to="{name:'lecturer'}" :name="$ml.get('lecturer')" icon="ti-user"/>
        <sidebar-link :to="{name:'sec_section'}" :name="$ml.get('sec_section')" icon="ti-bookmark-alt"/>
        <sidebar-link :to="{name:'country'}" :name="$ml.get('country_section')" icon="ti-location-pin"/>
        <sidebar-link :to="{name:'students'}" :name="$ml.get('students')" icon="ti-user"/>
        <sidebar-link :to="{name:'programs'}" :name="$ml.get('program')" icon="ti-server"/>
        <sidebar-link :to="{name:'courses'}" :name="$ml.get('courses')" icon="ti-agenda"/>
        <sidebar-link :to="{name:'terms'}" :name="$ml.get('terms')" icon="ti-desktop"/>
<!--        <sidebar-link to="/table-list" name="Table List" icon="ti-view-list-alt"/>-->
<!--        <sidebar-link to="/typography" name="Typography" icon="ti-text"/>-->
<!--        <sidebar-link to="/icons" name="Icons" icon="ti-pencil-alt2"/>-->
<!--        <sidebar-link to="/maps" name="Map" icon="ti-map"/>-->
<!--        <sidebar-link to="/notifications" name="Notifications" icon="ti-bell"/>-->
      </template>
      <mobile-menu>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-panel"></i>
            <p>Stats</p>
          </a>
        </li>
        <drop-down class="nav-item"
                   title="5"
                   title-classes="nav-link"
                   icon="ti-bell">
          <a class="dropdown-item">Notification 1</a>
          <a class="dropdown-item">Notification 2</a>
          <a class="dropdown-item">Notification 3</a>
          <a class="dropdown-item">Notification 4</a>
          <a class="dropdown-item">Another notification</a>
        </drop-down>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-settings"></i>
            <p>logout</p>
          </a>
        </li>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
  import TopNavbar from "./TopNavbar.vue";
  import ContentFooter from "./ContentFooter.vue";
  import DashboardContent from "./Content.vue";
  import MobileMenu from "./MobileMenu";

  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
