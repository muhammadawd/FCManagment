<template>

  <card class="card" :title="$ml.get('add_student')">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-3">
            <fg-input type="text"
                      :label="$ml.get('name')"
                      :placeholder="$ml.get('name')">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      :label="$ml.get('ssn')"
                      :placeholder="$ml.get('ssn')">
            </fg-input>
          </div>
        </div>
        <div class="row text-left">
          <div class="col-md-3">
            <label>{{$ml.get('country')}}</label>
            <select class="form-control">
              <option value="">-- choose --</option>
            </select>
          </div>

          <div class="col-md-3">
            <label>{{$ml.get('government')}}</label>
            <select class="form-control">
              <option value="">-- choose --</option>
            </select>
          </div>
        </div>

        <div class="row text-left">
          <div class="col-md-3">
            <label>{{$ml.get('sec_section')}}</label>
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
