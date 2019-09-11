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
        <button class="btn btn-secondary" @click="showModal()">{{$ml.get('add')}}</button>
      </div>
    </div>
    <sweet-modal :ref="'invoiceModal'" hide-close-button blocking overlay-theme="dark">

      <div id="printMe">
        <h4 class="text-left direction">
          <span class="text-black">{{$ml.get('student_name')}}: </span>
          <span class="text-secondary">Ahmed Mohamed Ali</span>
        </h4>
        <table class="table table-full-width table-bordered direction">
          <thead>
          <tr>
            <th class="text-left font-weight-bold text-black">{{$ml.get('course_name')}}</th>
            <th class="text-left font-weight-bold text-black">{{$ml.get('price')}}</th>
          </tr>
          </thead>
          <tbody class="text-left text-black font-weight-bold">
          <tr>
            <td>Software Engineering</td>
            <td>1200.00 ج م</td>
          </tr>
          <tr>
            <td>Introduction To Computer Science</td>
            <td>1600.00 ج م</td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <td class="text-black font-weight-bold text-left">{{$ml.get('sub_total')}}</td>
            <td class="text-black font-weight-bold text-left">2800.00 ج م</td>
          </tr>
          <tr>
            <td class="text-black font-weight-bold text-left">{{$ml.get('discount')}}</td>
            <td class="text-danger font-weight-bold text-left">(0.00) ج م</td>
          </tr>
          <tr>
            <td class="text-black font-weight-bold text-left">{{$ml.get('total')}}</td>
            <td class="text-info font-weight-bold text-left">2800.00 ج م</td>
          </tr>
          </tfoot>
        </table>
      </div>

      <template slot="box-action">
        <button class="btn btn-primary" @click="closeModal('invoiceModal')">
          <i class="ti-printer"></i>
        </button>
      </template>
    </sweet-modal>
  </card>
</template>

<script>
  import multiSelect from 'vue-multiselect'
  import 'vue-multiselect/dist/vue-multiselect.min.css';
  import {SweetModal, SweetModalTab, Sweet} from 'sweet-modal-vue'

  export default {
    components: {
      multiSelect,
      SweetModal,
      SweetModalTab
    },
    name: "Lecturer",
    data() {
      return {selectedStudent: null}
    },
    methods: {
      showModal() {
        let vm = this;
        vm.$refs.invoiceModal.open();
      },
      closeModal(modal) {
        let vm = this;
        vm.$htmlToPaper('printMe');
        vm.$refs[modal].close();
      }
    }
  }
</script>

<style scoped>
</style>
