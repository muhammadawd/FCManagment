<template>
  <card class="card-user" :title="$ml.get('admins')">
    <div class="row">
      <div class="col-md-4 text-left">
        <label>{{$ml.get('name')}}</label>
        <select class="form-control">
          <option value="">-- choose --</option>
        </select>
        <label class="mt-2">{{$ml.get('is_admin')}}</label>
        <select class="form-control">
          <option value="">{{$ml.get('yes')}}</option>
          <option value="">{{$ml.get('no')}}</option>
        </select>
        <button class="btn btn-black mt-2">{{$ml.get('add')}}</button>
      </div>
      <div class="col-md-12 text-left">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <th width="50">#</th>
            <th>{{$ml.get('name')}}</th>
            <th>{{$ml.get('is_admin')}}</th>
            <th width="50"></th>
            </thead>
            <tbody>
            <!--<tr v-for="(item, index) in data" :key="index">-->
            <tr>
              <td>1</td>
              <td>
                <b>Mohamed Awd</b>
              </td>
              <td>
                <b><span class="text-danger">{{$ml.get('no')}}</span></b>
              </td>
              <td>
                <div class="btn-group direction-inverse">
                  <button class="btn btn-danger">
                    <i class="ti-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <b>Mohamed Moustafa</b>
              </td>
              <td>
                <b><span class="text-black">{{$ml.get('yes')}}</span></b>
              </td>
              <td>
                <div class="btn-group direction-inverse">
                  <button class="btn btn-danger">
                    <i class="ti-trash"></i>
                  </button>
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
