<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link v-if="$helper.hasAccessPermission('ALLOW_ALL')" :to="{name:'dashboard'}"
                      :name="$ml.get('dashboard')"
                      icon="ti-panel"/>
        <sidebar-link v-if="$helper.hasAccessPermission('get-stuffMembers-all')" :to="{name:'lecturer'}"
                      :name="$ml.get('lecturer')"
                      icon="ti-user"/>
        <sidebar-link v-if="$helper.hasAccessPermission('get-countries')" :to="{name:'country'}"
                      :name="$ml.get('country_section')" icon="ti-location-pin"/>
        <sidebar-link v-if="$helper.hasAccessPermission('get-secondaryDepts')" :to="{name:'sec_section'}"
                      :name="$ml.get('sec_section')" icon="ti-bookmark-alt"/>
        <sidebar-link v-if="$helper.hasAccessPermission('get-students')" :to="{name:'students'}"
                      :name="$ml.get('students')"
                      icon="ti-user"/>
        <sidebar-link v-if="$helper.hasAccessPermission('top_50_student')" :to="{name:'top_50_student',params:{id:id}}"
                      :name="$ml.get('top_50_student')" icon="ti-user"/>
        <sidebar-link v-if="$helper.hasAccessPermission('profile_student')"
                      :to="{name:'profile_student',params:{id:id}}"
                      :name="$ml.get('profile_student')" icon="ti-user"/>
        <sidebar-link v-if="$helper.hasAccessPermission('get-programs')" :to="{name:'programs'}"
                      :name="$ml.get('program')"
                      icon="ti-server"/>
        <sidebar-link v-if="$helper.hasAccessPermission('get-courses')" :to="{name:'courses'}"
                      :name="$ml.get('courses')"
                      icon="ti-agenda"/>
        <sidebar-link v-if="$helper.hasAccessPermission('get-semester')" :to="{name:'terms'}" :name="$ml.get('terms')"
                      icon="ti-desktop"/>
        <sidebar-link v-if="$helper.hasAccessPermission('get-exceptions')" :to="{name:'excuses'}"
                      :name="$ml.get('excuses')"
                      icon="ti-alert"/>
        <sidebar-link v-if="$helper.hasAccessPermission('get-getStudentCoursesToSelectAndConfig')"
                      :to="{name:'student_subject'}"
                      :name="$ml.get('student_subject')"
                      icon="ti-face-smile"/>
        <sidebar-link v-if="$helper.hasAccessPermission('get-find-Students-Grade-Info')" :to="{name:'degrees'}"
                      :name="$ml.get('degrees')"
                      icon="ti-zip"/>
        <sidebar-link v-if="$helper.hasAccessPermission('show_users')" :to="{name:'users'}"
                      :name="$ml.get('users')"
                      icon="ti-user"/>
        <sidebar-link v-if="$helper.hasAccessPermission('show_roles')" :to="{name:'roles'}"
                      :name="$ml.get('roles')"
                      icon="ti-zip"/>
      </template>
      <mobile-menu>
        <li class="nav-item">
          <a class="nav-link" @click="changeLang()">
            <i class="ti-panel"></i>
            <p>{{$ml.get($ml.current)}}</p>
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
            <p>
              {{$ml.get('logout')}}
            </p>
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
    data() {
      return {
        id: 1
      }
    },
    mounted() {
      this.getUserId();
    },
    methods: {
      getUserId() {
        let auth_data = JSON.parse(localStorage.getItem('auth_data'));
        if (auth_data) {
          this.id = auth_data.userInfo.idusers;
        }
      },
      changeLang() {
        if (this.$ml.current == 'ar') {
          this.$ml.change('en')
        } else {
          this.$ml.change('ar');
        }
        location.reload()
      },
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
