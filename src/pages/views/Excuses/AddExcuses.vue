<template>

  <card class="card" :title="$ml.get('add_excuses')">
    <div>
      <form @submit.prevent>
        <div class="row">

          <div class="col-md-3 text-left">
            <label> {{$ml.get('student_name')}} </label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedStudent"
                          :options="[]"></multi-select>
          </div>

          <div class="col-md-3 text-left">
            <label> {{$ml.get('course_name')}} </label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedCourse"
                          :options="[]"></multi-select>
          </div>
        </div>
        <div class="row">

          <div class="col-md-7 text-left">
            <label> {{$ml.get('notes')}} </label>
            <textarea class="form-control" rows="5"></textarea>
          </div>
        </div>

        <div class="text-center">
          <p-button type="info"
                    round>
                    <!--@click.native.prevent="updateLecturer">-->
            {{$ml.get('add')}}
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
      return {
        selectedStudent: null,
        selectedCourse: null,
      }
    }
  }
</script>

<style scoped>

</style>
