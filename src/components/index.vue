<template>
 <div id='index'>
     <!-- 
         导航列表
      -->
    <ul class="navList">
        <li>
            <router-link to="/movie/coming">影院热映</router-link>
        </li>
        <li>
            <router-link to="">近期值得看的国产剧</router-link>
        </li>
        <li>
            <router-link to="">豆瓣时间</router-link>
        </li>
        <li>
            <router-link to="">使用豆瓣App</router-link>
        </li>
    </ul>
    <!-- 首页列表 -->
    <!-- <ul class="indexList">
      <li v-for="(item) in indexData" :key="item.id">
        <router-link to="">
          <div>
            <h4>{{item.title}}</h4>
            <p class="text">
              {{item.target.desc}}
            </p>
            <p>by&nbsp;{{item.target.author.name}}</p>
          </div>
          <img v-if="item.target.cover_url" :src="item.target.cover_url" alt="">
        </router-link>
      </li>
    </ul> -->
    <van-list
      class="indexList"
      v-model="loading"
      :finished="finished"
      @load="onLoad"
      >
      <van-cell class="li" v-for="(item,index) in indexData" :key="index" 
        :offset="offset"
        >
          <router-link to="">
              <div>
                <h4>{{item.title}}</h4>
                <p class="text">
                  {{item.target.desc}}
                </p>
                <p>by&nbsp;{{item.target.author.name}}</p>
              </div>
              <div v-if="item.target.cover_url" style="width:90px;height:90px;">
                <img v-if="item.target.cover_url" :src="item.target.cover_url" alt="" >
              </div>
            </router-link>
          </van-cell>
    </van-list>
 </div>
</template>

<script>
import { getIndexData } from "@/api";
export default {
  data() {
    return {
      offset: 50,
      indexData: [],
      loading: false,
      finished: false,
      param: ""
    };
  },
  created() {},
  methods: {
    // 滚动加载首页数据
    onLoad() {
      setTimeout(() => {
        getIndexData(`/recommend_feed?next_date=${this.param}`).then(res => {
          this.indexData.push(...res.data.recommend_feeds);
          this.param = res.data.date;
          this.loading = false;
          if (!res.data.date) {
            this.finished = true;
          }
        });
      }, 500);
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
#index {
  .navList {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 20px;

    li {
      width: 50%;
      padding: 5px;
      a {
        background-color: #f6f6f6;
        text-align: center;
        display: block;
        height: 100%;
        padding: 10px 0;
      }
    }
  }
  .indexList {
    padding: 0 20px;
    .li {
      height: 160px;
      border-bottom: 1px solid #aaa;
      padding-top: 20px;
      a {
        display: flex;
        justify-content: space-between;
        div {
          padding: 0 5px;
          p {
            padding-top: 10px;
            font-size: 12px;
            color: #aaa;
          }
          // span {
          //   display: inline;
          //   padding-top: 10px;
          // }
        }
        img {
          width: 90px;
          height: 90px;
        }
      }
    }
  }
}
</style>
