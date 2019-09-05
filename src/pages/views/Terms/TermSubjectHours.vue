<template>
  <card class="card-user" :title="$ml.get('term_subject_hours')">
    <div class="row">
      <div class="col-md-3">
        <fg-input type="text"
                  :label="$ml.get('gpa_from')"
                  :placeholder="$ml.get('gpa_from')">
        </fg-input>
      </div>
      <div class="col-md-3">
        <fg-input type="text"
                  :label="$ml.get('gpa_to')"
                  :placeholder="$ml.get('gpa_to')">
        </fg-input>
      </div>
      <div class="col-md-3">
        <fg-input type="text"
                  :label="$ml.get('max_hours')"
                  :placeholder="$ml.get('max_hours')">
        </fg-input>
      </div>
      <div class="col-md-3">
        <fg-input type="text"
                  :label="$ml.get('special_max_hours')"
                  :placeholder="$ml.get('special_max_hours')">
        </fg-input>
      </div>
      <div class="col-md-3">
        <fg-input type="text"
                  :label="$ml.get('min_hours')"
                  :placeholder="$ml.get('min_hours')">
        </fg-input>
      </div>
      <div class="col-md-3">
        <fg-input type="text"
                  :label="$ml.get('special_min_hours')"
                  :placeholder="$ml.get('special_min_hours')">
        </fg-input>
      </div>
      <div class="col-md-12 text-center">
        <button class="btn btn-black mt-2">{{$ml.get('add')}}</button>
      </div>
      <div class="col-md-12 text-left">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <th width="50">#</th>
            <th>{{$ml.get('gpa_from')}}</th>
            <th>{{$ml.get('gpa_to')}}</th>
            <th>{{$ml.get('max_hours')}}</th>
            <th>{{$ml.get('min_hours')}}</th>
            <th>{{$ml.get('special_max_hours')}}</th>
            <th>{{$ml.get('special_min_hours')}}</th>
            <th width="50"></th>
            </thead>
            <tbody>
            <!--<tr v-for="(item, index) in data" :key="index">-->
            <tr>
              <td>2</td>
              <td>
                <b>1 <span class="text-success">{{$ml.get('hours')}}</span></b>
              </td>
              <td>
                <b>4 <span class="text-success">{{$ml.get('hours')}}</span></b>
              </td>
              <td>
                <b>3 <span class="text-success">{{$ml.get('hours')}}</span></b>
              </td>
              <td>
                <b>12 <span class="text-success">{{$ml.get('hours')}}</span></b>
              </td>
              <td>
                <b>6 <span class="text-success">{{$ml.get('hours')}}</span></b>
              </td>
              <td>
                <b>7 <span class="text-success">{{$ml.get('hours')}}</span></b>
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
