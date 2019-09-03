<template>

  <card class="card" :title="$ml.get('edit_government')">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-3 text-left">
            <label>{{$ml.get('country')}}</label>
            <select class="form-control">
              <option value="">-- choose --</option>
            </select>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      :label="$ml.get('name')"
                      :placeholder="$ml.get('name')">
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
  export default {
    name: "EditLecturer",
    methods: {
      updateLecturer() {
        alert('test')
      }
    }
  }
</script>

<style scoped>

</style>
