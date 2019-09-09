<template>

  <card class="card" :title="$ml.get('add_government')">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-3 text-left">
            <label>{{$ml.get('country')}}</label>
            <multi-select v-model="selectedCountries" id="ajax" label="name" track-by="code"
                          :placeholder="$ml.get('type_to_search')"
                          open-direction="bottom" :options="countries" :multiple="false" :searchable="true"
                          :loading="isLoading" :internal-search="true" :clear-on-select="false"
                          :close-on-select="true"
                          :options-limit="300" :limit="3" :limit-text="limitText" :max-height="600"
                          :show-no-results="false" :hide-selected="true" @search-change="asyncFind">
              <template slot="tag" slot-scope="{ option, remove }"><span
                class="custom__tag"><span>{{ option.name }}</span><span class="custom__remove"
                                                                        @click="remove(option)">❌</span></span>
              </template>
              <template slot="clear" slot-scope="props">
                <div class="multiselect__clear" v-if="selectedCountries.length"
                     @mousedown.prevent.stop="clearAll(props.search)"></div>
              </template>
              <span slot="noResult">{{$ml.get('no_data')}}</span>
            </multi-select>
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
        isLoading: false,
        selectedCountries: [],
        countries: [],
        selectedGovernment: null,
        governments: ['Cairo', 'Alexandria', 'Al-Menofia'],
        selectedSecondary: null,
        secSecondary: ['Math', 'Science']
      }
    },
    methods: {
      limitText(count) {
        return `and ${count} other countries`
      },
      asyncFind(query) {
        let vm = this;
        vm.isLoading = true
        // ajaxFindCountry(query).then(response => {
        setTimeout(() => {
          vm.countries = [
            {
              "name": "Egypt",
              "code": "EG"
            },
            {
              "name": "Kuwati",
              "code": "KWD"
            }
          ];
          vm.isLoading = false
        }, 1000)
        // })
      },
      clearAll() {
        this.selectedCountries = []
      },
    }
  }
</script>


<style scoped>

</style>
