<template>
 <div id='broadcast'>
broadcast
 </div>
</template>

<script>
import { getBroadcastListData } from "@/api";
export default {
  data() {
    return {
      listArr: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      //获取广播列表数据
      getBroadcastListData().then(res => {
        this.listArr.push(...res.data.items);
        console.log(this.listArr);
      });
    }
  },
  components: {}
};
</script>

<style>
</style>
