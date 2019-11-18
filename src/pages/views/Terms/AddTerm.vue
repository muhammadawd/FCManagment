<template>

  <card class="card" :title="$ml.get('add_term')">
    <div>
      <form @submit.prevent>

        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="name"
                      :label="$ml.get('name')"
                      :placeholder="$ml.get('name')">
            </fg-input>
            <div class="text-danger text-left" id="name_error"></div>
            <div class="text-danger text-left" id="idprogram_error"></div>
          </div>
          <div class="col-md-3 text-left">
            <label>{{$ml.get('term_type')}}</label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="type"
                          :options="types"></multi-select>
            <div class="text-danger text-left" id="type_error"></div>
          </div>
          <div class="col-md-12"></div>
          <div class="col-md-3 text-left">
            <label>{{$ml.get('term_start')}}</label>
            <flat-pickr v-model="startDate" class="form-control"></flat-pickr>
            <div class="text-danger text-left" id="startDate_error"></div>
          </div>
          <div class="col-md-3 text-left">
            <label>{{$ml.get('term_end')}}</label>
            <flat-pickr v-model="endDate" class="form-control"></flat-pickr>
            <div class="text-danger text-left" id="endDate_error"></div>
          </div>
          <div class="col-md-3 text-left">
            <label>{{$ml.get('term_start_register')}}</label>
            <flat-pickr v-model="startStudentRegDate" class="form-control"></flat-pickr>
            <div class="text-danger text-left" id="startStudentRegDate_error"></div>
          </div>
          <div class="col-md-3 text-left">
            <label>{{$ml.get('term_end_register')}}</label>
            <flat-pickr v-model="endStudentRegDate" class="form-control"></flat-pickr>
            <div class="text-danger text-left" id="endStudentRegDate_error"></div>
          </div>
          <div class="col-md-3 text-left">
            <label>{{$ml.get('term_start_editing')}}</label>
            <flat-pickr v-model="startStudentEditRegDate" class="form-control"></flat-pickr>
            <div class="text-danger text-left" id="startStudentEditRegDate_error"></div>
          </div>
          <div class="col-md-3 text-left">
            <label>{{$ml.get('term_end_editing')}}</label>
            <flat-pickr v-model="endStudentEditRegDate" class="form-control"></flat-pickr>
            <div class="text-danger text-left" id="endStudentEditRegDate_error"></div>
          </div>
          <div class="col-md-3 text-left">
            <label>{{$ml.get('term_start_ending')}}</label>
            <flat-pickr v-model="startSubjectRevokeDate" class="form-control"></flat-pickr>
            <div class="text-danger text-left" id="startSubjectRevokeDate_error"></div>
          </div>
          <div class="col-md-3 text-left">
            <label>{{$ml.get('term_end_editing')}}</label>
            <flat-pickr v-model="endSubjectRevokeDate" class="form-control"></flat-pickr>
            <div class="text-danger text-left" id="endSubjectRevokeDate_error"></div>
          </div>
        </div>

        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="addTerm">
            {{$ml.get('add')}}
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>

<script>
  import flatPickr from 'vue-flatpickr-component';
  import multiSelect from 'vue-multiselect';

  import moment from 'moment/moment'
  import 'flatpickr/dist/flatpickr.css';
  import 'vue-multiselect/dist/vue-multiselect.min.css';

  export default {
    name: "addTerm",
    mounted() {
      let vm = this;
      try {
        let auth_data = window.ls.getFromStorage('auth_data');
        vm.idprogram = JSON.parse(auth_data).idprogram;
      } catch (e) {
        vm.idprogram = null;
      }
    },
    data() {
      return {
        types: ['صيفي', 'نظامي'],
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
        startStudentRegDate: moment().format("YYYY-MM-DD"),
        endStudentRegDate: moment().format("YYYY-MM-DD"),
        startStudentEditRegDate: moment().format("YYYY-MM-DD"),
        endStudentEditRegDate: moment().format("YYYY-MM-DD"),
        startSubjectRevokeDate: moment().format("YYYY-MM-DD"),
        endSubjectRevokeDate: moment().format("YYYY-MM-DD"),
        type: null,
        name: null,
        idprogram: null,
      }
    },
    components: {
      flatPickr,
      multiSelect
    },
    methods: {
      prepareData() {
        let vm = this;
        return {
          name: vm.name,
          type: vm.type,
          startDate: vm.startDate,
          endDate: vm.endDate,
          startStudentRegDate: vm.startStudentRegDate,
          endStudentRegDate: vm.endStudentRegDate,
          startStudentEditRegDate: vm.startStudentEditRegDate,
          endStudentEditRegDate: vm.endStudentEditRegDate,
          startSubjectRevokeDate: vm.startSubjectRevokeDate,
          endSubjectRevokeDate: vm.endSubjectRevokeDate,
          idprogram: vm.idprogram,

        };
      },
      prepareValidationInputs() {
        return {
          name: 'input',
          type: 'input',
          startDate: 'input',
          endDate: 'input',
          startStudentRegDate: 'input',
          endStudentRegDate: 'input',
          startStudentEditRegDate: 'input',
          endStudentEditRegDate: 'input',
          startSubjectRevokeDate: 'input',
          endSubjectRevokeDate: 'input',
          idprogram: 'input',
        };
      },
      addTerm() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let _request_data = vm.prepareData();
        let request_data = window.helper.prepareObjectToSend(_request_data);

        try {
          window.serviceAPI.API().post(window.serviceAPI.ADD_SEMESTERS, request_data)
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
      }
    }
  }
</script>

<style scoped>

</style>
