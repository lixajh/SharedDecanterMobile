<template>
<div>
  <x-header :left-options="{backText: ''}" >设备工作中</x-header>
  <lottie :options="defaultOptions" :height="200" :width="200" v-on:animCreated="handleAnimation"/>
  <p>开始时间：2018-09-10 22:23:23</p>
  <p>结束时间：2018-09-10 22:33:23</p>
  <button v-on:click="stop">stop</button>
        <button v-on:click="pause">pause</button>
        <button v-on:click="play">play</button>
  </div>
</template>

<script>
import * as animationData from "../assets/lottie/pink_drink_machine.json";
import lottie from 'vue-lottie';
import{XButton,XHeader } from 'vux'
export default {
  components: {
    lottie,
    XHeader,
    XButton
  },
  name: 'HelloWorld',
  data () {
    return {
      defaultOptions: {animationData: animationData},
      animationSpeed: 1,
      anim: {},

    }
  },
  methods:{
    handleAnimation: function(anim) {
      this.anim = anim;
      console.log(anim); //这里可以看到 lottie 对象的全部属性
    },
    stop: function () {
        this.anim.stop();
      },

      play: function () {
        this.anim.play();
      },

      pause: function () {
        this.anim.pause();
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
