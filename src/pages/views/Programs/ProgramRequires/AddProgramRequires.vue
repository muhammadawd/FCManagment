<template>

  <card class="card" :title="$ml.get('add_program_requires')">
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
                    @click.native.prevent="addProgramRequire">
            {{$ml.get('add')}}
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
    name: "AddProgramRequire",
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
      addProgramRequire() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let idprogram = vm.$route.params.program_id;

        let request_data = vm.prepareData();
        request_data = window.helper.prepareObjectToSend(request_data);

        try {
          window.serviceAPI.API().post(window.serviceAPI.ADD_PROGRAM_REQUIRE + `?idprogram=${idprogram}`, request_data)
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
      findProgramRequire() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let idprogram = vm.$route.params.program_id;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_PROGRAM_REQUIRE + `?idprogram=${idprogram}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              vm.all_caregories = response.data.data.result;
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
