<template>

  <card class="card" :title="$ml.get('edit_course')">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-3">
            <fg-input type="text"
                      v-model="code"
                      :label="$ml.get('code')"
                      :placeholder="$ml.get('code')">
            </fg-input>
            <div class="text-danger text-left" id="code_error"></div>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="name"
                      :label="$ml.get('name')"
                      :placeholder="$ml.get('name')">
            </fg-input>
            <div class="text-danger text-left" id="name_error"></div>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="name_en"
                      :label="$ml.get('name_en')"
                      :placeholder="$ml.get('name_en')">
            </fg-input>
            <div class="text-danger text-left" id="name_en_error"></div>
          </div>
          <div class="col-md-3 text-left">
            <label> {{$ml.get('require_type')}} </label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedUnder" :custom-label="nameWithLang"
                          track-by="name"
                          :options="all_caregories"></multi-select>
          </div>
          <div class="text-danger text-left" id="idprogram_categories_error"></div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="actualLectureHourNum"
                      :label="$ml.get('actual_hours_per_lecture')"
                      :placeholder="$ml.get('actual_hours_per_lecture')">
            </fg-input>
            <div class="text-danger text-left" id="actualLectureHourNum_error"></div>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="nonActualLectureHourNum"
                      :label="$ml.get('un_actual_hours_per_lecture')"
                      :placeholder="$ml.get('un_actual_hours_per_lecture')">
            </fg-input>
            <div class="text-danger text-left" id="nonActualLectureHourNum_error"></div>
          </div>
          <div class="col-md-12"></div>
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="actualPracticalHourNum"
                      :label="$ml.get('activity_hours_per_lecture')"
                      :placeholder="$ml.get('activity_hours_per_lecture')">
            </fg-input>
            <div class="text-danger text-left" id="actualPracticalHourNum_error"></div>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="nonActualPracticalHourNum"
                      :label="$ml.get('un_activity_hours_per_lecture')"
                      :placeholder="$ml.get('un_activity_hours_per_lecture')">
            </fg-input>
            <div class="text-danger text-left" id="nonActualPracticalHourNum_error"></div>
          </div>
          <div class="col-md-12"></div>
        </div>
        <div class="row">
          <div class="col-md-3 text-left">
            <label> {{$ml.get('sec_section')}} </label>
            <select class="form-control" v-model="idsecondary_depts">
              <option v-for="(item , key) in all_sections" :value="item.idsecondary_depts">{{item.name}}</option>
            </select>
            <div class="text-danger text-left" id="idsecondary_depts_error"></div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="preHourRequired"
                      :label="$ml.get('min_hours_required')"
                      :placeholder="$ml.get('min_hours_required')">
            </fg-input>
            <div class="text-danger text-left" id="preHourRequired_error"></div>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="practicalPercentage"
                      :label="$ml.get('year_working_percent')"
                      :placeholder="$ml.get('year_working_percent')">
            </fg-input>
            <div class="text-danger text-left" id="practicalPercentage_error"></div>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="finalPercentage"
                      :label="$ml.get('final_percent')"
                      :placeholder="$ml.get('final_percent')">
            </fg-input>
            <div class="text-danger text-left" id="finalPercentage_error"></div>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="passFinalPercentage"
                      :label="$ml.get('year_working_success_percent')"
                      :placeholder="$ml.get('year_working_success_percent')">
            </fg-input>
            <div class="text-danger text-left" id="passFinalPercentage_error"></div>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="passTotalPercentage"
                      :label="$ml.get('final_success_percent')"
                      :placeholder="$ml.get('final_success_percent')">
            </fg-input>
            <div class="text-danger text-left" id="passTotalPercentage_error"></div>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="totalSubjectMark"
                      :label="$ml.get('final_degree')"
                      :placeholder="$ml.get('final_degree')">
            </fg-input>
            <div class="text-danger text-left" id="totalSubjectMark_error"></div>
          </div>
        </div>

        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="editCourse">
            {{$ml.get('edit')}}
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>

