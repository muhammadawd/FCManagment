<template>

  <card class="card" :title="$ml.get('add_role')">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-3">
            <fg-input type="text"
                      v-model="name"
                      :label="$ml.get('name')"
                      :placeholder="$ml.get('name')">
            </fg-input>
            <div class="text-left text-danger" style="font-size: 14px" id="name_error"></div>
            <div class="text-left text-danger" style="font-size: 14px" id="role_permissions_error"></div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div dir="ltr">
              <b-card no-body>
                <b-tabs card>
                  <b-tab v-for="(category, key) in all_permssions" :title="key" active :key="key">
                    <b-card-text class="text-left" dir="ltr">
                      <b-form-checkbox-group
                        v-model="role_permissions"
                        :options="category"
                        class="mb-3"
                        value-field="id"
                        switches
                        text-field="displayname"
                        disabled-field="notEnabled"
                      ></b-form-checkbox-group>
                    </b-card-text>
                  </b-tab>
                </b-tabs>
              </b-card>
            </div>
          </div>
        </div>

        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="addRole">
            {{$ml.get('add')}}
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>

<script>
  import Vue from 'vue'
  import {BootstrapVue} from 'bootstrap-vue'

  Vue.use(BootstrapVue)

  export default {
    name: "AddRole",
    data() {
      return {
        name: null,
        role_permissions: [],
        all_permssions: []
      }
    },
    created() {
      this.allPermissions();
    },
    methods: {
      prepareData() {
        let vm = this;
        return {
          name: vm.name,
          role_permissions: vm.role_permissions
        };
      },
      prepareValidationInputs() {
        return {
          name: 'input',
          role_permissions: 'input',
        };
      },
      allPermissions() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_PERMISSIONS)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.all_permssions = response.data.data;
                return
              }
              // console.log(response)
              vm.all_permssions = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          console.log(e)
        }
      },
      addRole() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let request_data = vm.prepareData();
        request_data = window.helper.prepareObjectToSend(request_data);

        try {
          window.serviceAPI.API().post(window.serviceAPI.ADD_ROLES, request_data)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.showMessage('success', vm);
              vm.$router.push({name: 'roles'});
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

<style>
</style>
