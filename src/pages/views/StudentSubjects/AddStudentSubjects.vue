<template>
  <card class="card-user">
    <div class="row">
      <div class="col-md-9 text-left">
        <div class="row">

          <div class="col-md-6 text-left">
            <label> {{$ml.get('student_name')}} </label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedStudent"
                          :options="[]"></multi-select>
          </div>
        </div>

        <!--<router-link :to="{name:'add_lecturer'}" class="btn btn-wd btn-default btn-fill btn-rotate">-->
        <!--<i class="ti-plus"></i>-->
        <!--{{$ml.get('add_lecturer')}}-->
        <!--</router-link>-->
      </div>
      <div class="col-md-3 text-right">
        <!--<fg-input type="text"-->
        <!--:placeholder="$ml.get('search')">-->
        <!--</fg-input>-->
      </div>

      <div class="col-md-12 text-left">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <th width="50">#</th>
            <th>{{$ml.get('course_name')}}</th>
            <th>{{$ml.get('lecturer_name')}}</th>
            <th>{{$ml.get('notes')}}</th>
            <th>{{$ml.get('hour_price')}}</th>
            <th width="50"></th>
            </thead>
            <tbody>
            <!--<tr v-for="(item, index) in data" :key="index">-->
            <tr>
              <td>1</td>
              <td><b>Software Engineering</b></td>
              <td>
                <b>Dr. Islam Samir Osama Ahmedi</b>
              </td>
              <td>
                <b>-</b>
              </td>
              <td>
                <b>120.00 ج م</b>
              </td>
              <td>
                <input type="checkbox" class="form-control">
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td><b>Introduction To Computer Science</b></td>
              <td>
                <b>Dr. Hamdi Mousa</b>
              </td>
              <td>
                <b>-</b>
              </td>
              <td>
                <b>80.00 ج م</b>
              </td>
              <td>
                <input type="checkbox" class="form-control">
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td><b>Data Mining</b></td>
              <td>
                <b>Dr. Osama Emara</b>
              </td>
              <td>
                <b>-</b>
              </td>
              <td>
                <b>130.00 ج م</b>
              </td>
              <td>
                <input type="checkbox" class="form-control">
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="col-md-8">
        <div class="alert alert-warning text-left">
          <span>
              <b> {{$ml.get('note')}} </b> {{$ml.get('note_hint')}}</span>
        </div>
      </div>
      <div class="col-md-12 text-center">
        <button class="btn btn-secondary">{{$ml.get('add')}}</button>
      </div>
    </div>
  </card>
</template>

<script>
  import multiSelect from 'vue-multiselect'
  import 'vue-multiselect/dist/vue-multiselect.min.css';

  export default {
    components: {
      multiSelect
    },
    name: "Lecturer",
    data() {
      return {selectedStudent: null}
    }
  }
</script>

<
style
scoped >

< /style>
