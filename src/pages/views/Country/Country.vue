<template>
  <card class="card-user">
    <div class="row">
      <div class="col-md-9 text-left">
        <router-link :to="{name:'add_country'}" class="btn btn-wd btn-default btn-fill btn-rotate"
                     v-if="$helper.hasAccessPermission('add-countries')">
          <i class="ti-plus"></i>
          {{$ml.get('add_country')}}
        </router-link>
        &nbsp;
        <router-link :to="{name:'add_government'}" class="btn btn-wd btn-default btn-fill btn-rotate"
                     v-if="$helper.hasAccessPermission('add-governorates')">
          <i class="ti-plus"></i>
          {{$ml.get('add_government')}}
        </router-link>
        &nbsp;
        <router-link :to="{name:'add_city'}" class="btn btn-wd btn-default btn-fill btn-rotate"
                     v-if="$helper.hasAccessPermission('add-cities')">
          <i class="ti-plus"></i>
          {{$ml.get('add_city')}}
        </router-link>
      </div>
      <!--<div class="col-md-3 text-right">-->
      <!--<fg-input type="text"-->
      <!--:placeholder="$ml.get('search')">-->
      <!--</fg-input>-->
      <!--</div>-->
      <div class="col-md-12 mt-3">

        <tabs
          :tabs="tabs"
          :currentTab="currentTab"
          :wrapper-class="'default-tabs direction-inverse'"
          :tab-class="'default-tabs__item'"
          :tab-active-class="'default-tabs__item_active'"
          :line-class="'default-tabs__active-line'"
          @onClick="handleClick"
        />
        <div class="content">
          <div v-if="currentTab === 'tab1'">

            <div class="table-responsive">
              <table class="table table-striped text-left">
                <thead>
                <th width="50">#</th>
                <th>{{$ml.get('country')}}</th>
                <th width="50"></th>
                </thead>
                <tbody>
                <tr v-for="(item , index) in all_countries" :key="index" :id="'country'+item.idcountries">
                  <td>{{index+1}}</td>
                  <td>
                    <b>{{item.name}}</b>
                    <b v-if="item.name_en"> - ({{item.name_en}})</b>
                  </td>
                  <td>
                    <div class="btn-group direction-inverse">
                      <button class="btn btn-danger" @click="deleteCountry(item)"
                              v-if="$helper.hasAccessPermission('delete-countries-by-id')">
                        <i class="ti-trash"></i>
                      </button>
                      <router-link :to="{name:'edit_country',params:{'id':item.idcountries}}" class="btn btn-info"
                                   v-if="$helper.hasAccessPermission('update-countries-by-id')">
                        <i class="ti-save"></i>
                      </router-link>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-if="currentTab === 'tab2'">

            <div class="row">
              <div class="col-md-3 text-left">
                <label>{{$ml.get('country')}}</label>
                <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedCountry" label="name"
                              track-by="name"
                              :options="countries" open-direction="bottom" :multiple="false" :searchable="true"
                              :loading="isLoading" :internal-search="true" :clear-on-select="false"
                              :close-on-select="true"></multi-select>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-striped text-left">
                <thead>
                <th width="50">#</th>
                <th>{{$ml.get('country')}}</th>
                <th>{{$ml.get('government')}}</th>
                <th width="50"></th>
                </thead>
                <tbody>
                <tr v-for="(item , index) in all_governrates" :key="index" :id="'governorate'+item.idgovernorates">
                  <td>{{index+1}}</td>
                  <td>
                    <b v-if="selectedCountry">{{selectedCountry.name}}</b>
                    <b v-if="selectedCountry && selectedCountry.name_en"> - ({{selectedCountry.name_en}})</b>
                  </td>
                  <td>
                    <b>{{item.name}}</b>
                    <b v-if="item.name_en"> - ({{item.name_en}})</b>
                  </td>
                  <td>
                    <div class="btn-group direction-inverse">
                      <button class="btn btn-danger" @click="deleteGovernrate(item)"
                              v-if="$helper.hasAccessPermission('delete-governorates-by-id')">
                        <i class="ti-trash"></i>
                      </button>
                      <router-link :to="{name:'edit_government',params:{'id':item.idgovernorates}}"
                                   v-if="$helper.hasAccessPermission('update-governorates-by-id')"
                                   class="btn btn-info">
                        <i class="ti-save"></i>
                      </router-link>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-if="currentTab === 'tab3'">

            <div class="row">
              <div class="col-md-3 text-left">
                <label>{{$ml.get('country')}}</label>
                <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedCountry2" label="name"
                              track-by="name"
                              :options="countries" open-direction="bottom" :multiple="false" :searchable="true"
                              :loading="isLoading" :internal-search="true" :clear-on-select="false"
                              :close-on-select="true"></multi-select>
              </div>
              <div class="col-md-3 text-left">
                <label>{{$ml.get('government')}}</label>
                <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedGovernment" label="name"
                              track-by="name"
                              :options="all_governrates2" open-direction="bottom" :multiple="false" :searchable="true"
                              :loading="isLoading" :internal-search="true" :clear-on-select="false"
                              :close-on-select="true"></multi-select>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-striped text-left">
                <thead>
                <th width="50">#</th>
                <th width="200">{{$ml.get('country')}}</th>
                <th>{{$ml.get('government')}}</th>
                <th>{{$ml.get('city')}}</th>
                <th width="50"></th>
                </thead>
                <tbody>
                <tr v-for="(item , index) in cities" :key="index" :id="'city'+item.idcities">
                  <td>{{index+1}}</td>
                  <td>
                    <b v-if="selectedCountry2">{{selectedCountry2.name}}</b>
                    <b v-if="selectedCountry2 && selectedCountry2.name_en"> - ({{selectedCountry2.name_en}})</b>
                  </td>
                  <td>
                    <b v-if="selectedGovernment">{{selectedGovernment.name}}</b>
                    <b v-if="selectedGovernment && selectedGovernment.name_en"> - ({{selectedGovernment.name_en}})</b>
                  </td>
                  <td>
                    <b>{{item.name}}</b>
                    <b v-if="item.name_en"> - ({{item.name_en}})</b>
                  </td>
                  <td>
                    <div class="btn-group direction-inverse">
                      &nbsp;
                      <button class="btn btn-danger" @click="deleteCity(item)"
                              v-if="$helper.hasAccessPermission('delete-cities-by-id')">
                        <i class="ti-trash"></i>
                      </button>
                      <!--                      <router-link :to="{name:'edit_country',params:{'id':item.idcities}}" class="btn btn-info">-->
                      <!--                        <i class="ti-save"></i>-->
                      <!--                      </router-link>-->
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  </card>
</template>

