<template>

  <card class="card" :title="$ml.get('add_user')">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="firstName"
                      :label="$ml.get('firstName')"
                      :placeholder="$ml.get('firstName')">
            </fg-input>
            <div class="text-left text-danger" id="firstName_error"></div>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="lastName"
                      :label="$ml.get('lastName')"
                      :placeholder="$ml.get('lastName')">
            </fg-input>
            <div class="text-left text-danger" id="lastName_error"></div>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="email"
                      :label="$ml.get('email')"
                      :placeholder="$ml.get('email')">
            </fg-input>
            <div class="text-left text-danger" id="email_error"></div>
          </div>
          <div class="col-md-4">
            <fg-input type="password"
                      v-model="password"
                      :label="$ml.get('password')"
                      :placeholder="$ml.get('password')">
            </fg-input>
            <div class="text-left text-danger" id="password_error"></div>
          </div>
          <div class="col-md-4 text-left">
            <label>{{$ml.get('program')}}</label>
            <select v-model="program_id" class="form-control">
              <option v-for="(item , key) in programs" :key="key" :value="item.idprogram">{{item.name}}</option>
            </select>
            <div class="text-left text-danger" id="program_id_error"></div>
          </div>
          <div class="col-md-4 text-left">
            <label>{{$ml.get('roles')}}</label>
            <select v-model="role_id" class="form-control">
              <option v-for="(item , key) in roles" :key="key" :value="item.id">{{item.name}}</option>
            </select>
            <div class="text-left text-danger" id="role_id_error"></div>
          </div>
        </div>

        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="addUser">
            {{$ml.get('add')}}
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>

<script>
  export default {
    name: "AddLecturer",
    data() {
      return {
        roles: [],
        programs: [],
        firstName: null,
        lastName: null,
        password: null,
        email: null,
        role_id: null,
        program_id: null,
      }
    },
    mounted() {
      this.getAllRoles()
      this.getAllPrograms()
    },
    methods: {
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
      getAllRoles() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_ROLES)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.roles = response.data.result;
                return null;
              }
              vm.roles = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.roles = [];
          });
        } catch (e) {
          console.log(e)
        }
      },
      prepareData() {
        let vm = this;
        return {
          firstName: vm.firstName,
          lastName: vm.lastName,
          email: vm.email,
          password: vm.password,
          role_id: vm.role_id,
          program_id: vm.program_id,
        };
      },
      prepareValidationInputs() {
        return {
          firstName: 'input',
          lastName: 'input',
          password: 'input',
          email: 'input',
          role_id: 'input',
          program_id: 'input',
        };
      },
      addUser() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let request_data = vm.prepareData();
        request_data = window.helper.prepareObjectToSend(request_data);

        try {
          window.serviceAPI.API().post(window.serviceAPI.ADD_USERS, request_data)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.showMessage('success', vm);
              vm.$router.push({name: 'users'});
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style scoped>

</style>
