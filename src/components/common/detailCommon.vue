<template>
 <div id='detail'>
    <h1>{{detailData.title}}</h1>
    <!-- 电影详细信息 -->
   <ul class="info">
      <li>
        <p>
          <span>评分:{{detailData.extra.rating_group.rating.value}}&emsp;</span>
          <span>{{detailData.extra.rating_group.rating.count}}人评价</span>
        </p>
        <p>
            {{detailData.extra.short_info}}
        </p>
      </li>
      <li>
        <img :src="detailData.cover.normal.url" alt="">
      </li>
    </ul>
    <!-- 所属频道 -->
    <p class="title">所属频道</p >
    <ul class="channel">
      <li v-for="(item,index) in detailData.tags" :key='index'>
        {{item.name}}&emsp;>
      </li>
    </ul>
    <!-- 剧情信息 -->
    <div class="plotInfo">
      <p class="title">{{detailData.title}}的剧情简介</p >
      <p :class="{text:isShow}">
        {{detailData.desc.split('>')[1].slice(0,-5)}}
      </p>
      <div class="show" @click="showAll" v-if="isShow">
        显示全部内容
      </div>
    </div>
    <!-- 影人 -->
    <p class="title" v-if="moviePeople.length">影人</p >
    <ul class="moviePeple" v-if="moviePeople.length">
      <li v-for="(item,index) in moviePeople[0].celebrities" :key="index">
        <img :src="item.cover_url" alt="">
        <p>{{item.name}}</p>
        <p>{{moviePeople[0].title}}</p>
      </li>
      <li v-for="(item,index) in moviePeople[1].celebrities" :key="index">
        <img :src="item.cover_url" alt="" >
        <p>{{item.name}}</p>
        <p>{{moviePeople[1].title}}</p>
      </li>
    </ul>
    <!-- <p class="title">{{detailData.title}}的预告片(40)和图片(138)</p > -->
    <!-- 预告片列表 -->
    <!-- <ul class="announcement">
      <li>
        <img src="https://img1.doubanio.com/img/trailer/medium/2527544359.jpg" alt="">
        <img src="https://img3.doubanio.com/f/talion/b6df390a5411896e81ad9be86a97121c17d4c805/pics/card/play-button.png" alt="摩天营救的预告片">
      </li>
      <li>
        <img src="https://img1.doubanio.com/img/trailer/medium/2527544359.jpg" alt="">
        <img src="https://img3.doubanio.com/f/talion/b6df390a5411896e81ad9be86a97121c17d4c805/pics/card/play-button.png" alt="摩天营救的预告片">
      </li>
      <li>
        <img src="https://img1.doubanio.com/img/trailer/medium/2527544359.jpg" alt="">
        <img src="https://img3.doubanio.com/f/talion/b6df390a5411896e81ad9be86a97121c17d4c805/pics/card/play-button.png" alt="摩天营救的预告片">
      </li>
      <li>查看更多剧照</li>
    </ul> -->
    <!-- 电影评论 -->
    <p class="title">{{detailData.title}}的短评(13604)</p>
    <ul class="comment">
      <li v-for="(item,index) in commentData.data.interests" :key="index">
        <div style="width:40px;height:40px">
          <img :src="item.user.avatar" alt="">
        </div>
        <div>
          <p>{{item.user.name}}</p>
          <p>
            {{item.comment}}
          </p>
          <p>
            <span>{{item.vote_count}}</span>
            <span>...</span>
          </p>
        </div>
      </li>
    </ul>
    <van-button size="large" class="loading" @click="loadingData" v-if="flag">加载更多</van-button>
    <van-button v-else size="large" class="loading" loading @click="loadingData" >加载更多</van-button>

 </div>
</template>

<script>
import { getDetailData, getMoviePeople, getDetailComment } from "@/api";
export default {
  data() {
    return {
      detailData: {},
      moviePeople: [],
      isShow: true,
      commentData: {},
      count: 4,
      start: 0,
      flag: true,
      type: ""
    };
  },
  created() {
    // console.log(this.$route.path);

    if (this.$route.path.includes("book")) {
      this.type = "book";
    } else if (this.$route.path.includes("movie")) {
      this.type = "movie";
    }

    this.initData();
  },
  methods: {
    initData() {
      // 加载基本数据
      getDetailData("/elessar/subject", this.$route.params.id).then(res => {
        this.detailData = res.data;
        console.log(res);
      });
      // 获取影人信息
      if (this.type == "movie") {
        getMoviePeople(this.$route.params.id).then(res => {
          // console.log(res.data.credits);
          this.moviePeople.push(...res.data.credits);
        });
      }

      // 获取评论
      getDetailComment(
        this.type,
        this.$route.params.id,
        this.count,
        this.start
      ).then(res => {
        this.commentData = res;
        console.log(res);
      });
    },
    // 电影详情的显示全部方法
    showAll() {
      this.isShow = !this.isShow;
    },
    // 评论加载更多
    loadingData() {
      // console.log(11);
      // 节流  只有数据返回之后 才能再点击获取数据
      if (this.flag) {
        this.flag = false;
        this.start += this.count;
        getDetailComment(
          this.type,
          this.$route.params.id,
          this.count,
          this.start
        ).then(res => {
          this.commentData.data.interests.push(...res.data.interests);
          this.flag = true;
        });
      }
    }
  },
  components: {}
};
</script>

<style lang="scss">
#detail {
  width: 100%;
  padding: 0 20px;
  h1 {
    padding: 10px 0;
  }
  .info {
    width: 100%;
    display: flex;
    padding: 5px 0;
    li:nth-child(1) {
      flex: 2;
      padding-right: 20px;
      p:nth-child(1) {
        padding-bottom: 10px;
      }
    }
    li:nth-child(2) {
      flex: 1;
      img {
        width: 100%;
      }
    }
  }
  .title {
    color: #aaa;
    padding-top: 10px;
  }
  .channel {
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
    li {
      background-color: #effaf0;
      border: 1px solid #42bd56;
      color: #42bd56;
      padding: 5px 10px;
      border-radius: 30px;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
  .plotInfo {
    .text {
      a {
        float: right;
      }
    }
    .show {
      text-align: center;
      color: #42bd56;
    }
  }
  .moviePeple {
    display: flex;
    overflow-x: auto;
    li {
      padding: 10px 0;
      margin-right: 10px;
      width: 75px;
      flex: none;
      img {
        width: 100%;
        height: 100px;
      }
      p {
        text-align: center;
        font-size: 14px;
      }
      p:nth-of-type(2) {
        color: #aaa;
      }
    }
  }
  .announcement {
    display: flex;
    overflow-x: auto;
    padding-top: 15px;
    li {
      flex: none;
      position: relative;
      width: 210px;
      height: 120px;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
      img:nth-of-type(2) {
        width: 50px;
        height: 50px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    li:last-child {
      background-color: #ccc;
      color: #42bd56;
      line-height: 120px;
      text-align: center;
    }
  }
  .comment {
    li {
      display: flex;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      p {
        padding-left: 20px;
      }
      p:nth-of-type(2) {
        padding-top: 20px;
      }
      p:nth-of-type(3) {
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
        span:nth-of-type(1):before {
          background-image: url("../../assets/imgs/zan.png");
          content: "";
          width: 20px;
          height: 20px;
          background-position: center center;
          background-repeat: no-repeat;
          display: inline-block;
          margin-bottom: -2px;
        }
      }
    }
  }
  .loading {
    background-color: #4b0;
    margin-top: 10px;
  }
}
</style>
