<template>

  <card class="card" :title="$ml.get('edit_course')">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-3">
            <fg-input type="text"
                      :label="$ml.get('code')"
                      :placeholder="$ml.get('code')">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      :label="$ml.get('name')"
                      :placeholder="$ml.get('name')">
            </fg-input>
          </div>
          <div class="col-md-3 text-left">
            <label> {{$ml.get('require_type')}} </label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedUnder"
                          :options="[]"></multi-select>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      :label="$ml.get('actual_hours_per_lecture')"
                      :placeholder="$ml.get('actual_hours_per_lecture')">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      :label="$ml.get('activity_hours_per_lecture')"
                      :placeholder="$ml.get('activity_hours_per_lecture')">
            </fg-input>
          </div>
          <div class="col-md-12"></div>
          <div class="col-md-4">
            <fg-input type="text"
                      :label="$ml.get('un_activity_hours_per_lecture')"
                      :placeholder="$ml.get('un_activity_hours_per_lecture')">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      :label="$ml.get('un_actual_hours_per_lecture')"
                      :placeholder="$ml.get('un_actual_hours_per_lecture')">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 text-left">
            <label> {{$ml.get('sec_section')}} </label>
            <select class="form-control">
              <option value="">-- choose --</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      :label="$ml.get('min_hours_required')"
                      :placeholder="$ml.get('min_hours_required')">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      :label="$ml.get('year_working_percent')"
                      :placeholder="$ml.get('year_working_percent')">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      :label="$ml.get('final_percent')"
                      :placeholder="$ml.get('final_percent')">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      :label="$ml.get('year_working_success_percent')"
                      :placeholder="$ml.get('year_working_success_percent')">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      :label="$ml.get('final_success_percent')"
                      :placeholder="$ml.get('final_success_percent')">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      :label="$ml.get('final_degree')"
                      :placeholder="$ml.get('final_degree')">
            </fg-input>
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
  import multiSelect from 'vue-multiselect'
  import 'vue-multiselect/dist/vue-multiselect.min.css';

  export default {
    name: "AddLecturer",
    components: {
      multiSelect
    },
    data() {
      return {selectedUnder: null}
    }
  }
</script>
<style scoped>

</style>
