<template>

  <card class="card" :title="$ml.get('edit_user')">
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
            <select   multiple="true" v-model="program_id" class="form-control">
               <option v-for="(item , key) in programs" :key="key"  :selected="item" :value="item.idprogram" >{{item.name}}</option>
            </select>

             

             <!-- <multi-select :placeholder="$ml.get('program')" v-model="selectedProgram" label="name"
                          track-by="idprogram"
                          :options="programs" open-direction="bottom" :multiple="true" :searchable="true"
                          :loading="isLoading" :internal-search="true" :clear-on-select="false"
                          :close-on-select="true"></multi-select> -->
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
                    @click.native.prevent="updateUser">
            {{$ml.get('edit')}}
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>

<script>
 import multiSelect from 'vue-multiselect';
  import 'vue-multiselect/dist/vue-multiselect.min.css';

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
        program_id: [],
        isLoading:false,
        selectedProgram:[],
      }
    },
    components: {
      multiSelect,
    },
    mounted() {
      this.getAllRoles()
      this.getAllPrograms()
      this.findUser()
    },
    methods: {

 
       updateSelectedTagging (value) {
          
          this.selectedProgram = value
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
          program_id: "["+vm.program_id+"]",
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
      findUser() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let id = vm.$route.params.id
        try {
          window.serviceAPI.API().get(window.serviceAPI.FIND_USERS + `/${id}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data.data.result;
              // console.log(response)
              vm.firstName = response[0].firstName
              vm.lastName = response[0].lastName
              vm.email = response[0].email
            
            //convert string of program_id to list
            //here
              let vprog=response[0].idprogram.replace('[', '');
              vprog=vprog.replace(']', '');
              if(!vprog.includes(','))
              vm.program_id =[vprog];
              else
              vm.program_id =vprog.split(',').map(Number);
              console.log(vm.program_id.length);
            
              vm.program_id.forEach(element => {
               let value=vm.programs.filter(item => 
               item.idprogram == element);
               vm.selectedProgram.push(value[0]);
               
              });

  
            console.log(vm.selectedProgram);
                //to here
             
              vm.role_id = response[0].role_id

          
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          console.log(e)
        }
      },
      updateUser() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let request_data = vm.prepareData();
        request_data = window.helper.prepareObjectToSend(request_data);

        try {
          window.serviceAPI.API().put(window.serviceAPI.UPDATE_USERS + `/${vm.$route.params.id}`, request_data)
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
