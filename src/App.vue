<template>
  <v-app>
    
  
      <div style="height: 20%; width: 100%; background: url('https://page.topdesk.com/hubfs/2_Images/Logos/topdesk-logo.svg') no-repeat center; margin-top: 5%">

      </div>
      <v-main class="mt-15 transParent">
<!-- 
        <AuthWidget transition="scale-transition" v-if="step == 0" @next="receiveDataStep0" class="4trans"/>
        <ExcelWidget transition="scale-transition" v-if="step == 1" @next="receiveDataStep1" @prev="step--" class="4trans"/> -->

      <transition name="slide-fade" mode="out-in">
        <AuthWidget transition="scale-transition" v-if="step == 0" @next="receiveDataStep0" class="fortrans"/>
      
        <ExcelWidget transition="scale-transition" v-else-if="step == 1" @next="receiveDataStep1" @prev="step--" class="fortrans"/>

        <ConfirmWidget transition="scale-transition" v-else-if="step == 2" @next="receiveDataStep2" :excelMetaData="excelData" @prev="step--" class="fortrans"/>
      
        <FeedbackWidget transition="scale-transition" v-else-if="step == 3" @next="reset" :maxScore="Number(meta.data.length)" :startScore="initValue" class="fortrans" />
      </transition>
      
      </v-main>


  </v-app>
</template>

<script>
import AuthWidget from './components/AuthWidget';
import ExcelWidget from './components/ExcelWidget.vue';
import ConfirmWidget from './components/ConfirmWidget.vue';
import FeedbackWidget from './components/FeedbackWidget.vue';
import { postWebHook } from './plugins/webhook'
// TODO: JSON body , feedback pipa , hiba, név, Webhook LoopR, 
export default {
  name: 'App',


  components: {
    AuthWidget,
    ExcelWidget,
    ConfirmWidget,
    FeedbackWidget,
  },

  data: () => ({
    step: 0,
    options: {},
    meta: {},
    initValue: 0
  }),

  methods: {
    receiveDataStep0(e,params){
      this.options = params
      this.step++
    },
    receiveDataStep1(e,params){
      this.excelData = params
      this.step++
    },
    receiveDataStep2(e, params){
      this.meta = params
      this.step++
      postWebHook({authData: this.options, metaData: this.meta})
    },

    postWebHook,

    add(){
      this.initValue++
    },
    reset(){
      this.step = 0
      this.initValue = 0
      this.meta = {}
    }
  }
};
</script>

<style>
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .5s ease;
}
.slide-fade-enter, .slide-fade-leave-to{
  opacity: 0;
  transform: translateX(10%);
}


</style>