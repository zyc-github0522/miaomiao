<template>
  <div class="city_body">
    <div class="city_list">
      <Loading v-if="isLoading" />
      <Scroller v-else ref="city_List">
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li
                v-for="data in cotyHotList"
                :key="data.id"
                @tap="handleToCity(data.nm, data.id)"
              >
                {{ data.nm }}
              </li>
            </ul>
          </div>
          <div class="city_sort" ref="city_sort">
            <div v-for="(value, key) in cityList" :key="key">
              <h2>{{ key }}</h2>
              <ul>
                <li
                  v-for="item in value"
                  :key="item.id"
                  @tap="handleToCity(item.nm, item.id)"
                >
                  {{ item.nm }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Scroller>
    </div>
    <div class="city_index">
      <ul>
        <li
          v-for="(data, index) in cityIndex"
          :key="data"
          @touchstart="handleToIndex(index)"
        >
          {{ data }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Scroller from '../Scroller/index.vue'
export default {
  name: 'City',
  data() {
    return {
      cityList: [],
      cotyHotList: [],
      cityIndex: [],
      isLoading: true,
    }
  },
  mounted() {
    var cityIndex = window.localStorage.getItem('cityIndex')
    var cotyHotList = window.localStorage.getItem('cotyHotList')
    var cityList = window.localStorage.getItem('cityList')

    if (cotyHotList && cotyHotList && cityList) {
      this.cityList = JSON.parse(cityList)
      this.cityIndex = JSON.parse(cityIndex)
      this.cotyHotList = JSON.parse(cotyHotList)
      this.isLoading = false
      // console.log(this.cityList['A'][0].nm)
      // console.log(this.cotyHotList[0].nm)
    } else {
      this.axios.get('/City.json').then((res) => {
        // console.log(res.data.letterMap)
        var cityList = res.data.letterMap
        this.cityList = cityList
        var hotCity = res.data.letterMap
        var { cityIndex, cotyHotList } = this.handleCity(hotCity)
        this.cotyHotList = cotyHotList
        this.cityIndex = cityIndex
        this.isLoading = false
        console.log(this.cityList['A'][0])

        window.localStorage.setItem('cityIndex', JSON.stringify(cityIndex))
        window.localStorage.setItem('cotyHotList', JSON.stringify(cotyHotList))
        window.localStorage.setItem('cityList', JSON.stringify(cityList))

        // console.log(cityLists)
      })
    }
  },
  methods: {
    handleCity(hotCity) {
      // console.log(hotCity)
      var letterAll = []
      var cotyHotList = []
      var cityIndex = []
      for (var key in hotCity) {
        cityIndex.push(key)
      }
      // console.log(cityIndex)
      for (var key in hotCity) {
        letterAll.push(hotCity[key])
      }
      var cityLists = Array.prototype.concat.apply([], letterAll) //将二维数组转成一维数组
      for (var i = 0; i < cityLists.length; i++) {
        if (cityLists[i].rank === 'A') {
          cotyHotList.push(cityLists[i])
        }
      }
      return {
        cityIndex,
        cotyHotList,
      }
    },
    handleToIndex(index) {
      // console.log(index)
      var h2 = this.$refs.city_sort.getElementsByTagName('h2')
      // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop
      this.$refs.city_List.toScrollTop(-h2[index].offsetTop)
      // console.log(h2[1])
    },
    handleToCity(nm, id) {
      this.$store.commit('city/CITY_INFO', { nm, id })
      window.localStorage.setItem('nowNm', nm)
      window.localStorage.setItem('nowId', id)
      this.$router.push('/movie/nowPlaying')
    },
  },
  components: { Scroller },
}
</script>

<style scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>
