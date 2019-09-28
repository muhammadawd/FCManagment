<template>

  <card class="card" :title="$ml.get('edit_lecturer')">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-3">

            <fg-input type="text"
                      v-model="nationalNum"
                      :label="$ml.get('id')"
                      :placeholder="$ml.get('id')">
            </fg-input>
            <div class="text-left text-danger" id="nationalNum_error"></div>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="name"
                      :label="$ml.get('name')"
                      :placeholder="$ml.get('name')">
            </fg-input>
            <div class="text-left text-danger" id="name_error"></div>
          </div>
        </div>

        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="editLecturer">
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
    name: "EditLecturer",
    data() {
      return {
        nationalNum: null,
        name: null,
        type: 0
      }
    },
    mounted() {
      let vm = this;
      vm.findLecturer();
    },
    methods: {
      findLecturer() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let id = vm.$route.params.id;
        try {
          window.serviceAPI.API().get(window.serviceAPI.FIND_STUFF_MEMBER + `/${id}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data.data.result;
              vm.name = response[0].name;
              vm.nationalNum = response[0].nationalNum;
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.showMessage('danger', vm);
            vm.$router.push({name: 'lecturer'});
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          window.helper.showMessage('danger', vm);
          vm.$router.push({name: 'lecturer'});
          console.log(e)
        }
      },
      prepareData() {
        let vm = this;
        return {
          nationalNum: vm.nationalNum,
          name: vm.name,
          type: vm.type,
        };
      },
      prepareValidationInputs() {
        return {
          nationalNum: 'input',
          name: 'input',
        };
      },
      editLecturer() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let id = vm.$route.params.id;
        let request_data = vm.prepareData();
        request_data = window.helper.prepareObjectToSend(request_data);

        try {
          window.serviceAPI.API().put(window.serviceAPI.UPDATE_STUFF_MEMBER + `/${id}`, request_data)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.showMessage('success', vm);
              vm.$router.push({name: 'lecturer'});
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
