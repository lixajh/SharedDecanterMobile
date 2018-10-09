<template>
  <div >
    <!-- 引导页部分 -->
    <div v-show="showGuide">
      <swiper  style="height:100% ;background: white;position: fixed;right: 0;top: 0;left: 0;bottom: 0;" :options="guideSwiperOption" ref="guideSwiper" >
         <swiper-slide v-for="(slide, index) in guideSlides" :key="index" :style="{background:slide.color,color:'white', width:'100%'}">I'm Slide qqqqqqqqqqqqq{{ slide.content }}</swiper-slide> 
       
      </swiper>
      <div style="position: fixed;right: 10px;bottom: 10px;z-index: 1;">
        <x-button  type="mini" @click.native="skipGuide" style="border-radius:99px; padding:1px 30px; background:rgba(199, 199, 199, 0.5)" >跳过</x-button>
      </div>
    </div>
  <!-- 主体部分 -->
    <div v-show="!showGuide">
      <!-- <x-header :left-options="{showBack: false}" :right-options="{showMore: true}" @on-click-more="showMenus = true">选择使用模式  </x-header> -->
      <x-header :left-options="{showBack: false}"  @on-click-more="menuclick" >选择使用模式 <a  slot="right"><div @click="menuclick">...</div></a> </x-header>
      <div>
        <div style="position: absolute; right: 0;">设备状态：在线</div>
        <div style="position: relative; ">设备编号： {{ deviceCode }}</div>
        <div style="position: relative; top: 0px;">工作状态：空闲</div>
      </div>
       <swiper   :options="itemSwiperOption" ref="itemSwiper" @tap='itemTap' style="margin-top:40px">
         <swiper-slide v-for="(slide, index) in itemSlides" :key="index" >
            <div v-bind:style="{background:slide.color,color:'white', width:'100%'}">
              <div  style="text-align:center;height:270px;"> 售价 {{ slide.price }} 元</div>
            </div>
          </swiper-slide> 
          <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <x-button action-type="button" type="primary"  @click.native="pay"  style="border-radius:23px; margin-top:20px; width:250px; background-color: #1AAD19">立即支付</x-button>
      <x-button action-type="button" type="primary"  @click.native="pay"  style="border-radius:23px; margin-top:20px; width:250px; background-color: #1AAD19">扫码设备</x-button>

    </div>

     <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenus" show-cancel></actionsheet>
    </div>
  </div>
</template>

<script>
import post from '../common/request/request'
import 'swiper/dist/css/swiper.css'
// import store from '@/store'
import { mapState } from 'vuex'
import { swiper, swiperSlide} from 'vue-awesome-swiper'
import{XButton,XHeader,Actionsheet } from 'vux'
import {getMemberDetail} from '@/api/member'
import {getDeviceDetailByCode,getPayInfo} from '@/api/device'
export default {
  name: 'HelloWorld',
  components: {
    swiper,
    swiperSlide,
    XButton,
    Actionsheet,
    XHeader
  },
  data () {
    return {
      showGuide: false,
      deviceCode: 'aaa',
      device: {},
       menus: {
        menu1: '历史订单',
        menu2: '红酒百科'
      },
      showMenus: false,

      guideSwiperOption: {
        centeredSlides: true,
      },
      guideSlides: [{content:'212',color:'green'}, {content:'dfsdf',color:'blue'}, {content:'sdfc',color:'red'}, {content:'sd',color:'grey'}],

       itemSwiperOption: {
        
        effect: 'coverflow', 
        grabCursor: true,
        slidesPerView: 2,
        loop : true,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 30,//slide做3d旋转时Y轴的旋转角度。默认50。
          stretch: 0,//每个slide之间的拉伸值，越大slide靠得越紧。 默认0。
          depth: 60,//slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。
          modifier: 1,//depth和rotate和stretch的倍率，相当于depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。默认1。
          slideShadows : true//开启slide阴影。默认 true。
        },
        pagination: {
          //https://www.swiper.com.cn/api/pagination/70.html
          el: '.swiper-pagination',
          clickable :true,
          renderBullet: (index, className)=> {
            var name = this.itemSlides[index].price
            return '<span class="' +className + '"><i>¥' + name + "</i></span>"
          },
        },
      },
      itemSlides: [{desc:212,color:'red',price:1}, {desc:22,color:'green',price:3}, {desc:33,color:'blue',price:4}, {desc:44,color:'yellow',price:6}, {desc:55,color:'purple',price:15}],
     
    }
  },
   computed: {
      swiper() {
        return this.$refs.guideSwiper.swiper
      },
      ...mapState({
        userInfo: state => state.vux_store.userInfo
      })
    },
  methods:{
    menuclick(){
      this.showMenus = true;
    },
    skipGuide(){
      this.showGuide = false;
    },
    itemTap(event){
       console.log('你碰了Swiper' + event);
    },
    getDeviceDetail(){
      getDeviceDetailByCode(this.deviceCode).then(response => {
      this.device = response.data.data.device;
    
      }).catch(e => {
        console.log(e)
      })
    },

    payByAlipay(payNo) {
      // 如果jsbridge已经注入则直接调用
        AlipayJSBridge.call("tradePay", {tradeNO: payNo}
        , function(result) {
            alert(JSON.stringify(result));
            if(result.resultCode == '9000'){
              //订单支付成功;
              this.$router.push({ name: 'working', params: { userId: 'sss' }})
            }
          });
      
    },

    pay(productId){

      this.$router.push({ name: 'working', params: { userId: 'sss' }})
      // getPayInfo('1',this.device.pkId).then(response => {
      //   if (!window.AlipayJSBridge) {
      //     // alert('支付宝正在初始化，请稍后再试')
      //     this.$vux.toast.show({text: '支付宝正在初始化，请稍后再试'})
      //     return;
      // }
      //   var data = response.data.data;
      //   // if(this.userInfo.)
      //   this.payByAlipay(data.transactionNo)
       
      // }).catch(e => {
      //   console.log(e)
      // })
       
    }
  },
  created() {
    
    this.showGuide = (this.$route.query.isNew == 1);
   
    this.deviceCode = this.$route.query.deviceId;
   
    if(this.$route.query.result != 0){
     
      return;
    }
    //获取本人信息
    getMemberDetail().then(response => {
      var data = response.data.data;
      this.$store.commit('updateUserInfo', data)
    }).catch(e => {
        console.log(e)
    })

    if(this.deviceCode != null && this.deviceCode != ''){
      //设备code不为空获取设备信息
      this.getDeviceDetail()
    }
   
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

html,body{
    height: 100%;
    width: 100%;
}

body{
  height: 100%;
	background: url(../assets/red_wine_blur_bg.png) center center fixed no-repeat ;
  background-size:cover;
  
}

#app{
   height: 100%;
   color: white
} 

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

.swiper-wrapper{
  margin-bottom: 60px;
}

.swiper-pagination .swiper-pagination-bullets {
  text-align: center;
	
}

.swiper-pagination .swiper-pagination-bullets > .swiper-pagination-bullet {
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
    height: 28px;
    margin: 0 0 0 6.15%;
    background: 0;
    opacity: 1;
}

.swiper-pagination-bullet i {
	background: #41203f;
	width: 30px;
	height: 30px;
	line-height: 30px;
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
  transform: scale(1.5);
	background-size: auto 100%;
	color: #815d4b
}

.swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: 15px;
    left: 0;
    width: 100%;
}

</style>
