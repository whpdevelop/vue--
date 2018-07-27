<template>
 <div id='book'>
   <swiper-list v-for="(item,index) in types" :key="index"  :type="item"></swiper-list>
 </div>
</template>
<script>
// import {getBookData} from '@/api'
import swiperList from "@/components/common/swiperList";
export default {
  data() {
    return {
      types: [
        "book_fiction",
        "book_nonfiction",
        "market_product_book_mobile_web"
      ]
    };
  },
  created() {},
  methods: {
    init() {
      // getBookData('/subject_collection/${}/items')
    }
  },
  components: {
    swiperList
  }
};
</script>

<style>
</style>
