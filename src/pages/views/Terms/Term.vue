<template>
  <card class="card-user">
    <div class="row">
      <div class="col-md-9 text-left">
        <router-link :to="{name:'add_term'}" class="btn btn-wd btn-default btn-fill btn-rotate"
                     v-if="$helper.hasAccessPermission('add-semester')">
          <i class="ti-plus"></i>
          {{$ml.get('add_term')}}
        </router-link>
      </div>
      <!--      <div class="col-md-3 text-right">-->
      <!--        <fg-input type="text"-->
      <!--                  :placeholder="$ml.get('search')">-->
      <!--        </fg-input>-->
      <!--      </div>-->
      <div class="col-md-12 text-left">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <th width="50">#</th>
            <th>{{$ml.get('name')}}</th>
            <th>{{$ml.get('term_type')}}</th>
            <th>{{$ml.get('term_start')}}</th>
            <th>{{$ml.get('term_end')}}</th>
            <th></th>
            <th width="50"></th>
            </thead>
            <tbody>
            <tr v-for="(item, index) in all_terms" :key="index" :id="'term'+item.idsemester">
              <td>{{index+1}}</td>
              <td>
                <b>{{item.name}} </b>
              </td>
              <td>
                <b>{{item.type}} </b>
              </td>
              <td>
                <b>{{item.startDate}}</b>
              </td>
              <td>
                <b> {{item.endDate}}</b>
              </td>
              <td>
                <router-link :to="{name:'term_subject_hours',params:{term_id:item.idsemester,program_id:programId}}"
                             v-if="$helper.hasAccessPermission('get-semConfigHours-By-SemId')"
                             class="btn btn-outline-info">
                  {{$ml.get('hours')}}
                </router-link>
                &nbsp;
                <router-link :to="{name:'term_subjects',params:{term_id:item.idsemester,program_id:programId}}"
                             v-if="$helper.hasAccessPermission('get-OpenCourseSemesterbySem-by-SemesterId')"
                             class="btn btn-outline-primary">
                  {{$ml.get('subjects')}}
                </router-link>
              </td>
              <td>
                <div class="btn-group direction-inverse">
                  <button class="btn btn-secondary" @click="showModal(item)"
                          v-if="$helper.hasAccessPermission('get-semester-by-id')">
                    <i class="ti-eye"></i>
                  </button>
                  <button class="btn btn-danger" @click="deleteSemester(item)"
                          v-if="$helper.hasAccessPermission('delete-semester-by-id')">
                    <i class="ti-trash"></i>
                  </button>
                  <router-link :to="{name:'edit_term',params:{'id':item.idsemester}}" class="btn btn-info"
                               v-if="$helper.hasAccessPermission('update-semester-by-id')">
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
        <tbody class="font-weight-bold direction-inverse text-left" v-if="currentItem">
        <tr>
          <td>{{$ml.get('name')}}</td>
          <td>{{currentItem.name}}</td>
        </tr>
        <tr>
          <td>{{$ml.get('name_en')}}</td>
          <td>{{currentItem.name_en}}</td>
        </tr>
        <tr>
          <td>{{$ml.get('term_type')}}</td>
          <td>{{currentItem.type}}</td>
        </tr>
        <tr>
          <td>{{$ml.get('term_start')}}</td>
          <td>{{currentItem.startDate}}</td>
        </tr>
        <tr>
          <td>{{$ml.get('term_end')}}</td>
          <td>{{currentItem.endDate}}</td>
        </tr>
        <tr>
          <td>{{$ml.get('term_start_register')}}</td>
          <td>{{currentItem.startStudentRegDate}}</td>
        </tr>
        <tr>
          <td>{{$ml.get('term_end_register')}}</td>
          <td>{{currentItem.endStudentRegDate}}</td>
        </tr>
        <tr>
          <td>{{$ml.get('term_start_editing')}}</td>
          <td>{{currentItem.startStudentEditRegDate}}</td>
        </tr>
        <tr>
          <td>{{$ml.get('term_end_editing')}}</td>
          <td>{{currentItem.endStudentEditRegDate}}</td>
        </tr>
        <tr>
          <td>{{$ml.get('term_start_ending')}}</td>
          <td>{{currentItem.startSubjectRevokeDate}}</td>
        </tr>
        <tr>
          <td>{{$ml.get('term_end_editing')}}</td>
          <td>{{currentItem.endSubjectRevokeDate}}</td>
        </tr>
        </tbody>
      </table>
    </sweet-modal>
  </card>
</template>

<script>
  import {SweetModal, SweetModalTab} from 'sweet-modal-vue'

  export default {
    name: "Terms",
    components: {
      SweetModal,
      SweetModalTab
    },
    data() {
      return {
        programId: null,
        currentItem: null,
        all_terms: []
      }
    },
    methods: {
      showModal(item) {
        let vm = this;
        vm.currentItem = item;
        vm.$refs.termModal.open();
      },
      deleteSemester(term) {
        let vm = this;
        vm.$swal({
          title: vm.$ml.get('confirm_warning'),
          text: vm.$ml.get('are_you_sure'),
          type: 'warning',
          showLoaderOnConfirm: true,
          showCancelButton: true,
          confirmButtonText: vm.$ml.get('yes'),
          cancelButtonText: vm.$ml.get('no')
        }).then((result) => {
          if (result.value) {
            window.serviceAPI.API().delete(window.serviceAPI.DELETE_SEMESTERS + `/${term.idsemester}`)
              .then((response) => {
                vm.$root.$children[0].$refs.loader.show_loader = false;
                $(`#term${term.idsemester}`).remove()
              }).catch((error) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.handleError(error, vm);
            });

          }
        });
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
      vm.getAllSemester();
    }
  }
</script>
