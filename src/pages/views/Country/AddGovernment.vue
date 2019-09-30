<template>

  <card class="card" :title="$ml.get('add_government')">
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
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="name"
                      :label="$ml.get('name')"
                      :placeholder="$ml.get('name')">
            </fg-input>
            <div class="text-danger text-left" id="name_error"></div>
          </div>
        </div>

        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="addGovernment">
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
    name: "AddGovernment",
    components: {
      multiSelect
    },
    data() {
      return {
        isLoading: false,
        selectedCountry: null,
        name: null,
        countries: [],
      }
    },
    mounted() {
      this.getAllCountries();
    },
    methods: {
      limitText(count) {
        return `and ${count} other countries`
      },
      getAllCountries() {
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
          idcountries: vm.selectedCountry ? vm.selectedCountry.idcountries : null,
        };
      },
      prepareValidationInputs() {
        return {
          name: 'input',
        };
      },
      addGovernment() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let _request_data = vm.prepareData();
        let request_data = window.helper.prepareObjectToSend(_request_data);
        console.log(request_data)
        try {
          window.serviceAPI.API().post(window.serviceAPI.ADD_GOVERNRATES + `?idcountries=${_request_data.idcountries}`, request_data)
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
      clearAll() {
        this.selectedCountry = null
      },
    }
  }
</script>


<style scoped>

</style>
