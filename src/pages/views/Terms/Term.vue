<template>
  <card class="card-user">
    <div class="row">
      <div class="col-md-9 text-left">
        <router-link :to="{name:'add_term'}" class="btn btn-wd btn-default btn-fill btn-rotate">
          <i class="ti-plus"></i>
          {{$ml.get('add_term')}}
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
            <th>{{$ml.get('term_start')}}</th>
            <th>{{$ml.get('term_end')}}</th>
            <th></th>
            <th width="50"></th>
            </thead>
            <tbody>
            <!--<tr v-for="(item, index) in data" :key="index">-->
            <tr>
              <td>1</td>
              <td>
                <b>Term <span class="text-success">#1</span> 2019 - 2020</b>
              </td>
              <td>
                <b> 2019 - 2020</b>
              </td>
              <td>
                <b> 2019 - 2020</b>
              </td>
              <td>
                <router-link :to="{name:'term_subject_hours',params:{term_id:1,program_id:1}}"
                             class="btn btn-outline-info">
                  {{$ml.get('hours')}}
                </router-link>
                &nbsp;
                <router-link :to="{name:'term_subjects',params:{term_id:1,program_id:1}}"
                             class="btn btn-outline-primary">
                  {{$ml.get('subjects')}}
                </router-link>
              </td>
              <td>
                <div class="btn-group direction-inverse">
                  <button class="btn btn-secondary" @click="showModal()">
                    <i class="ti-eye"></i>
                  </button>
                  <button class="btn btn-danger">
                    <i class="ti-trash"></i>
                  </button>
                  <router-link :to="{name:'edit_term',params:{'id':1}}" class="btn btn-info">
                    <i class="ti-save"></i>
                  </router-link>
                </div>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <b>Term <span class="text-success">#2</span> 2020 - 2020</b>
              </td>
              <td>
                <b> 2020 - 2020</b>
              </td>
              <td>
                <b> 2020 - 2020</b>
              </td>
              <td>
                <router-link :to="{name:'term_subject_hours',params:{term_id:1,program_id:1}}"
                             class="btn btn-outline-info">
                  {{$ml.get('hours')}}
                </router-link>
                &nbsp;
                <router-link :to="{name:'term_subjects',params:{term_id:1,program_id:1}}"
                             class="btn btn-outline-primary">
                  {{$ml.get('subjects')}}
                </router-link>
              </td>
              <td>
                <div class="btn-group direction-inverse">
                  <button class="btn btn-secondary" @click="showModal()">
                    <i class="ti-eye"></i>
                  </button>
                  <button class="btn btn-danger">
                    <i class="ti-trash"></i>
                  </button>
                  <router-link :to="{name:'edit_term',params:{'id':2}}" class="btn btn-info">
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
    <sweet-modal :ref="'termModal'" overlay-theme="dark">
      <table class="table table-bordered direction">
        <tbody class="font-weight-bold direction-inverse text-left">
        <tr>
          <td>{{$ml.get('name')}}</td>
          <td>-</td>
        </tr>
        <tr>
          <td>{{$ml.get('term_start')}}</td>
          <td>-</td>
        </tr>
        <tr>
          <td>{{$ml.get('term_end')}}</td>
          <td>-</td>
        </tr>
        <tr>
          <td>{{$ml.get('term_start_register')}}</td>
          <td>-</td>
        </tr>
        <tr>
          <td>{{$ml.get('term_end_register')}}</td>
          <td>-</td>
        </tr>
        <tr>
          <td>{{$ml.get('term_start_editing')}}</td>
          <td>-</td>
        </tr>
        <tr>
          <td>{{$ml.get('term_end_editing')}}</td>
          <td>-</td>
        </tr>
        <tr>
          <td>{{$ml.get('term_start_ending')}}</td>
          <td>-</td>
        </tr>
        <tr>
          <td>{{$ml.get('term_end_editing')}}</td>
          <td>-</td>
        </tr>
        <tr>
          <td>{{$ml.get('term_type')}}</td>
          <td>-</td>
        </tr>
        </tbody>
      </table>
    </sweet-modal>
  </card>
</template>

<script>
  import {SweetModal, SweetModalTab} from 'sweet-modal-vue'

  export default {
    name: "Lecturer",
    data() {
      return {}
    },
    components: {
      SweetModal,
      SweetModalTab
    },
    methods: {
      showModal() {
        let vm = this;
        vm.$refs.termModal.open();
      },
    }
  }
</script>

<
style
scoped >

< /style>
