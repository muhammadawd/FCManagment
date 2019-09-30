<template>

  <card class="card" :title="$ml.get('add_sec_section')">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="name"
                      :label="$ml.get('name')"
                      :placeholder="$ml.get('name')">
            </fg-input>
            <div class="text-left text-danger" id="name_error"></div>
          </div>
          <div class="col-md-8">
            <fg-input type="text"
                      v-model="note"
                      :label="$ml.get('note')"
                      :placeholder="$ml.get('note')">
            </fg-input>
            <div class="text-left text-danger" id="note_error"></div>
          </div>
        </div>

        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="addSecDept">
            {{$ml.get('add')}}
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>

<script>
  export default {
    name: "AddSecDept",
    data() {
      return {
        name: null,
        note: null
      }
    },
    methods: {
      prepareData() {
        let vm = this;
        return {
          name: vm.name,
          note: vm.note,
        };
      },
      prepareValidationInputs() {
        return {
          note: 'input',
          name: 'input',
        };
      },
      addSecDept() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let request_data = vm.prepareData();
        request_data = window.helper.prepareObjectToSend(request_data);

        try {
          window.serviceAPI.API().post(window.serviceAPI.ADD_SEC_DEPTS, request_data)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.showMessage('success', vm);
              vm.$router.push({name: 'sec_section'});
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
