<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <div v-show="showGuide">
      <swiper  style="height:100% ;background: white;position: fixed;right: 0;top: 0;left: 0;bottom: 0;" :options="swiperOption" ref="mySwiper" >
         <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">I'm Slide {{ slide }}</swiper-slide> 
       
      </swiper>
      <div style="position: fixed;right: 10px;bottom: 10px;z-index: 1;">
        <x-button  type="mini" @click.native="skipGuide" style="border-radius:99px; padding:1px 30px; background:rgba(199, 199, 199, 0.5)" >跳过</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import post from '../common/request/request'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide} from 'vue-awesome-swiper'
import{XButton } from 'vux'
export default {
  name: 'HelloWorld',
  components: {
    swiper,
    swiperSlide,
    XButton
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      showGuide: false,
      swiperOption: {
        // effect: 'coverflow', //slide,fade,coverflow
        // grabCursor: true,
        // centeredSlides: true,
        // slidesPerView: 3,
        // coverflowEffect: {
        //   rotate: 30,
        //   stretch: 10,
        //   depth: 60,
        //   modifier: 2,
        //   slideShadows : true
        // },
        // pagination: {
        //   el: '.swiper-pagination'
        // },
        // autoplay: {
        //   delay: 3000
        // }
      },
      swiperSlides: ['212', 2, 3, 4, 5],
     
    }
  },
   computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
  methods:{
    skipGuide(){
      this.showGuide = false;
    }
  },
  created() {
    this.showGuide = (this.$route.query.isNew == 1);
    if(this.$route.query.result != 0){
      //登录失败
      return;
    }

    post.post('/member/detail').then(response => {
      console.log(response)
      var data = response.data.data;
      this.msg = this.$route.query.isNew + this.$route.query.result;
    
    }).catch(e => {
        console.log(e)
      })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
