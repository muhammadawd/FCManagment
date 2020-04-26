<template>

  <card class="card" :title="$ml.get('edit_student')">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-3">
            <fg-input type="text"
                      v-model="name"
                      :label="$ml.get('name')"
                      :placeholder="$ml.get('name')">
            </fg-input>
            <div class="text-danger text-left" id="name_error"></div>
          </div>
          <div class="col-md-3">
            <fg-input type="text"
                      v-model="email"
                      :label="$ml.get('email')"
                      :placeholder="$ml.get('email')">
            </fg-input>
            <div class="text-danger text-left" id="email_error"></div>
          </div>
          <div class="col-md-3 text-left">
            <label>{{$ml.get('year')}}</label>
            <select class="form-control" v-model="entry_year">
              <option v-for="year in years" :value="year">{{ year }}</option>
            </select>
            <div class="text-danger text-left" id="entry_year_error"></div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="nationalNum"
                      :label="$ml.get('ssn')"
                      :placeholder="$ml.get('ssn')">
            </fg-input>
            <div class="text-danger text-left" id="nationalNum_error"></div>
          </div>
        </div>
        <div class="row text-left">
          <div class="col-md-3">
            <label>{{$ml.get('country')}}</label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedCountry" label="name"
                          track-by="name"
                          :options="countries" open-direction="bottom" :multiple="false" :searchable="true"
                          :loading="isLoading" :internal-search="true" :clear-on-select="false"
                          :close-on-select="true"></multi-select>
          </div>

          <div class="col-md-3">
            <label>{{$ml.get('government')}}</label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedGovernment" label="name"
                          track-by="name"
                          :options="governments" open-direction="bottom" :multiple="false" :searchable="true"
                          :loading="isLoading" :internal-search="true" :clear-on-select="false"
                          :close-on-select="true"></multi-select>
          </div>

          <div class="col-md-3">
            <label>{{$ml.get('city')}}</label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedCity" label="name"
                          track-by="name"
                          :options="cities" open-direction="bottom" :multiple="false" :searchable="true"
                          :loading="isLoading" :internal-search="true" :clear-on-select="false"
                          :close-on-select="true"></multi-select>
            <div class="text-danger text-left" id="idcity_error"></div>
          </div>

          <div class="col-md-3">
            <fg-input type="text"
                      v-model="address"
                      :label="$ml.get('full_address')"
                      :placeholder="$ml.get('full_address')">
            </fg-input>
            <div class="text-danger text-left" id="address_error"></div>
          </div>

          <!--          <div class="col-md-4">-->
          <!--            <fg-input type="file"-->
          <!--                      :label="$ml.get('image')"-->
          <!--                      :placeholder="$ml.get('image')">-->
          <!--            </fg-input>-->
          <!--          </div>-->
        </div>

        <div class="row text-left">
          <div class="col-md-3">
            <label>{{$ml.get('sec_section')}}</label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedSecondary" label="name"
                          track-by="name"
                          :options="secSecondary" open-direction="bottom" :multiple="false" :searchable="true"
                          :loading="isLoading" :internal-search="true" :clear-on-select="false"
                          :close-on-select="true"></multi-select>
            <div class="text-danger text-left" id="idsecondary_depts_error"></div>
          </div>

          <div class="col-md-3">
            <label>{{$ml.get('program_levels')}}</label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedProgramLevels" label="name"
                          track-by="name"
                          :options="programLevels" open-direction="bottom" :multiple="false" :searchable="true"
                          :loading="isLoading" :internal-search="true" :clear-on-select="false"
                          :close-on-select="true"></multi-select>
            <div class="text-danger text-left" id="idprogram_levels_error"></div>
          </div>
          <div class="col-md-4 text-left">
            <label>{{$ml.get('image')}}</label> <br>
            <input
              ref="input"
              type="file"
              name="image"
              accept="image/*"
              @change="setImage"
            />
            <div class="content">
              <section class="cropper-area" v-if="imgSrc">
                <div class="img-cropper">
                  <vue-cropper
                    ref="cropper"
                    :aspect-ratio="16 / 9"
                    :src="imgSrc"
                    preview=".preview"
                  />
                </div>
              </section>
            </div>
            <div class="text-center">
              <button :disabled="!imgSrc" @click="cropImage()" class="btn btn-secondary mt-2">{{$ml.get('crop')}}</button>
            </div>
            <div class="text-danger text-left" id="stu_img_error"></div>
          </div>
          <div class="col-md-2 text-center" v-if="cropImg">
            <label class="font-weight-bold mt-3">preview</label>
            <img class="img-fluid mt-5 shadow" :src="cropImg" alt="">
          </div>
        </div>

        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="editStudent">
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
  import VueCropper from 'vue-cropperjs';
  import 'cropperjs/dist/cropper.css';

  export default {
    name: "EditStudent",
    components: {
      multiSelect,
      VueCropper
    },
    computed: {
      years() {
        const year = new Date().getFullYear()
        return Array.from({length: year - 2009}, (value, index) => 2010 + index)
      }
    },
    data() {
      return {
        isLoading: false,
        name: null,
        stu_img: null,
        imgSrc: '',
        cropImg: '',
        entry_year: '',
        data: null,
        email: null,
        nationalNum: null,
        address: null,
        countries: [],
        selectedCountry: null,
        governments: [],
        selectedGovernment: null,
        cities: [],
        selectedCity: null,
        secSecondary: [],
        selectedSecondary: null,
        programId: null,
        programLevels: [],
        selectedProgramLevels: null,
      }
    },
    async created() {
      let vm = this;
      try {
        let auth_data = window.ls.getFromStorage('auth_data');
        vm.programId = vm.$helper.getCurrentProgramId();
      } catch (e) {
        vm.programId = null;
      }

      await vm.getAllCountries();
      await vm.getAllSecDepts();
      await vm.getAllProgramLevels();
      await vm.findStudent();
    },
    watch: {
      selectedCountry: function (newSelectedCountry, oldSelectedCountry) {
        let vm = this;
        vm.getAllGovernrates(newSelectedCountry ? newSelectedCountry.idcountries : 1)
      },
      selectedGovernment: function (newSelectedGovernment, oldSelectedGovernment) {
        let vm = this;
        vm.getAllCities(newSelectedGovernment ? newSelectedGovernment.idgovernorates : 1)
      }
    },
    methods: {
      setImage(e) {
        const file = e.target.files[0];
        if (file.type.indexOf('image/') === -1) {
          console.log('Please select an image file');
          return;
        }
        if (typeof FileReader === 'function') {
          const reader = new FileReader();
          reader.onload = (event) => {
            this.imgSrc = event.target.result;
            this.$refs.cropper.replace(event.target.result);
          };
          reader.readAsDataURL(file);
        } else {
          console.log('Sorry, FileReader API not supported');
        }
      },
      cropImage() {
        this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      },
      prepareData() {
        let vm = this;
        return {
          name: vm.name,
          imgSrc: vm.imgSrc,
          stu_img: vm.stu_img,
          email: vm.email,
          nationalNum: vm.nationalNum,
          entry_year: vm.entry_year,
          address: vm.address,
          idprogram_levels: vm.selectedProgramLevels ? vm.selectedProgramLevels.idprogram_levels : null,
          idsecondary_depts: vm.selectedSecondary ? vm.selectedSecondary.idsecondary_depts : null,
          idcity: vm.selectedCity ? vm.selectedCity.idcities : null,
        };
      },
      prepareValidationInputs() {
        return {
          name: 'input',
          stu_img: 'input',
          entry_year: 'input',
          email: 'input',
          nationalNum: 'input',
          address: 'input',
          idprogram_levels: 'input',
          idsecondary_depts: 'input',
          idcity: 'input',
        };
      },
      findStudent() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let id = vm.$route.params.id;
        try {
          window.serviceAPI.API().get(window.serviceAPI.FIND_STUDENTS + `/${id}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data.data.result;
              console.log(response)
              vm.name = response[0].name;
              vm.stu_img = response[0].stu_img;
              vm.email = response[0].email;
              vm.address = response[0].address;
              vm.nationalNum = response[0].nationalNum;
              vm.entry_year = response[0].entry_year;
              $.each(vm.secSecondary, function (index, item) {
                if (response[0].idsecondary_depts == item.idsecondary_depts) {
                  vm.selectedSecondary = item;
                  return
                }
              });
              $.each(vm.programLevels, function (index, item) {
                if (response[0].idprogram_levels == item.idprogram_levels) {
                  vm.selectedProgramLevels = item;
                  return
                }
              });
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          console.log(e)
        }
      },
      editStudent() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        // return
        let _request_data = vm.prepareData();
        let request_data = window.helper.prepareObjectToSend(_request_data);
        console.log(request_data)
        try {
          window.serviceAPI.API().post(window.serviceAPI.ADD_STUDENTS + `?idprogram=${vm.programId}`, request_data)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.showMessage('success', vm);
              vm.$router.push({name: 'students'});
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          console.log(e)
        }
      },
      getAllCountries() {
        let vm = this;
        // vm.$root.$children[0].$refs.loader.show_loader = true;
        vm.isLoading = true
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_COUNTRIES)
            .then((response) => {
              // vm.$root.$children[0].$refs.loader.show_loader = false;
              vm.isLoading = false
              response = response.data;
              if (response.status) {
                vm.countries = response.data.result;
                return null;
              }
              vm.countries = [];

            }).catch((error) => {
            // vm.$root.$children[0].$refs.loader.show_loader = false;
            vm.isLoading = false;
            window.helper.handleError(error, vm);
            vm.countries = [];
          });
        } catch (e) {
          console.log(e)
        }
      },
      getAllGovernrates(idcountries) {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_GOVERNRATES + `?idcountries=${idcountries}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.governments = response.data.result;
                return null;
              }
              vm.governments = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.governments = [];
          });
        } catch (e) {
          console.log(e)
        }
      },
      getAllCities(idgovernorates) {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_CITIES + `?idgovernorates=${idgovernorates}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.cities = response.data.result;
                return null;
              }
              vm.cities = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.cities = [];
          });
        } catch (e) {
          console.log(e)
        }
      },
      getAllSecDepts() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_SEC_DEPTS)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.secSecondary = response.data.result;
                return null;
              }
              vm.secSecondary = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.secSecondary = [];
          });
        } catch (e) {
          console.log(e)
        }
      },
      getAllProgramLevels() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_PROGRAM_LEVELS + `?idprogram=${vm.programId}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.programLevels = response.data.result;
                return null;
              }
              vm.programLevels = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.programLevels = [];
          });
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style scoped>

</style>
