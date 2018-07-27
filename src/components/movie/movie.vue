<template>
 <div id='movie'>
     <!-- <swiper-list :type="'movie_showing'"></swiper-list>
     <swiper-list :type="'movie_free_stream'"></swiper-list>
     <swiper-list :type="'movie_latest'"></swiper-list> -->
     <swiper-list v-for="(item,index) in types" :key="index"    :type="item"></swiper-list>
 </div>
</template>
<script>
import { getMovieComingData } from "@/api";
import swiperList from "@/components/common/swiperList";
export default {
  data() {
    return {
      types: ["movie_showing", "movie_free_stream", "movie_latest"]
      // showingData: { arr: [] },
      // freeData: { arr: [] },
      // lastData: { arr: [] }
    };
  },
  created() {
    // 此处注释 由于优化 在swiperList 组件中根据类型获取数据
    // this.init();
  },
  methods: {
    init() {
      // 获取影院热映数据  movie_showing
      getMovieComingData("/subject_collection/movie_showing/items", 0, 10).then(
        res => {
          this.showingData.arr.push(...res.data.subject_collection_items);
          this.showingData.name = res.data.subject_collection.name;
          // console.log(res.data.subject_collection.name);
        }
      );
      // 获取免费在线观影 movie_free_stream
      getMovieComingData(
        "/subject_collection/movie_free_stream/items",
        0,
        10
      ).then(res => {
        this.freeData.arr.push(...res.data.subject_collection_items);
        this.freeData.name = res.data.subject_collection.name;
        // console.log(res.data.subject_collection.name);
      });
      // 获取新片速递 movie_latest
      getMovieComingData("/subject_collection/movie_latest/items", 0, 10).then(
        res => {
          this.lastData.arr.push(...res.data.subject_collection_items);
          this.lastData.name = res.data.subject_collection.name;
          // console.log(res.data.subject_collection.name);
        }
      );
    }
  },
  components: {
    swiperList
  }
};
</script>
<style>
</style>
