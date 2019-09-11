<template>
  <card class="card-user">
    <div class="row">
      <div class="col-md-8 text-left">
        <fg-input type="text"
                  :label="$ml.get('student_name')"
                  :placeholder="$ml.get('student_name')">
        </fg-input>
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      :label="$ml.get('term')"
                      :placeholder="$ml.get('term')">
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text"
                      :label="$ml.get('course_name')"
                      :placeholder="$ml.get('course_name')">
            </fg-input>
          </div>
        </div>
        <button class="btn btn-secondary">{{$ml.get('search')}}</button>
      </div>
      <div class="col-md-4 text-right">
        <button @click="triggerFileClick()" class="btn btn-success btn-outline-success">
          <i class="ti-upload"></i>
          {{$ml.get('upload_file')}}
        </button>
        <input type="file" class="d-none" :ref="'file_input'"
               @change="uploadFile()">
        &nbsp;
        <a href="#" class="btn btn-success btn-outline-success">
          <i class="ti-download"></i>
          {{$ml.get('download_file')}}
        </a>
      </div>
      <div class="col-md-12 text-left">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <th width="50">#</th>
            <th>{{$ml.get('student_name')}}</th>
            <th>{{$ml.get('course_name')}}</th>
            <th>{{$ml.get('final')}}</th>
            <th>{{$ml.get('working_task')}}</th>
            <th>{{$ml.get('absence_percent')}}</th>
            <th>{{$ml.get('student_status')}}</th>
            <th width="50"></th>
            </thead>
            <tbody>
            <!--<tr v-for="(item, index) in data" :key="index">-->
            <tr>
              <td>1</td>
              <td><b>Islam Samir Osama Ahmedi</b></td>
              <td><b>JAVA SE</b></td>
              <td><b>67</b></td>
              <td><b>10</b></td>
              <td><b>8</b></td>
              <td><b>ناجح</b></td>
              <td>
                <div class="btn-group direction-inverse">
                  <router-link :to="{name:'edit_degrees',params:{'id':1}}" class="btn btn-info">
                    <i class="ti-save"></i>
                  </router-link>
                </div>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td><b>Islam Samir Osama Ahmedi</b></td>
              <td><b>JAVA SE</b></td>
              <td><b>67</b></td>
              <td><b>10</b></td>
              <td><b>8</b></td>
              <td><b>ناجح</b></td>
              <td>
                <div class="btn-group direction-inverse">
                  <router-link :to="{name:'edit_degrees',params:{'id':1}}" class="btn btn-info">
                    <i class="ti-save"></i>
                  </router-link>
                </div>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td><b>Islam Samir Osama Ahmedi</b></td>
              <td><b>JAVA SE</b></td>
              <td><b>67</b></td>
              <td><b>10</b></td>
              <td><b>8</b></td>
              <td><b>ناجح</b></td>
              <td>
                <div class="btn-group direction-inverse">
                  <router-link :to="{name:'edit_degrees',params:{'id':1}}" class="btn btn-info">
                    <i class="ti-save"></i>
                  </router-link>
                </div>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td><b>Islam Samir Osama Ahmedi</b></td>
              <td><b>JAVA SE</b></td>
              <td><b>67</b></td>
              <td><b>10</b></td>
              <td><b>8</b></td>
              <td><b>ناجح</b></td>
              <td>
                <div class="btn-group direction-inverse">
                  <router-link :to="{name:'edit_degrees',params:{'id':1}}" class="btn btn-info">
                    <i class="ti-save"></i>
                  </router-link>
                </div>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td><b>Islam Samir Osama Ahmedi</b></td>
              <td><b>JAVA SE</b></td>
              <td><b>67</b></td>
              <td><b>10</b></td>
              <td><b>8</b></td>
              <td><b>ناجح</b></td>
              <td>
                <div class="btn-group direction-inverse">
                  <router-link :to="{name:'edit_degrees',params:{'id':1}}" class="btn btn-info">
                    <i class="ti-save"></i>
                  </router-link>
                </div>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td><b>Islam Samir Osama Ahmedi</b></td>
              <td><b>JAVA SE</b></td>
              <td><b>67</b></td>
              <td><b>10</b></td>
              <td><b>8</b></td>
              <td><b>ناجح</b></td>
              <td>
                <div class="btn-group direction-inverse">
                  <router-link :to="{name:'edit_degrees',params:{'id':1}}" class="btn btn-info">
                    <i class="ti-save"></i>
                  </router-link>
                </div>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td><b>Islam Samir Osama Ahmedi</b></td>
              <td><b>JAVA SE</b></td>
              <td><b>67</b></td>
              <td><b>10</b></td>
              <td><b>8</b></td>
              <td><b>ناجح</b></td>
              <td>
                <div class="btn-group direction-inverse">
                  <router-link :to="{name:'edit_degrees',params:{'id':1}}" class="btn btn-info">
                    <i class="ti-save"></i>
                  </router-link>
                </div>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td><b>Islam Samir Osama Ahmedi</b></td>
              <td><b>JAVA SE</b></td>
              <td><b>67</b></td>
              <td><b>10</b></td>
              <td><b>8</b></td>
              <td><b>ناجح</b></td>
              <td>
                <div class="btn-group direction-inverse">
                  <router-link :to="{name:'edit_degrees',params:{'id':1}}" class="btn btn-info">
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
  </card>
</template>

<script>
  export default {
    name: "Lecturer",
    data() {
      return {
        filesToUpload: []
      }
    },
    methods: {
      uploadFile() {
        let vm = this;
        let files = vm.$refs.file_input.files[0];
        vm.filesToUpload.push(files);
      },
      triggerFileClick() {
        let vm = this;
        vm.$refs.file_input.click()
      },
    }
  }
</script>

<
style
scoped >

< /style>
