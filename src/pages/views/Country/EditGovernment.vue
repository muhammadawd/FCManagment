<template>

  <card class="card" :title="$ml.get('edit_government')">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-3 text-left">
            <label>{{$ml.get('country')}}</label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedCountry" label="name"
                          track-by="name"
                          :options="countries" open-direction="bottom" :multiple="false" :searchable="true"
                          :loading="isLoading" :internal-search="true" :clear-on-select="false"
                          :close-on-select="true"></multi-select>
            <div class="text-danger text-left" id="idcountries_error"></div>
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
        </div>

        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="updateGovernment">
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
    name: "AddGovernment",
    components: {
      multiSelect
    },
    data() {
      return {
        isLoading: false,
        selectedCountry: null,
        name: null,
        name_en: null,
        countries: [],
      }
    },
    mounted() {
      this.findGovernment();
    },
    methods: {
      limitText(count) {
        return `and ${count} other countries`
      },
      getAllCountries(findCountryID) {
        let vm = this;
        // vm.$root.$children[0].$refs.loader.show_loader = true;
        vm.isLoading = true
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_COUNTRIES)
            .then((response) => {
              // vm.$root.$children[0].$refs.loader.show_loader = false;
              vm.isLoading = false
              response = response.data;
              if (response.status) {
                vm.countries = response.data.result;

                $.each(vm.countries, function (index, country) {
                  if (country.idcountries == findCountryID) {
                    vm.selectedCountry = country;
                    return;
                  }
                });

                return null;
              }
              vm.countries = [];

            }).catch((error) => {
            // vm.$root.$children[0].$refs.loader.show_loader = false;
            vm.isLoading = false;
            window.helper.handleError(error, vm);
            vm.countries = [];
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
          idcountries: vm.selectedCountry ? vm.selectedCountry.idcountries : null,
        };
      },
      prepareValidationInputs() {
        return {
          name: 'input',
          name_en: 'input',
          idcountries: 'input',
        };
      },
      updateGovernment() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let id = vm.$route.params.id;
        let _request_data = vm.prepareData();
        let request_data = window.helper.prepareObjectToSend(_request_data);
        console.log(request_data)
        try {
          window.serviceAPI.API().put(window.serviceAPI.UPDATE_GOVERNRATES + `/${id}`, request_data)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.showMessage('success', vm);
              vm.$router.push({name: 'country'});
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          console.log(e)
        }
      },
      findGovernment() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let id = vm.$route.params.id;
        try {
          window.serviceAPI.API().get(window.serviceAPI.FIND_GOVERNRATES + `/${id}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data.data.result;
              vm.name = response[0].name;
              vm.name_en = response[0].name_en;
              vm.getAllCountries(response[0].idcountries);
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.showMessage('danger', vm);
            vm.$router.push({name: 'country'});
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          window.helper.showMessage('danger', vm);
          vm.$router.push({name: 'country'});
          console.log(e)
        }
      },
      clearAll() {
        this.selectedCountry = null
      },
    }
  }
</script>


<style scoped>

</style>
