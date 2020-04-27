<template>
  <card class="card-user" :title="$ml.get('term_subject_hours')">
    <div class="row">
      <div class="col-md-3">
        <fg-input type="text"
                  v-model="fromGPA"
                  :label="$ml.get('gpa_from')"
                  :placeholder="$ml.get('gpa_from')">
        </fg-input>
        <div class="text-danger text-left" id="fromGPA_error"></div>
        <div class="text-danger text-left" id="idsemester_error"></div>
      </div>
      <div class="col-md-3">
        <fg-input type="text"
                  v-model="toGPA"
                  :label="$ml.get('gpa_to')"
                  :placeholder="$ml.get('gpa_to')">
        </fg-input>
        <div class="text-danger text-left" id="toGPA_error"></div>
      </div>
      <div class="col-md-3">
        <fg-input type="text"
                  v-model="normalMaxHours"
                  :label="$ml.get('max_hours')"
                  :placeholder="$ml.get('max_hours')">
        </fg-input>
        <div class="text-danger text-left" id="normalMaxHours_error"></div>
      </div>
      <div class="col-md-3">
        <fg-input type="text"
                  v-model="exceptionMaxHours"
                  :label="$ml.get('special_max_hours')"
                  :placeholder="$ml.get('special_max_hours')">
        </fg-input>
        <div class="text-danger text-left" id="exceptionMaxHours_error"></div>
      </div>
      <div class="col-md-3">
        <fg-input type="text"
                  v-model="normalMinHours"
                  :label="$ml.get('min_hours')"
                  :placeholder="$ml.get('min_hours')">
        </fg-input>
        <div class="text-danger text-left" id="normalMinHours_error"></div>
      </div>
      <div class="col-md-3">
        <fg-input type="text"
                  v-model="exceptionMinHours"
                  :label="$ml.get('special_min_hours')"
                  :placeholder="$ml.get('special_min_hours')">
        </fg-input>
        <div class="text-danger text-left" id="exceptionMinHours_error"></div>
      </div>
      <div class="col-md-12 text-center">
        <button class="btn btn-black mt-2" v-if="$helper.hasAccessPermission('add-semConfigHours')"
                @click="addHourConfig()">{{$ml.get('add')}}
        </button>
      </div>
      <div class="col-md-12 text-left">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <th width="50">#</th>
            <th>{{$ml.get('gpa_from')}}</th>
            <th>{{$ml.get('gpa_to')}}</th>
            <th>{{$ml.get('max_hours')}}</th>
            <th>{{$ml.get('min_hours')}}</th>
            <th>{{$ml.get('special_max_hours')}}</th>
            <th>{{$ml.get('special_min_hours')}}</th>
            <th width="50"></th>
            </thead>
            <tbody>
            <tr v-for="(item, index) in term_hours" :key="index" :id="'term_hour'+item.idsemester_Config_Hours">
              <td>{{index + 1}}</td>
              <td>
                <b>{{item.fromGPA}}</b>
              </td>
              <td>
                <b>{{item.toGPA}}</b>
              </td>
              <td>
                <b>{{item.normalMaxHours}} <span class="text-success">{{$ml.get('hours')}}</span></b>
              </td>
              <td>
                <b>{{item.normalMinHours}} <span class="text-success">{{$ml.get('hours')}}</span></b>
              </td>
              <td>
                <b>{{item.exceptionMaxHours}} <span class="text-success">{{$ml.get('hours')}}</span></b>
              </td>
              <td>
                <b>{{item.exceptionMinHours}} <span class="text-success">{{$ml.get('hours')}}</span></b>
              </td>
              <td>
                <div class="btn-group direction-inverse">
                  <button class="btn btn-danger" @click="deleteTermHours(item)"
                          v-if="$helper.hasAccessPermission('delete-semConfigHours-by-id')">
                    <i class="ti-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </card>
</template>

<script>
  export default {
    name: "termHours",
    data() {
      return {
        idsemester: null,
        term_hours: [],
        fromGPA: null,
        toGPA: null,
        normalMaxHours: null,
        normalMinHours: null,
        exceptionMaxHours: null,
        exceptionMinHours: null,
      }
    },
    mounted() {
      let vm = this;
      vm.idsemester = vm.$route.params.term_id;
      vm.getTermHours();
    },
    methods: {
      prepareData() {
        let vm = this;
        return {
          fromGPA: vm.fromGPA,
          toGPA: vm.toGPA,
          normalMaxHours: vm.normalMaxHours,
          normalMinHours: vm.normalMinHours,
          exceptionMaxHours: vm.exceptionMaxHours,
          exceptionMinHours: vm.exceptionMinHours,
          idsemester: vm.idsemester,

        };
      },
      prepareValidationInputs() {
        return {
          idsemester: 'input',
          fromGPA: 'input',
          toGPA: 'input',
          normalMaxHours: 'input',
          normalMinHours: 'input',
          exceptionMaxHours: 'input',
          exceptionMinHours: 'input',
        };
      },
      addHourConfig() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let _request_data = vm.prepareData();
        let request_data = window.helper.prepareObjectToSend(_request_data);

        try {
          window.serviceAPI.API().post(window.serviceAPI.ADD_HOURS_SEMESTER, request_data)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.showMessage('success', vm);
              vm.$router.push({name: 'terms'});
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          console.log(e)
        }
      },
      deleteTermHours(hour) {
        let vm = this;
        vm.$swal({
          title: vm.$ml.get('confirm_warning'),
          text: vm.$ml.get('are_you_sure'),
          type: 'warning',
          showLoaderOnConfirm: true,
          showCancelButton: true,
          confirmButtonText: vm.$ml.get('yes'),
          cancelButtonText: vm.$ml.get('no')
        }).then((result) => {
          if (result.value) {
            window.serviceAPI.API().delete(window.serviceAPI.DELETE_HOURS_SEMESTER + `/${hour.idsemester_Config_Hours}`)
              .then((response) => {
                vm.$root.$children[0].$refs.loader.show_loader = false;
                $(`#term_hour${hour.idsemester_Config_Hours}`).remove()
              }).catch((error) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.handleError(error, vm);
            });

          }
        });
      },
      getTermHours() {
        let vm = this;
        let term_id = vm.$route.params.term_id;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_HOURS_SEMESTER + `/${term_id}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.term_hours = response.data.result;
                return null;
              }
              vm.term_hours = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.term_hours = [];
          });
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>
