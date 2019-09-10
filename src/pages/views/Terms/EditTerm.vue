<template>

  <card class="card" :title="$ml.get('edit_term')">
    <div>
      <form @submit.prevent>

        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      :label="$ml.get('name')"
                      :placeholder="$ml.get('name')">
            </fg-input>
          </div>
          <div class="col-md-3 text-left">
            <label>{{$ml.get('term_start')}}</label>
            <flat-pickr v-model="start_term_date" class="form-control"></flat-pickr>
          </div>
          <div class="col-md-3 text-left">
            <label>{{$ml.get('term_end')}}</label>
            <flat-pickr v-model="end_term_date" class="form-control"></flat-pickr>
          </div>
          <div class="col-md-3 text-left">
            <label>{{$ml.get('term_start_register')}}</label>
            <flat-pickr v-model="term_start_register_date" class="form-control"></flat-pickr>
          </div>
          <div class="col-md-3 text-left">
            <label>{{$ml.get('term_end_register')}}</label>
            <flat-pickr v-model="term_end_register_date" class="form-control"></flat-pickr>
          </div>
          <div class="col-md-3 text-left">
            <label>{{$ml.get('term_start_editing')}}</label>
            <flat-pickr v-model="term_start_register_date" class="form-control"></flat-pickr>
          </div>
          <div class="col-md-3 text-left">
            <label>{{$ml.get('term_end_editing')}}</label>
            <flat-pickr v-model="term_end_register_date" class="form-control"></flat-pickr>
          </div>
          <div class="col-md-3 text-left">
            <label>{{$ml.get('term_start_ending')}}</label>
            <flat-pickr v-model="term_start_ending_date" class="form-control"></flat-pickr>
          </div>
          <div class="col-md-3 text-left">
            <label>{{$ml.get('term_end_editing')}}</label>
            <flat-pickr v-model="term_end_ending_date" class="form-control"></flat-pickr>
          </div>
          <div class="col-md-3 text-left">
            <label>{{$ml.get('term_type')}}</label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedTerm"
                          :options="[]"></multi-select>
          </div>
        </div>

        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="updateLecturer">
            {{$ml.get('edit')}}
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>

<script>
  import flatPickr from 'vue-flatpickr-component';
  import multiSelect from 'vue-multiselect';

  import 'flatpickr/dist/flatpickr.css';
  import 'vue-multiselect/dist/vue-multiselect.min.css';

  export default {
    name: "EditLecturer",
    data() {
      return {
        start_term_date: new Date(),
        end_term_date: new Date(),
        term_start_register_date: new Date(),
        term_end_register_date: new Date(),
        term_start_editing_date: new Date(),
        term_end_editing_date: new Date(),
        term_start_ending_date: new Date(),
        term_end_ending_date: new Date(),
        selectedTerm: null,
      }
    },
    components: {
      flatPickr,
      multiSelect
    },
    methods: {
      updateLecturer() {
        alert('test')
      }
    }
  }
</script>

<style scoped>

</style>
