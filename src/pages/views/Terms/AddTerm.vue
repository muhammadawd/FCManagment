<template>

  <card class="card" :title="$ml.get('add_term')">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      :label="$ml.get('name')"
                      :placeholder="$ml.get('name')">
            </fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text"
                      :label="$ml.get('term_start')"
                      :placeholder="$ml.get('term_start')">
            </fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text"
                      :label="$ml.get('term_end')"
                      :placeholder="$ml.get('term_end')">
            </fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text"
                      :label="$ml.get('term_start_register')"
                      :placeholder="$ml.get('term_start_register')">
            </fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text"
                      :label="$ml.get('term_end_register')"
                      :placeholder="$ml.get('term_end_register')">
            </fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text"
                      :label="$ml.get('term_start_editing')"
                      :placeholder="$ml.get('term_start_editing')">
            </fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text"
                      :label="$ml.get('term_end_editing')"
                      :placeholder="$ml.get('term_end_editing')">
            </fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text"
                      :label="$ml.get('term_start_ending')"
                      :placeholder="$ml.get('term_start_ending')">
            </fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text"
                      :label="$ml.get('term_end_ending')"
                      :placeholder="$ml.get('term_end_ending')">
            </fg-input>
          </div>
          <div class="col-md-3 text-left">
            <label>{{$ml.get('term_type')}}</label>
            <select class="form-control">
              <option value="">-- choose --</option>
            </select>
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
