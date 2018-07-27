<template>
 <div id='layout'>
   <!-- 导航 -->
   <div class="nav">
      <router-link to="/">
          <h1>
            豆瓣
          </h1>
      </router-link>
      <ul>
        <li >
          <router-link to="/movie" style="color: #2384E8;">电影</router-link>
        </li>
        <li>
          <router-link to="/book" style="color: #9F7860;">图书</router-link>
        </li>
        <li>
          <router-link to="broadcast" style="color: #E4A813;">广播</router-link>
        </li>
        <li>
          <router-link to="/login" style="color: #2AB8CC;">登录</router-link>
        </li>
        <li>
          <router-link to="search">
            <img src="../assets/imgs/search.png" alt="">
          </router-link>
        </li>
      </ul>
   </div>
   <router-view></router-view>
 </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang="scss">
#layout {
  padding-top: 50px;
  .nav {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 50px;
    border-bottom: 1px solid #ccc;
    position: fixed;
    top: 0;
    z-index: 10;
    background-color: #fff;
    h1 {
      color: #00b600;
    }
    ul {
      display: flex;
      flex-direction: row;
      align-items: center;
      li {
        padding: 0 10px;
        img {
          margin-top: 10px;
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
</style>
