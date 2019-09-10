<template>
  <card class="card-user" :title="$ml.get('course_requirement')">
    <div class="row">
      <div class="col-md-4 text-left">
        <label>{{$ml.get('name')}}</label>
        <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedUnder"
                      :options="[]"></multi-select>
        <button class="btn btn-black mt-2">{{$ml.get('add')}}</button>
      </div>
      <div class="col-md-12 text-left">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <th width="50">#</th>
            <th>{{$ml.get('name')}}</th>
            <th width="50"></th>
            </thead>
            <tbody>
            <!--<tr v-for="(item, index) in data" :key="index">-->
            <tr>
              <td>1</td>
              <td>
                <b>Math 1</b>
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
              <td>1</td>
              <td>
                <b>JAVA SE</b>
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
  import multiSelect from 'vue-multiselect'
  import 'vue-multiselect/dist/vue-multiselect.min.css';
  export default {
    name: "AddLecturer",
    components: {
      multiSelect
    },
    data() {
      return {selectedUnder: null}
    }
  }
</script>

<
style
scoped >

< /style>
