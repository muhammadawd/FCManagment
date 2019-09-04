<template>

  <card class="card" :title="$ml.get('add_course')">
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
            <select class="form-control">
              <option value="">-- choose --</option>
            </select>
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
            {{$ml.get('add')}}
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>

<script>
  export default {
    name: "AddLecturer"
  }
</script>

<style scoped>

</style>
