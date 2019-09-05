<template>
  <div class="text-center">
    <div class="login-page">
      <div class="wrapper wrapper-full-page">
        <div class="full-page login-page section-image">
          <div class="content pt-5">
            <div class="container">
              <div class="col-lg-4 col-md-6 ml-auto mr-auto">
                <form>
                  <div class="card card-login">
                    <div class="card-header"><h3 class="header text-center">Login</h3></div>
                    <div class="card-body">
                      <div class="form-group input-group"><!---->
                        <div class="input-group-prepend"><span
                          class="input-group-text"><i
                          class="ti-user"></i></span></div>
                        <input aria-describedby="addon-right addon-left" placeholder="First Name..."
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
                      <button type="submit" class="btn mb-3 btn-round btn-block btn-warning"><!---->Get started
                        <!----></button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="full-page-background"
               :style="'background-image:'+ `url('@/assets/img/background-2.jpg)`"></div>
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
<style>
</style>
