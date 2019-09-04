<template>
  <div>
    <card class="card-user">
      <div class="row">
        <div class="col-md-9 text-left">
          <router-link :to="{name:'add_program_grades'}" class="btn btn-wd btn-default btn-fill btn-rotate">
            <i class="ti-plus"></i>
            {{$ml.get('add_program_grades')}}
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
              <th>{{$ml.get('name')}}</th>
              <th>{{$ml.get('from_grade')}}</th>
              <th>{{$ml.get('to_grade')}}</th>
              <th>{{$ml.get('points')}}</th>
              <th width="50"></th>
              </thead>
              <tbody>
              <!--<tr v-for="(item, index) in data" :key="index">-->
              <tr>
                <td>1</td>
                <td><b>Good</b></td>
                <td><b>65</b></td>
                <td><b>75</b></td>
                <td><b>5</b></td>
                <td>
                  <div class="btn-group direction-inverse">
                    <button class="btn btn-danger">
                      <i class="ti-trash"></i>
                    </button>
                    <router-link :to="{name:'edit_program_grades',params:{'id':1}}" class="btn btn-info">
                      <i class="ti-save"></i>
                    </router-link>
                  </div>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td><b>Excellent</b></td>
                <td><b>85</b></td>
                <td><b>100</b></td>
                <td><b>20</b></td>
                <td>
                  <div class="btn-group direction-inverse">
                    <button class="btn btn-danger">
                      <i class="ti-trash"></i>
                    </button>
                    <router-link :to="{name:'edit_program_grades',params:{'id':2}}" class="btn btn-info">
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
  </div>
</template>

<script>
  import {StatsCard, ChartCard} from "@/components/index";

  export default {
    name: "Lecturer",
    components: {
      StatsCard,
    },
    data() {
      return {
        // statsCards: [],
        statsCards: [
          {
            route: "program_grades",
            type: "warning",
            icon: "ti-pulse",
            title: this.$ml.get('program_grades'),
            value: "0",
            footerText: this.$ml.get('show'),
            footerIcon: "ti-eye"
          },
          {
            route: "program_requires",
            type: "danger",
            icon: "ti-pulse",
            title: this.$ml.get('program_requires'),
            value: "0",
            footerText: this.$ml.get('show'),
            footerIcon: "ti-eye"
          },
          {
            route: "program_levels",
            type: "info",
            icon: "ti-pulse",
            title: this.$ml.get('program_levels'),
            value: "0",
            footerText: this.$ml.get('show'),
            footerIcon: "ti-eye"
          }
        ],
      }
    }
  }
</script>

<
style
scoped >

< /style>
