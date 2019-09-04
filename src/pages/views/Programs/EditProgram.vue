<template>

  <card class="card" :title="$ml.get('edit_program')">
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
                      :label="$ml.get('hours_need_grade')"
                      :placeholder="$ml.get('hours_need_grade')">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      :label="$ml.get('min_number_grade')"
                      :placeholder="$ml.get('min_number_grade')">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      :label="$ml.get('max_fail_percent')"
                      :placeholder="$ml.get('max_fail_percent')">
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
