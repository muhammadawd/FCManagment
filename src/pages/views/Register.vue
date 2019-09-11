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
          <div class="full-page-background"
               :style="'background-image:'+ `url('@/assets/img/background-2.jpg`"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import config from '@/bootstrap/config'

  export default {
    components: {},
    data() {
      return {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        permissionLevel: 1
      };
    },
    methods: {
      registerAccount() {
        let vm = this;
        axios.post(config.BASE_URL + config.REGISTER_NEW_ACCOUNT, {
          firstName: vm.firstName,
          lastName: vm.lastName,
          email: vm.email,
          password: vm.password,
          permissionLevel: vm.permissionLevel
        })
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {

            console.log(error)
          })
      }
    }
  };
</script>
<style scoped>
  .login-pt-5 {
    padding-top: 120px;
  }

  .full-page-background {
    /*background: url("@/assets/img/background-2.jpg");*/
    background: #5a5a5a;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
  }
</style>