<script>
  import Tabs from 'vue-tabs-with-active-line';
  import multiSelect from 'vue-multiselect'
  import 'vue-multiselect/dist/vue-multiselect.min.css';

  export default {
    name: "AllCountries",
    components: {
      multiSelect,
      Tabs,
    },
    data() {
      return {
        all_countries: [],
        countries: [],
        cities: [],
        all_governrates: [],
        all_governrates2: [],
        selectedCountry: null,
        selectedCountry2: null,
        selectedGovernment: null,
        tabs: [
          {title: this.$ml.get('countries'), value: 'tab1'},
          {title: this.$ml.get('governments'), value: 'tab2'},
          {title: this.$ml.get('cities'), value: 'tab3',}
        ],
        currentTab: 'tab1',
        isLoading: false,
      }
    },
    watch: {
      selectedCountry: function (newSelectedCountry, oldSelectedCountry) {
        let vm = this;
        vm.getAllGovernrates(newSelectedCountry ? newSelectedCountry.idcountries : 1)
      },
      selectedCountry2: function (newSelectedCountry, oldSelectedCountry) {
        let vm = this;
        vm.getAllGovernrates_2(newSelectedCountry ? newSelectedCountry.idcountries : 1)
      },
      selectedGovernment: function (newSelectedGovernment, oldSelectedGovernment) {
        let vm = this;
        vm.getAllCities(newSelectedGovernment ? newSelectedGovernment.idgovernorates : 1)
      },
    },
    mounted() {
      let vm = this;
      vm.getAllCountries();
    },
    methods: {
      handleClick(newTab) {
        this.currentTab = newTab;
      },
      deleteCountry(country) {
        let vm = this;
        vm.$swal({
          title: vm.$ml.get('confirm_warning'),
          text: vm.$ml.get('are_you_sure'),
          type: 'warning',
          showLoaderOnConfirm: true,
          showCancelButton: true,
          confirmButtonText: vm.$ml.get('yes'),
          cancelButtonText: vm.$ml.get('no')
        }).then((result) => {
          if (result.value) {
            window.serviceAPI.API().delete(window.serviceAPI.DELETE_COUNTRIES + `/${country.idcountries}`)
              .then((response) => {
                vm.$root.$children[0].$refs.loader.show_loader = false;
                $(`#country${country.idcountries}`).hide()
              }).catch((error) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.handleError(error, vm);
            });

          }
        });
      },
      deleteGovernrate(governrate) {
        let vm = this;
        vm.$swal({
          title: vm.$ml.get('confirm_warning'),
          text: vm.$ml.get('are_you_sure'),
          type: 'warning',
          showLoaderOnConfirm: true,
          showCancelButton: true,
          confirmButtonText: vm.$ml.get('yes'),
          cancelButtonText: vm.$ml.get('no')
        }).then((result) => {
          if (result.value) {
            window.serviceAPI.API().delete(window.serviceAPI.DELETE_GOVERNRATES + `/${governrate.idgovernorates}`)
              .then((response) => {
                vm.$root.$children[0].$refs.loader.show_loader = false;
                $(`#governorate${governrate.idgovernorates}`).hide()
              }).catch((error) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.handleError(error, vm);
            });

          }
        });
      },
      deleteCity(city) {
        let vm = this;
        vm.$swal({
          title: vm.$ml.get('confirm_warning'),
          text: vm.$ml.get('are_you_sure'),
          type: 'warning',
          showLoaderOnConfirm: true,
          showCancelButton: true,
          confirmButtonText: vm.$ml.get('yes'),
          cancelButtonText: vm.$ml.get('no')
        }).then((result) => {
          if (result.value) {
            window.serviceAPI.API().delete(window.serviceAPI.DELETE_CITIES + `/${city.idcities}`)
              .then((response) => {
                vm.$root.$children[0].$refs.loader.show_loader = false;
                $(`#city${city.idcities}`).hide()
              }).catch((error) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.handleError(error, vm);
            });

          }
        });
      },
      getAllCountries() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_COUNTRIES)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.all_countries = response.data.result;
                vm.countries = response.data.result;
                return null;
              }
              vm.all_countries = [];
              vm.countries = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.all_countries = [];
            vm.countries = [];
          });
        } catch (e) {
          console.log(e)
        }
      },
      changeContry() {
        let vm = this;
        // vm.getAllGovernrates(vm.selectedCountry ? vm.selectedCountry.idcountries : 1)
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
                vm.all_governrates = response.data.result;
                return null;
              }
              vm.all_governrates = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.all_governrates = [];
          });
        } catch (e) {
          console.log(e)
        }
      },
      getAllGovernrates_2(idcountries) {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_GOVERNRATES + `?idcountries=${idcountries}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.all_governrates2 = response.data.result;
                return null;
              }
              vm.all_governrates2 = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.all_governrates2 = [];
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
    }
  }
</script>

<style lang="scss">
  .default-tabs {
    position: relative;
    margin: 0 auto;

    &__item {
      display: inline-block;
      margin: 0 5px;
      padding: 10px;
      padding-bottom: 8px;
      font-size: 16px;
      letter-spacing: 0.8px;
      color: gray;
      text-decoration: none;
      border: none;
      background-color: transparent;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      transition: all 0.25s;

      &_active {
        color: black;
      }

      &:hover {
        border-bottom: 2px solid gray;
        color: black;
      }

      &:focus {
        outline: none;
        border-bottom: 2px solid gray;
        color: black;
      }

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }
    }

    &__active-line {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      background-color: black;
      transition: transform 0.4s ease, width 0.4s ease;
    }
  }

  .content {
    margin-top: 30px;
    font-size: 20px;
  }
</style>
