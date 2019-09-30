<template>

  <card class="card" :title="$ml.get('edit_program_requires')">
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
          </div>
          <div class="col-md-3">
            <fg-input type="text"
                      v-model="hoursRequired"
                      :label="$ml.get('count_hours')"
                      :placeholder="$ml.get('count_hours')">
            </fg-input>
            <div class="text-danger text-left" id="hoursRequired_error"></div>
          </div>
          <div class="col-md-3 text-left">
            <label>{{$ml.get('under_requires')}}</label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedUnder" label="name"
                          track-by="name"
                          :options="all_caregories"></multi-select>
          </div>
          <div class="text-danger text-left" id="parentIdprogram_categories_error"></div>
        </div>

        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="editProgramRequire">
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
    name: "AddLecturer",
    components: {
      multiSelect
    },
    data() {
      return {
        all_caregories: [],
        name: null,
        hoursRequired: null,
        selectedUnder: null,
        //
      }
    },
    async created() {
      await this.findProgramRequire()
    },
    methods: {
      prepareData() {
        let vm = this;
        return {
          name: vm.name,
          hoursRequired: vm.hoursRequired,
          parentIdprogram_categories: vm.selectedUnder ? vm.selectedUnder.idprogram_categories : null
        };
      },
      prepareValidationInputs() {
        return {
          name: 'input',
          hoursRequired: 'input',
          parentIdprogram_categories: 'input',
        };
      },
      editProgramRequire() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let idprogram = vm.$route.params.program_id;
        let id = vm.$route.params.id;

        let request_data = vm.prepareData();
        request_data = window.helper.prepareObjectToSend(request_data);

        try {
          window.serviceAPI.API().put(window.serviceAPI.UPDATE_PROGRAMS_REQUIRE + `/${id}`, request_data)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.showMessage('success', vm);
              vm.$router.push({name: 'show_program', params: {id: idprogram}});
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          console.log(e)
        }
      },
      findProgramRequiredData() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let idprogram = vm.$route.params.program_id;
        let id = vm.$route.params.id;
        try {
          window.serviceAPI.API().get(window.serviceAPI.FIND_PROGRAM_REQUIRE + `/${id}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data.data.result;
              vm.name = response[0].name
              vm.hoursRequired = response[0].hoursRequired
              vm.name = response[0].name
              $.each(vm.all_caregories, function (index, cat) {
                // vm.selectedUnder;
                if (cat.idprogram_categories == response[0].parentIdprogram_categories) {
                  console.log(response[0].parentIdprogram_categories)
                  console.log(cat.parentIdprogram_categories)
                  console.log('cat.parentIdprogram_categories')
                  vm.selectedUnder = cat;
                  return
                }
              })
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            // window.helper.showMessage('danger', vm);
            // vm.$router.push({name: 'programs'});
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          vm.all_caregories = [];
          // window.helper.showMessage('danger', vm);
          // vm.$router.push({name: 'programs'});
          console.log(e)
        }
      },
      findProgramRequire() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let idprogram = vm.$route.params.program_id;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_PROGRAM_REQUIRE + `?idprogram=${idprogram}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              vm.all_caregories = response.data.data.result;
              vm.findProgramRequiredData()
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            vm.all_caregories = [];
            // window.helper.showMessage('danger', vm);
            // vm.$router.push({name: 'programs'});
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          vm.all_caregories = [];
          // window.helper.showMessage('danger', vm);
          // vm.$router.push({name: 'programs'});
          console.log(e)
        }
      }
    }
  }
</script>

<style scoped>

</style>
