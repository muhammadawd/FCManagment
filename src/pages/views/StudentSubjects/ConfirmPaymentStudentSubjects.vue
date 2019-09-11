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
            <th>{{$ml.get('price')}}</th>
            <th width="50"></th>
            </thead>
            <tbody>
            <!--<tr v-for="(item, index) in data" :key="index">-->
            <tr>
              <td>1</td>
              <td><b>Software Engineering</b></td>
              <td>
                <b>1200.00</b>
              </td>
              <td>
                <button class="btn btn-secondary" @click="showModal()">{{$ml.get('pay')}}</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
    <sweet-modal :ref="'invoiceModal'" hide-close-button blocking overlay-theme="dark">

      <div id="printMe">
        <div class="invoice_payment">
          <h3 class="text-center font-weight-bold">{{$ml.get('invoice_payment')}}</h3>
          <div class="row">
            <div class="col-md-12 text-left">
              <h5>
                <span class="font-weight-bold">{{$ml.get('i_get')}} / </span>
                <span>............................................................</span>
              </h5>
              <h5>
                <span class="font-weight-bold">{{$ml.get('from_student')}} / </span>
                <span>..................................</span>
              </h5>
              <h5>
                <span class="font-weight-bold">{{$ml.get('from_course')}} / </span>
                <span>..................................</span>
              </h5>
            </div>
            <div class="col-6 text-left">
              <h5>
                <span class="font-weight-bold">{{$ml.get('amount')}} / </span>
                <span>.........................</span>
              </h5>
            </div>
            <div class="col-6 text-left">
              <h5>
                <span class="font-weight-bold">{{$ml.get('date')}} / </span>
                <span>.........................</span>
              </h5>
            </div>
          </div>
        </div>
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
  .invoice_payment {
    border: 1px dashed #000;
    padding: 8px;
  }
</style>
