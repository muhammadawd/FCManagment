<template>
  <card class="card-user">
    <div class="row">
      <div class="col-md-9 text-left">
        <router-link :to="{name:'add_excuses'}" class="btn btn-wd btn-default btn-fill btn-rotate">
          <i class="ti-plus"></i>
          {{$ml.get('add_excuses')}}
        </router-link>
      </div>
      <div class="col-md-3 text-right">
        <fg-input type="text"
                  :placeholder="$ml.get('search')">
        </fg-input>
        <flat-pickr
          v-model="date"
          :config="config"
          class="form-control mt-3"
          placeholder="Select date"
          name="date">
        </flat-pickr>
        <select class="form-control mt-3">
          <option value="accepted">{{$ml.get('status_accepted')}}</option>
          <option value="rejected">{{$ml.get('status_rejected')}}</option>
        </select>
        <div class="text-left mt-2">
          <button class="btn btn-secondary">
            <i class="ti-search"></i>
            {{$ml.get('filter')}}
          </button>
        </div>
      </div>
      <div class="col-md-12 text-left">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <th width="50">#</th>
            <th>{{$ml.get('student_name')}}</th>
            <th>{{$ml.get('course_name')}}</th>
            <th>{{$ml.get('date')}}</th>
            <th>{{$ml.get('status')}}</th>
            <th width="50"></th>
            </thead>
            <tbody>
            <!--<tr v-for="(item, index) in data" :key="index">-->
            <tr>
              <td>1</td>
              <td>
                <b> Islam Samir Osama Ahmedi</b>
              </td>
              <td><b>JAVA SE</b></td>
              <td><b>2019-08-12</b></td>
              <td><b class="badge badge-danger badge-pill p-2">غير مكتمل</b></td>
              <td>
                <div class="btn-group direction-inverse">
                  <button class="btn btn-danger">
                    <i class="ti-trash"></i>
                  </button>
                  <router-link :to="{name:'edit_excuses',params:{'id':1}}" class="btn btn-info">
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
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  import {Arabic} from 'flatpickr/dist/l10n/ar.js';

  export default {
    name: "Lecturer",
    data() {
      return {
        // Initial value
        date: new Date(),
        // Get more form https://chmln.github.io/flatpickr/options/
        config: {
          dateFormat: "Y-m-d",
          mode: 'range',
          maxDate: "today",
          locale: Arabic, // locale for this instance only
        },
      }
    },
    components: {
      flatPickr
    },
  }
</script>

<
style
scoped >

< /style>
