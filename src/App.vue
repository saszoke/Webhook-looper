<template>
  <v-app>
    
      <div class="logo-container d-flex flex-column mt-15">
        <v-img
          class="my-5 align-self-center"
          width="50%"
          src="https://page.topdesk.com/hubfs/2_Images/Logos/topdesk-logo.svg"
        ></v-img>
        <v-img class="align-self-end mr-15" src="../public/webhooklooper.jpg" width="25%"></v-img>
      </div>
      <v-main>

      <transition name="slide-fade" mode="out-in">
        <AuthWidget transition="scale-transition" v-if="step == 0" @next="receiveDataStep0" />
      
        <ExcelWidget transition="scale-transition" v-else-if="step == 1" @next="receiveDataStep1" @prev="step--" />

        <ConfirmWidget transition="scale-transition" v-else-if="step == 2" @next="receiveDataStep2" :excelMetaData="excelData" @prev="step--" />
      
        <FeedbackWidget transition="scale-transition" v-else-if="step == 3" @next="reset" :maxScore="Number(meta.data.length)" :failCounter="failCounter" :successCounter="successCounter" :reasons="reasons"/>
      </transition>

      <div class="text-center">
        <v-snackbar
          class="text-center mb-15"
          v-model="snackbar"
          text
          color="error"
        >
          {{ text }}

          <template v-slot:action="{ attrs }">
            <v-btn
              color="error"
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>
      
      </v-main>


  </v-app>
</template>

<script>
import AuthWidget from './components/AuthWidget';
import ExcelWidget from './components/ExcelWidget.vue';
import ConfirmWidget from './components/ConfirmWidget.vue';
import FeedbackWidget from './components/FeedbackWidget.vue';
import { postWebHook } from './plugins/webhook'

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
    successCounter: 0,
    failCounter: 0,
    reasons: [],
    snackbar: false,
    text: '',
  }),

  methods: {
    receiveDataStep0(e,params){
      this.options = params
      this.step++
    },
    receiveDataStep1(e,params){this.step
      this.excelData = params
      this.step++
    },
    receiveDataStep2(e, params){
      this.meta = params
      this.step++
      postWebHook({authData: this.options, metaData: this.meta})
    },

    postWebHook,

    success(){
      this.successCounter++
    },
    fail(reason){
      this.reasons.push({...reason, id: this.failCounter})
      this.failCounter++
    },
    reset(reason){
      this.step = 0
      this.successCounter = 0
      this.failCounter = 0
      this.meta = {}
      this.reasons = []

      if (reason){
        if (reason.reason == "fatal"){
          this.snackbar = true
          this.text = "Error occured while looping. Please check your excel file."
        }
      }
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