<template>
  <div class="text-center">
    <div class="login-page">
      <div class="wrapper wrapper-full-page">
        <div class="full-page login-page section-image">
          <div class="content login-pt-5">
            <div class="container">
              <div class="col-lg-4 col-md-6 ml-auto mr-auto">
                <form @submit.prevent>
                  <div class="card card-login">
                    <div class="card-header"><h3 class="header text-center font-weight-bold">
                      {{$ml.get('register')}}</h3></div>
                    <div class="card-body">

                      <div class="form-group input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="ti-user"></i>
                          </span>
                        </div>
                        <input aria-describedby="addon-right addon-left" placeholder="First Name..." v-model="firstName"
                               class="form-control">
                      </div>
                      <div class="form-group input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="ti-user"></i>
                          </span>
                        </div>
                        <input aria-describedby="addon-right addon-left" placeholder="Last Name..." v-model="lastName"
                               class="form-control">
                      </div>
                      <div class="form-group input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="ti-email"></i>
                          </span>
                        </div>
                        <input aria-describedby="addon-right addon-left" placeholder="Email ..." v-model="email"
                               class="form-control">
                      </div>

                      <div class="form-group input-group">
                        <div class="input-group-prepend"><span
                          class="input-group-text"><i
                          class="ti-lock"></i></span></div>
                        <input aria-describedby="addon-right addon-left" placeholder="Password" v-model="password"
                               type="password" class="form-control"></div>
                      <br>
                    </div><!---->
                    <div class="card-footer">
                      <p-button type="submit" class="btn mb-3 btn-round btn-block btn-warning"
                                @click.native.prevent="registerAccount()">
                        {{$ml.get('get_started')}}
                      </p-button>
                    </div>
                    <router-link class="font-weight-bold" :to="{name:'login'}">{{$ml.get('have_account')}}</router-link>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="full-page-background-overlay"></div>
          <div class="full-page-background"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    components: {},
    computed: {
      ...mapState({
        userModule: state => state.userModule,
      })
    },
    data() {
      return {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        permissionLevel: 1,
        response: null
      };
    },
    methods: {
      registerAccount() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let request_data = {
          firstName: vm.firstName,
          lastName: vm.lastName,
          email: vm.email,
          password: vm.password,
          permissionLevel: vm.permissionLevel
        };
        request_data = window.helper.prepareObjectToSend(request_data);

        try {
          window.serviceAPI.API().post(window.serviceAPI.REGISTER_NEW_ACCOUNT, request_data)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.$router.push({name: 'login'});
                alert('Register Success');
                return 0;
              }
              alert('Validation Error');
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            // console.log(error.response.data, error.response.status, error.response.headers);
          });
        } catch (e) {
          console.log(e)
        }
        // vm.$store.dispatch('registerAuthUser', request_data, {root: true});
      },
      validationMessages(errors) {
        console.log(errors)
      }
    },
    mounted() {
      let vm = this;
      // vm.$store.watch(
      //   (stat) => state.userModule.response_data,
      //   (newValue, oldValue) => {
      //     console.log(oldValue);
      //     console.log(newValue);
      //   }
      // )
    }
  };
</script>
<style scoped>
  .login-pt-5 {
    /*padding-top: 120px;*/
    z-index: 99;
    position: relative;
  }

  .full-page-background {
    /*background: url("@/assets/img/background-2.jpg");*/
    background: #5a5a5a url("https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center center no-repeat;
    background-size: cover;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
  }

  .full-page-background-overlay {
    background: #000;
    opacity: 0.5;
    position: absolute;
    z-index: 9;
    top: 0;
    width: 100%;
    height: 100%;
  }
</style>
