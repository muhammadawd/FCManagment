<template>
  <card class="card-user">
    <div class="row">

      <div class="col-md-4 text-left">
        <label> {{$ml.get('student_name')}} </label>
        <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedStudent" label="name"
                      track-by="name"
                      :options="allStudents" open-direction="bottom" :multiple="false" :searchable="true"
                      :loading="isLoading" :internal-search="true" :clear-on-select="false"
                      :close-on-select="true"></multi-select>
        <div class="text-left text-danger" id="idStudent_error"></div>
      </div>

      <div class="col-md-4 text-left">
        <label>{{$ml.get('term')}}</label>
        <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedTerm" label="name"
                      track-by="name"
                      :options="all_terms" open-direction="bottom" :multiple="false" :searchable="true"
                      :loading="isLoading" :internal-search="true" :clear-on-select="false"
                      :close-on-select="true"></multi-select>
        <div class="text-left text-danger" id="idSemister_error"></div>
      </div>


      <div class="col-md-3 text-left mt-0">
        <br>
        <button class="btn btn-default" @click="getStudentPayments()" :disabled="!selectedStudent || ! selectedTerm">
          {{$ml.get('search')}}
        </button>
        <div class="text-left text-danger" id="idPrograme_error"></div>
        <div class="text-left text-danger" id="coursesIds_error"></div>
      </div>

      <div class="col-md-12">
        <div class="row text-left">
          <div class="col-md-3">
            <label>{{$ml.get('amount')}}</label>
            <input type="text" class="form-control" v-model="amount">
            <div class="text-left text-danger" id="amount_error"></div>
          </div>
          <div class="col-md-4">
            <label>{{$ml.get('recietNum')}}</label>
            <input type="text" class="form-control" v-model="recietNum">
            <div class="text-left text-danger" id="recietNum_error"></div>
          </div>
          <div class="col-md-3 text-left mt-0">
            <br>
            <button class="btn btn-default" @click="studentPostPaySubject()"
                    :disabled="!selectedStudent || ! selectedTerm || !amount || !recietNum">
              {{$ml.get('pay')}}
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-12 text-left">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <th width="50">#</th>
            <th>{{$ml.get('payments')}}</th>
            <th>{{$ml.get('recietNum')}}</th>
            <th>{{$ml.get('date')}}</th>
                        <th width="50"></th>
            </thead>
            <tbody>
            <tr v-for="(item, index) in transactions" :key="index">
              <td>{{index+1}}</td>
              <td>
                <b>{{item.amount.toFixed(2)}}</b>
              </td>
              <td>
                <b>{{item.receiptId}}</b>
              </td>
              <td>
                <b>{{item.date}}</b>
              </td>
              <td>
                <button class="btn btn-secondary" @click="showModal(item)">{{$ml.get('receipt')}}</button>
              </td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              <td></td>
              <td colspan="3">
                <b class="text-info">{{totalPaid.toFixed(2)}}</b>
              </td>
            </tr>
            </tfoot>
          </table>
        </div>
      </div>

    </div>
    <sweet-modal :ref="'invoiceModal'" hide-close-button blocking overlay-theme="dark">

      <div id="printMe">
        <div class="invoice_payment">
          <h3 class="text-center font-weight-bold">{{$ml.get('invoice_payment')}}</h3>
          <div class="row" dir="rtl" :style="$ml.current == 'ar' ? 'text-align:right': 'text-align:left'">
            <div class="col-md-12 text-lefts">
              <h5>
                <span class="font-weight-bold">{{$ml.get('i_get')}} / </span>
                <span>............................................................</span>
              </h5>
              <h5 v-if="selectedStudent">
                <span class="font-weight-bold">{{$ml.get('from_student')}} / </span>
                <span>{{selectedStudent.name}}</span>
              </h5>
<!--              <h5>-->
<!--                <span class="font-weight-bold">{{$ml.get('from_course')}} / </span>-->
<!--                <span>..................................</span>-->
<!--              </h5>-->
            </div>
            <div class="col-12 text-lefts">
              <h5>
                <span class="font-weight-bold">{{$ml.get('amount')}} / </span>
                <span>{{current_price}}</span>
              </h5>
            </div>
            <div class="col-12 text-lefts">
              <h5>
                <span class="font-weight-bold">{{$ml.get('date')}} / </span>
                <span>{{current_date}}</span>
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
    name: "Payment",
    data() {
      return {
        isLoading: false,
        search_query: '',
        programId: null,
        notes: null,

        selectedStudent: null,
        allStudents: [],

        selectedTerm: null,
        all_terms: [],
        current_price: 0.00,
        current_date: '',
        recietNum: '',
        amount: 0.00,
        hourPrice: 0,
        totalNumRegisteredHours: 0,
        totalPaid: 0.00,
        transactions: [],

      }
    },
    mounted() {
      let vm = this;
      try {
        let auth_data = window.ls.getFromStorage('auth_data');
        vm.programId = vm.$helper.getCurrentProgramId();
      } catch (e) {
        vm.programId = null;
      }
      vm.getAllStudents();
      vm.getAllSemester();
    },
    methods: {

      getStudentPayments() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let program_id = vm.programId;
        let idstudents = vm.selectedStudent ? vm.selectedStudent.idstudents : '';
        let idsemester = vm.selectedTerm ? vm.selectedTerm.idsemester : '';

        try {
          window.serviceAPI.API().get(window.serviceAPI.GET_STUDENT_COURSE_PAYMENTS + `?idStudent=${idstudents}&idSemister=${idsemester}&idPrograme=${program_id}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              let status = response.data.status;
              let data = response.data.data;
              if (status) {
                vm.hourPrice = data.hourPrice
                vm.totalNumRegisteredHours = data.totalNumRegisteredHours
                vm.totalPaid = data.totalPaid
                vm.transactions = data.transactions
                return
              }

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          console.log(e)
        }
      },
      prepareData() {
        let vm = this;
        return {
          idStudent: vm.selectedStudent ? vm.selectedStudent.idstudents : null,
          idSemister: vm.selectedTerm ? vm.selectedTerm.idsemester : null,
          idPrograme: vm.programId,
          amount: vm.amount,
          recietNum: vm.recietNum,
        };
      },
      prepareValidationInputs() {
        return {
          idStudent: 'input',
          idSemister: 'input',
          idPrograme: 'input',
          amount: 'input',
          recietNum: 'input',
        };
      },
      studentPostPaySubject() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let _request_data = vm.prepareData();
        let request_data = window.helper.prepareObjectToSend(_request_data);
        console.log(_request_data)
        console.log(request_data)
        try {
          window.serviceAPI.API().post(window.serviceAPI.POST_STUDENT_COURSE_PAYMENTS, request_data)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              let status = response.data.status;
              let data = response.data.data;
              console.log(data)

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          console.log(e)
        }
      },

      getAllStudents() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_STUDENTS + `?search_query=${vm.search_query}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.allStudents = response.data.result;
                return null;
              }
              vm.allStudents = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.allStudents = [];
          });
        } catch (e) {
          console.log(e)
        }
      },

      getAllSemester() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_SEMESTERS + `?idprogram=${vm.programId}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.all_terms = response.data.result;
                return null;
              }
              vm.all_terms = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.all_terms = [];
          });
        } catch (e) {
          console.log(e)
        }
      },
      showModal(item) {
        let vm = this;
        vm.current_price = item.amount;
        vm.current_date = item.date;
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