<script>
  import multiSelect from 'vue-multiselect'
  import 'vue-multiselect/dist/vue-multiselect.min.css';

  export default {
    name: "AddCourse",
    components: {
      multiSelect
    },
    data() {
      return {
        selectedUnder: null,
        name: null,
        name_en: null,
        code: null,
        actualLectureHourNum: null,
        nonActualLectureHourNum: null,
        actualPracticalHourNum: null,
        nonActualPracticalHourNum: null,
        preHourRequired: null,
        practicalPercentage: null,
        finalPercentage: null,
        passFinalPercentage: null,
        passTotalPercentage: null,
        totalSubjectMark: null,
        idsecondary_depts: null,
        idprogram_categories: null,
        programId: null,
        all_caregories: [],
        all_sections: [],
      }
    },
    async created() {
      let vm = this;
      try {
        let auth_data = window.ls.getFromStorage('auth_data');
        vm.programId = vm.$helper.getCurrentProgramId();
      } catch (e) {
        vm.programId = null;
      }
      await vm.findProgramRequire();
      await vm.getAllSecDepts();
      await vm.findCourse();

    },
    methods: {
      nameWithLang ({ name, parentName }) {
      return `${name}—${parentName}`
    },
      findProgramRequire() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_PROGRAM_REQUIRE + `?idprogram=${vm.programId}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              vm.all_caregories = response.data.data.result;
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            vm.all_caregories = [];
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          vm.all_caregories = [];
          console.log(e)
        }
      },
      getAllSecDepts() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_SEC_DEPTS)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.all_sections = response.data.result;
                return null;
              }
              vm.all_sections = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.all_sections = [];
          });
        } catch (e) {
          console.log(e)
        }
      },
      prepareData() {
        let vm = this;
        return {
          name: vm.name,
          name_en: vm.name_en,
          code: vm.code,
          actualLectureHourNum: vm.actualLectureHourNum,
          nonActualLectureHourNum: vm.nonActualLectureHourNum,
          actualPracticalHourNum: vm.actualPracticalHourNum,
          nonActualPracticalHourNum: vm.nonActualPracticalHourNum,
          preHourRequired: vm.preHourRequired,
          practicalPercentage: vm.practicalPercentage,
          finalPercentage: vm.finalPercentage,
          passFinalPercentage: vm.passFinalPercentage,
          passTotalPercentage: vm.passTotalPercentage,
          totalSubjectMark: vm.totalSubjectMark,
          idsecondary_depts: vm.idsecondary_depts,
          programId: vm.programId,
          idprogram_categories: vm.selectedUnder ? vm.selectedUnder.idprogram_categories : null,
        };
      },
      prepareValidationInputs() {
        return {
          name: 'input',
          name_en: 'input',
          code: 'input',
          actualLectureHourNum: 'input',
          nonActualLectureHourNum: 'input',
          actualPracticalHourNum: 'input',
          nonActualPracticalHourNum: 'input',
          preHourRequired: 'input',
          practicalPercentage: 'input',
          finalPercentage: 'input',
          passFinalPercentage: 'input',
          passTotalPercentage: 'input',
          totalSubjectMark: 'input',
          idsecondary_depts: 'input',
          idprogram_categories: 'input',
        };
      },
      findCourse() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let id = vm.$route.params.id;
        try {
          window.serviceAPI.API().get(window.serviceAPI.FIND_COURSE + `/${id}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data.data.result;
              vm.name = response[0].name;
              vm.name_en = response[0].name_en;
              vm.code = response[0].code;
              vm.actualLectureHourNum = response[0].actualLectureHourNum;
              vm.nonActualLectureHourNum = response[0].nonActualLectureHourNum;
              vm.actualPracticalHourNum = response[0].actualPracticalHourNum;
              vm.nonActualPracticalHourNum = response[0].nonActualPracticalHourNum;
              vm.preHourRequired = response[0].preHourRequired;
              vm.practicalPercentage = response[0].practicalPercentage;
              vm.finalPercentage = response[0].finalPercentage;
              vm.passFinalPercentage = response[0].passFinalPercentage;
              vm.passTotalPercentage = response[0].passTotalPercentage;
              vm.totalSubjectMark = response[0].totalSubjectMark;
              vm.idsecondary_depts = response[0].idsecondary_depts;
              vm.idsecondary_depts = response[0].idsecondary_depts;
              $.each(vm.all_caregories, function (index, cat) {
                // vm.selectedUnder;
                if (cat.idprogram_categories == response[0].idprogram_categories) {
                  vm.selectedUnder = cat;
                  return
                }
              })
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.showMessage('danger', vm);
            vm.$router.push({name: 'courses'});
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          window.helper.showMessage('danger', vm);
          vm.$router.push({name: 'courses'});
          console.log(e)
        }

      },
      editCourse() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let request_data = vm.prepareData();
        request_data = window.helper.prepareObjectToSend(request_data);
        let id = vm.$route.params.id;

        try {
          window.serviceAPI.API().post(window.serviceAPI.UPDATE_COURSE + `/${id}`, request_data)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.showMessage('success', vm);
              vm.$router.push({name: 'courses'});
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
