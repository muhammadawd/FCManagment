<template>
  <card class="card-user">
    <div class="row">
      <div class="col-md-9 text-left">
        <div class="row">

          <div class="col-md-12 mb-2 text-left">
            <router-link :to="{name:'add_student_subject'}" class="btn btn-wd btn-default btn-fill btn-rotate">
              <i class="ti-plus"></i>
              {{$ml.get('add_student_subject')}}
            </router-link>
            &nbsp;
            <router-link :to="{name:'confirm_payment_student_subject'}" class="btn btn-wd btn-default btn-fill btn-rotate">
              <i class="ti-money"></i>
              {{$ml.get('confirm_payment_student_subject')}}
            </router-link>
          </div>
          <div class="col-md-6 text-left">
            <label> {{$ml.get('student_name')}} </label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedStudent"
                          :options="[]"></multi-select>
          </div>
          <div class="col-md-6 text-left">
            <label> {{$ml.get('term')}} </label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedTerm"
                          :options="[]"></multi-select>
          </div>
        </div>

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
            <th>{{$ml.get('paid')}}</th>
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
                <div class="text-danger"><i class="ti-close"></i></div>
              </td>
              <td>

                <div class="btn-group direction-inverse">
                  <button class="btn btn-danger">
                    <i class="ti-trash"></i>
                  </button>
                  <button class="btn btn-warning">
                    {{$ml.get('get_back')}}
                  </button>
                  <router-link :to="{name:'edit_student_subject',params:{'id':1}}" class="btn btn-info">
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
  import multiSelect from 'vue-multiselect'
  import 'vue-multiselect/dist/vue-multiselect.min.css';

  export default {
    components: {
      multiSelect
    },
    name: "Lecturer",
    data() {
      return {selectedStudent: null, selectedTerm: null}
    }
  }
</script>

<
style
scoped >

< /style>
