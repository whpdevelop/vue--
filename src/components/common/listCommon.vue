<template>
 <div id='coming'>
     <h1>{{comingData.info.name}}</h1>
     <!-- 数据列表 -->
     <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        class="list"
        :offset="offset"
        >
          <ul offset=50>
              <li v-for="(item,index) in comingData.arr" 
                :key="index"
                @click = "toDetail(item.id)"
              >
                <img :src="item.cover.url" alt="">
                <p class="text1">{{item.title}}</p>
                <van-rate v-model="value" :size="size"  disabled-color="#f5a623" :disabled="disabled" />
              </li>
          </ul>
      </van-list>
 </div>
</template>

<script>
/* 
  改为公共组件
  根据数据不同显示 
  -> 电影影热映
  -> 免费观看
  -> 电影速递
*/

// 获取影院信息
import { getMovieComingData } from "@/api";
export default {
  data() {
    return {
      disabled: true,
      size: 14,
      offset: 50,
      url: "subject_collection/movie_showing/items",
      start: 0,
      count: 21,
      comingData: { info: {}, arr: [] },
      loading: false,
      finished: false,
      value: 4
    };
  },
  created() {
    // console.log(this.$route.params);
  },
  methods: {
    // 当滚动的时候 会触发list组件的该方法
    onLoad() {
      // 获取影院信息
      getMovieComingData(
        `subject_collection/${this.$route.params.type}/items`,
        this.start,
        this.count
      ).then(res => {
        this.comingData.info = res.data.subject_collection;
        // console.log(res.data);
        this.comingData.arr.push(...res.data.subject_collection_items);
        this.start += this.count;
        this.loading = false;
        if (!res.data.subject_collection_items.length) {
          this.finished = true;
        }
      });
    },
    // 跳转到电影详情(需要传参 电映id)
    toDetail(id) {
      this.$router.push(`/movie/detail/${id}`);
    }
  },
  components: {}
};
</script>

<style lang="scss">
#coming {
  padding: 20px;
  .list {
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: 31%;
        height: 190px;
        text-align: center;
        img {
          width: 100%;
          height: 130px;
        }
        .van-rate {
          width: 100%;
        }
      }
    }
  }
}
</style>
