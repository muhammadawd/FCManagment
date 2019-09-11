<template>
  <div class="text-center">
    <div class="login-page">
      <div class="wrapper wrapper-full-page">
        <div class="full-page login-page section-image">
          <div class="content login-pt-5">
            <div class="container">
              <div class="col-lg-4 col-md-6 ml-auto mr-auto">
                <form>
                  <div class="card card-login">
                    <div class="card-header"><h3 class="header text-center font-weight-bold">{{$ml.get('login')}}</h3>
                    </div>
                    <div class="card-body">
                      <div class="form-group input-group"><!---->
                        <div class="input-group-prepend"><span
                          class="input-group-text"><i
                          class="ti-user"></i></span></div>
                        <input aria-describedby="addon-right addon-left" placeholder="User Name..."
                               class="form-control"></div>
                      <div class="form-group input-group"><!---->
                        <div class="input-group-prepend"><span
                          class="input-group-text"><i
                          class="ti-lock"></i></span></div>
                        <input aria-describedby="addon-right addon-left" placeholder="Password"
                               type="password" class="form-control"></div>
                      <br>
                    </div><!---->
                    <div class="card-footer">
                      <button type="submit" class="btn mb-3 btn-round btn-block btn-warning">
                        {{$ml.get('get_started')}}
                      </button>
                    </div>
                    <router-link class="font-weight-bold" :to="{name:'register'}">{{$ml.get('register_new')}}
                    </router-link>
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
  export default {
    components: {},
    data() {
      return {};
    }
  };
</script>
<style scoped>
  .login-pt-5 {
    padding-top: 200px;
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
