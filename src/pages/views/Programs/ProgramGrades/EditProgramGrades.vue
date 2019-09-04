<template>

  <card class="card" :title="$ml.get('edit_program_grade')">
    <div>
      <form @submit.prevent>

        <div class="row">
          <div class="col-md-3">

            <fg-input type="text"
                      :label="$ml.get('name')"
                      :placeholder="$ml.get('name')">
            </fg-input>
          </div>
          <div class="col-md-12"></div>
          <div class="col-md-4">
            <fg-input type="text"
                      :label="$ml.get('from_grade')"
                      :placeholder="$ml.get('from_grade')">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      :label="$ml.get('to_grade')"
                      :placeholder="$ml.get('to_grade')">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      :label="$ml.get('points')"
                      :placeholder="$ml.get('points')">
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
