<template>
  <div>

    <div class="row">
      <div class="col-xl-8 offset-xl-2">
        <div class="row">
          <div class="col-md-6 col-xl-4" v-for="stats in statsCards" :key="stats.title">
            <router-link :to="{name:stats.route}">
              <stats-card>
                <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
                  <i :class="stats.icon"></i>
                </div>
                <div class="numbers" slot="content">
                  <p>{{stats.title}}</p>
                  {{stats.value}}
                </div>
                <div class="stats text-center" slot="footer">
                  <i :class="stats.footerIcon"></i> {{stats.footerText}}
                </div>
              </stats-card>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <card class="card-user">
      <div class="row">
        <div class="col-md-9 text-left">
          <router-link :to="{name:'add_program'}" class="btn btn-wd btn-default btn-fill btn-rotate">
            <i class="ti-plus"></i>
            {{$ml.get('add_program')}}
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
              <th>{{$ml.get('hours_need_grade')}}</th>
              <th>{{$ml.get('min_number_grade')}}</th>
              <th>{{$ml.get('max_fail_percent')}}</th>
              <th width="50"></th>
              </thead>
              <tbody>
              <!--<tr v-for="(item, index) in data" :key="index">-->
              <tr>
                <td>1</td>
                <td><b>Computer Science DBMS Edition</b></td>
                <td><b>120</b></td>
                <td><b>15</b></td>
                <td><b>80</b></td>
                <td>
                  <div class="btn-group direction-inverse">
                    <button class="btn btn-danger">
                      <i class="ti-trash"></i>
                    </button>
                    <router-link :to="{name:'show_program',params:{'id':1}}" class="btn btn-warning">
                      <i class="ti-eye"></i>
                    </router-link>
                    <router-link :to="{name:'edit_program',params:{'id':1}}" class="btn btn-info">
                      <i class="ti-save"></i>
                    </router-link>
                  </div>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td><b>Oracle DBMS Edition</b></td>
                <td><b>110</b></td>
                <td><b>19</b></td>
                <td><b>89</b></td>
                <td>
                  <div class="btn-group direction-inverse">
                    <button class="btn btn-danger">
                      <i class="ti-trash"></i>
                    </button>
                    <router-link :to="{name:'show_program',params:{'id':1}}" class="btn btn-warning">
                      <i class="ti-eye"></i>
                    </router-link>
                    <router-link :to="{name:'edit_program',params:{'id':1}}" class="btn btn-info">
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
        statsCards: [],
        // statsCards: [
        //   {
        //     route: "program_grades",
        //     type: "warning",
        //     icon: "ti-pulse",
        //     title: this.$ml.get('program_grades'),
        //     value: "0",
        //     footerText: this.$ml.get('show'),
        //     footerIcon: "ti-eye"
        //   },
        //   {
        //     route: "program_requires",
        //     type: "danger",
        //     icon: "ti-pulse",
        //     title: this.$ml.get('program_requires'),
        //     value: "0",
        //     footerText: this.$ml.get('show'),
        //     footerIcon: "ti-eye"
        //   },
        //   {
        //     route: "program_levels",
        //     type: "info",
        //     icon: "ti-pulse",
        //     title: this.$ml.get('program_levels'),
        //     value: "0",
        //     footerText: this.$ml.get('show'),
        //     footerIcon: "ti-eye"
        //   }
        // ],
      }
    }
  }
</script>

<
style
scoped >

< /style>
