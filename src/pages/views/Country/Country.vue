<template>
  <card class="card-user">
    <div class="row">
      <div class="col-md-9 text-left">
        <router-link :to="{name:'add_country'}" class="btn btn-wd btn-default btn-fill btn-rotate">
          <i class="ti-plus"></i>
          {{$ml.get('add_country')}}
        </router-link>
        &nbsp;
        <router-link :to="{name:'add_government'}" class="btn btn-wd btn-default btn-fill btn-rotate">
          <i class="ti-plus"></i>
          {{$ml.get('add_government')}}
        </router-link>
      </div>
      <div class="col-md-3 text-right">
        <fg-input type="text"
                  :placeholder="$ml.get('search')">
        </fg-input>
      </div>
      <div class="col-md-12 text-left">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <th width="50">#</th>
            <th width="200">{{$ml.get('country')}}</th>
            <th>{{$ml.get('government')}}</th>
            <th width="50"></th>
            </thead>
            <tbody>
            <!--<tr v-for="(item, index) in data" :key="index">-->
            <tr>
              <td>1</td>
              <td><b>Egypt</b></td>
              <td><b>-</b></td>
              <td>
                <div class="btn-group direction-inverse">
                  <button class="btn btn-danger">
                    <i class="ti-trash"></i>
                  </button>
                  <router-link :to="{name:'edit_country',params:{'id':1}}" class="btn btn-info">
                    <i class="ti-save"></i>
                  </router-link>
                </div>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td><b>Egypt</b></td>
              <td><b>Alexandria</b></td>
              <td>
                <div class="btn-group direction-inverse">
                  <button class="btn btn-danger">
                    <i class="ti-trash"></i>
                  </button>
                  <router-link :to="{name:'edit_government',params:{'id':1}}" class="btn btn-info">
                    <i class="ti-save"></i>
                  </router-link>
                </div>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td><b>Egypt</b></td>
              <td><b>Al-Gharbia</b></td>
              <td>
                <div class="btn-group direction-inverse">
                  <button class="btn btn-danger">
                    <i class="ti-trash"></i>
                  </button>
                  <router-link :to="{name:'edit_government',params:{'id':1}}" class="btn btn-info">
                    <i class="ti-save"></i>
                  </router-link>
                </div>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td><b>Egypt</b></td>
              <td><b>Cairo</b></td>
              <td>
                <div class="btn-group direction-inverse">
                  <button class="btn btn-danger">
                    <i class="ti-trash"></i>
                  </button>
                  <router-link :to="{name:'edit_government',params:{'id':1}}" class="btn btn-info">
                    <i class="ti-save"></i>
                  </router-link>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </card>
</template>

<script>
  export default {
    name: "Lecturer",
    data() {
      return {}
    }
  }
</script>

<
style
scoped >

< /style>
