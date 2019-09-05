<template>
  <card class="card-user" :title="$ml.get('term_subjects')">
    <div class="row">
      <div class="col-md-4 text-left">
        <label>{{$ml.get('name')}}</label>
        <select class="form-control">
          <option value="">-- choose --</option>
        </select>
        <button class="btn btn-black mt-2">{{$ml.get('add')}}</button>
      </div>
      <div class="col-md-12 text-left">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <th width="50">#</th>
            <th>{{$ml.get('name')}}</th>
            <th>{{$ml.get('code')}}</th>
            <th>{{$ml.get('admins')}}</th>
            <th width="50"></th>
            </thead>
            <tbody>
            <!--<tr v-for="(item, index) in data" :key="index">-->
            <tr>
              <td>1</td>
              <td>
                <b>Java EE </b>
              </td>
              <td>
                <b>Java <span class="text-success">J416</span></b>
              </td>
              <td>
                <router-link :to="{name:'term_subject_admin',params:{subject_id:1,program_id:1}}"
                             class="btn btn-outline-primary">
                  {{$ml.get('admins')}}
                </router-link>
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
