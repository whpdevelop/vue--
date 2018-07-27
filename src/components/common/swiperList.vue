<template>
 <div id='swiperList'>
     <div class="list">
         <p>
             <span>{{data.name}}</span>
             <span @click="toAll">更多</span>
         </p>
         <ul>
             <li v-for="(item,index) in data.arr" :key="index" @click="toDetail(item.id)">
               <!-- <p>{{item.id}}</p> -->
                 <img :src="item.cover.url" alt="">
                 <p class="text1">{{item.title}}</p>
             </li>
         </ul>
     </div>
 </div>
</template>

<script>
import { getTypesData } from "@/api";
export default {
  props: ["type"],
  data() {
    return {
      start: 0,
      count: 10,
      data: { arr: [] },
      routerType: ""
    };
  },
  created() {
    // console.log(this.$route.params);
    this.init();
    // console.log(this.type);

    // 根据接口分析 电影的接口包含movie 图书的接口包含book
    // 判断是啥类型
    if (this.type.includes("movie")) {
      this.routerType = "movie";
    } else if (this.type.includes("book")) {
      this.routerType = "book";
    }
  },
  methods: {
    // 跳转详情
    toDetail(id) {
      this.$router.push(`/${this.routerType}/detail/${id}`);
    },
    // 跳转更多
    toAll() {
      this.$router.push(`/${this.routerType}/${this.type}`);
    },
    // 根据类型获取数据
    init() {
      getTypesData(this.type, this.start, this.count).then(res => {
        this.data.arr.push(...res.data.subject_collection_items);
        this.data.name = res.data.subject_collection.name;
      });
    }
  },
  components: {}
};
</script>

<style lang="scss">
#swiperList {
  padding: 20px;
  .list {
    & > p {
      display: flex;
      justify-content: space-between;
      span:first-child {
        font-size: 18px;
      }
      span:last-child {
        color: #42bd56;
      }
    }
    ul {
      padding-top: 10px;
      display: flex;
      overflow-x: auto;
      li {
        flex: none;
        width: 100px;
        margin-right: 10px;
        padding-bottom: 10px;
        img {
          width: 100%;
          height: 160px;
        }
        p {
          text-align: center;
          padding-top: 5px;
        }
      }
    }
  }
}
</style>
