<template>
  <div class="city_body">
    <div class="city_list">
      <div class="city_hot">
        <h2>热门城市</h2>
        <ul class="clearfix">
          <li v-for="data in cotyHotList" :key="data.id">{{ data.nm }}</li>
        </ul>
      </div>
      <div class="city_sort" ref="city_sort">
        <div v-for="(value, key) in cityList" :key="key">
          <h2>{{ key }}</h2>
          <ul>
            <li v-for="item in value" :key="item.id">{{ item.nm }}</li>
          </ul>
        </div>
      </div>
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
export default {
  name: 'City',
  data() {
    return {
      cityList: [],
      cotyHotList: [],
      cityIndex: [],
    }
  },
  mounted() {
    this.axios.get('/City.json').then((res) => {
      // console.log(res.data.letterMap)
      this.cityList = res.data.letterMap
      var hotCity = res.data.letterMap
      var { cityIndex, cotyHotList } = this.handleCity(hotCity)
      this.cotyHotList = cotyHotList
      this.cityIndex = cityIndex
      // console.log(cotyHotList)
      // console.log(cityIndex)
      // console.log(this.hotCity)
    })
  },

  methods: {
    handleCity(hotCity) {
      console.log(hotCity)
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
      this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop
      // console.log(h2[1])
    },
  },
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
