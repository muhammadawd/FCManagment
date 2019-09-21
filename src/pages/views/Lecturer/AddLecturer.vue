<template>

  <card class="card" :title="$ml.get('add_lecturer')">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-3">

            <fg-input type="text"
                      v-model="nationalNum"
                      :label="$ml.get('id')"
                      :placeholder="$ml.get('id')">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="name"
                      :label="$ml.get('name')"
                      :placeholder="$ml.get('name')">
            </fg-input>
          </div>
        </div>

        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="addLecturer">
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
    name: "AddLecturer",
    data() {
      return {
        nationalNum: null,
        name: null,
        type: 0
      }
    },
    methods: {
      addLecturer() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let request_data = {
          nationalNum: vm.nationalNum,
          name: vm.name,
          type: vm.type,
        };
        request_data = window.helper.prepareObjectToSend(request_data);

        try {
          window.serviceAPI.API().post(window.serviceAPI.ADD_STUFF_MEMBER, request_data)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                alert('login success');
                return 0;
              }
              alert('validation Error')
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
