<template>

  <card class="card" :title="$ml.get('add_lecturer')">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-3">

            <fg-input type="text"
                      :label="$ml.get('id')"
                      :placeholder="$ml.get('id')">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
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
    methods:{
      addLecturer() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let request_data = {
          email: vm.email,
          password: vm.password,
        };
        request_data = window.helper.prepareObjectToSend(request_data);

        try {
          window.serviceAPI.API().post(window.serviceAPI.AUTH_ACCOUNT, request_data)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                alert('login success');
                return 0;
              }
              vm.$notify({
                icon: "ti-info",
                title: `Server Error Code : ${response.code}`,
                message: `${response.message}`,
                type: 'danger'
              });

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;

            vm.$notify({
              icon: "ti-info",
              title: `Server Error Code : ${error.response.status}`,
              message: `${error.response.data.message}`,
              type: 'danger'
            });

            console.log(error.response.data, error.response.status, error.response.headers);
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
