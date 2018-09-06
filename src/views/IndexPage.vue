<template>
  <div >
    <!-- 引导页部分 -->
    <div v-show="showGuide">
      <swiper  style="height:100% ;background: white;position: fixed;right: 0;top: 0;left: 0;bottom: 0;" :options="guideSwiperOption" ref="guideSwiper" >
         <swiper-slide v-for="(slide, index) in guideSlides" :key="index">I'm Slide qqqqqqqqqqqqq{{ slide }}</swiper-slide> 
       
      </swiper>
      <div style="position: fixed;right: 10px;bottom: 10px;z-index: 1;">
        <x-button  type="mini" @click.native="skipGuide" style="border-radius:99px; padding:1px 30px; background:rgba(199, 199, 199, 0.5)" >跳过</x-button>
      </div>
    </div>
  <!-- 主体部分 -->
    <div>
      <div>设备编号：12345678</div> 
      <div>设备状态：在线</div>
      <div>工作状态：空闲</div>
       <swiper   :options="itemSwiperOption" ref="itemSwiper" >
         <swiper-slide v-for="(slide, index) in itemSlides" :key="index">
            <div v-bind:style="{background:slide.color,color:'white', width:'100%'}">
              <div  style="text-align:center;height:200px;"> I'm Slide {{ slide.color }}</div>
            </div>
          </swiper-slide> 
          <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
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
      guideSwiperOption: {
      },
      guideSlides: ['212', 2, 3, 4, 5],

       itemSwiperOption: {
        effect: 'coverflow', //slide,fade,coverflow
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 3,
        coverflowEffect: {
          rotate: 10,//slide做3d旋转时Y轴的旋转角度。默认50。
          stretch: 0,//每个slide之间的拉伸值，越大slide靠得越紧。 默认0。
          depth: 30,//slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。
          modifier: 2,//depth和rotate和stretch的倍率，相当于depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。默认1。
          slideShadows : true//开启slide阴影。默认 true。
        },
        pagination: {
          //https://www.swiper.com.cn/api/pagination/70.html
          el: '.swiper-pagination',
          renderBullet: function(index, className) {
            switch (index) {
              case 0:
                  name = "洗";
                  break;
              case 1:
                  name = "剪";
                  break;
              case 2:
                  name = "烫";
                  break;
              case 3:
                  name = "染";
                  break;
              case 4:
                  name = "护";
                  break;
              case 5:
                  name = "套";
                  break;
              default:
                  name = ""
            }
            return '<span class="' +className + '"><i>' + name + "</i></span>"
          },
        },
        // autoplay: {
        //   delay: 3000
        // }
      },
      itemSlides: [{desc:212,color:'red'}, {desc:22,color:'green'}, {desc:33,color:'blue'}, {desc:44,color:'yellow'}, {desc:55,color:'purple'}],
     
    }
  },
   computed: {
      // swiper() {
      //   return this.$refs.guideSwiper.swiper
      // }
    },
  methods:{
    skipGuide(){
      this.showGuide = false;
    }
  },
  created() {
    this.showGuide = (this.$route.query.isNew == 1);
    if(this.$route.query.result != 0){
     
      return;
    }

    post.post('/member/detail').then(response => {
      var data = response.data.data;
      this.msg = this.$route.query.isNew + this.$route.query.result;
    
    }).catch(e => {
        console.log(e)
      })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
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

.swiper-pagination-bullet-active {
    color: #fff;
    background: #007aff;
}
.swiper-pagination .swiper-pagination-bullets >.swiper-pagination-bullet {
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    color: #000;
    opacity: 1;
    background: rgba(0,0,0,0.2);
}
  .swiper-pagination-bullet {
    width: 9.5%;
    float: left;
    margin: 0 0 0 6.15%;
    background: 0;
    opacity: 1;
}


#pagination {
	position: absolute;
	bottom: 100px;
	width: 100%
}

#pagination .swiper-pagination-bullet {
	width: 9.5%;
	float: left;
	margin: 0 0 0 6.15%;
	background: 0;
	opacity: 1
}

.swiper-pagination-bullet i {
	background: #41203f;
	width: 24px;
	height: 24px;
	line-height: 24px;
	font-size: 12px;
	border-radius: 50px;
	display: block;
	font-style: normal;
	text-align: center;
	margin: 0 auto;
	color: #f5b55c
}

.swiper-pagination-bullet-active i {
	-webkit-transform: scale(1.5);
	
	background-size: auto 100%;
	color: #815d4b
}



</style>
