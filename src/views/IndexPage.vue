<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <!-- <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul> -->
    <swiper style="height:100px" :options="swiperOption" ref="mySwiper" >
       <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">I'm Slide {{ slide }}</swiper-slide>
        
      </swiper>
      
  </div>
</template>

<script>
import post from '../common/request/request'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'HelloWorld',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isNewMember: false,
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

  created() {

    this.isNewMember = this.$route.query.isNew ;
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
