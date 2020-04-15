<template>

  <card class="card" :title="$ml.get('edit_country')">
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
                    @click.native.prevent="editCountry">
            {{$ml.get('edit')}}
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>

<script>
  export default {
    name: "EditCountry",
    data() {
      return {
        name: null,
        name_en: null,
      }
    },
    mounted() {
      this.findCountry();
    },
    methods: {
      prepareData() {
        let vm = this;
        return {
          name: vm.name,
          name_en: vm.name_en,
        };
      },
      prepareValidationInputs() {
        return {
          name: 'input',
          name_en: 'input',
        };
      },
      findCountry() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let id = vm.$route.params.id;
        try {
          window.serviceAPI.API().get(window.serviceAPI.FIND_COUNTRIES+ `/${id}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data.data.result;
              vm.name = response[0].name;
              vm.name_en = response[0].name_en;
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.showMessage('danger', vm);
            vm.$router.push({name: 'countries'});
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          window.helper.showMessage('danger', vm);
          vm.$router.push({name: 'lecturer'});
          console.log(e)
        }
      },
      editCountry() {
        let vm = this;
        let id = vm.$route.params.id;

        vm.$root.$children[0].$refs.loader.show_loader = true;

        let request_data = vm.prepareData();
        request_data = window.helper.prepareObjectToSend(request_data);
        try {
          window.serviceAPI.API().put(window.serviceAPI.UPDATE_COUNTRIES + `/${id}`, request_data)
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
      }
    }
  }
</script>

<style scoped>

</style>
