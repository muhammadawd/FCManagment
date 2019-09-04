<template>
  <div>
    <card class="card-user">
      <div class="row">
        <div class="col-md-9 text-left">
          <router-link :to="{name:'add_program_levels'}" class="btn btn-wd btn-default btn-fill btn-rotate">
            <i class="ti-plus"></i>
            {{$ml.get('add_program_levels')}}
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
              <th>{{$ml.get('min_hour_level')}}</th>
              <th width="50"></th>
              </thead>
              <tbody>
              <!--<tr v-for="(item, index) in data" :key="index">-->
              <tr>
                <td>1</td>
                <td><b>Level One</b></td>
                <td><b>120</b></td>
                <td>
                  <div class="btn-group direction-inverse">
                    <button class="btn btn-danger">
                      <i class="ti-trash"></i>
                    </button>
                    <router-link :to="{name:'edit_program_levels',params:{'id':1}}" class="btn btn-info">
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
