<template>
  <div class="d-flex">

    <v-container class="d-flex justify-center">
      <v-progress-circular
        :rotate="-90"
        :size="100"
        :width="15"
        :value="returnScore"
        color="rgb(0 142 175)"
      >
        <v-icon>{{returnScore == 100 ? feedbackIcon : returnScore}}</v-icon>
      </v-progress-circular>
      <v-btn class="ma-10" @click="$emit('next')" color="rgb(194 69 48)" dark :disabled="returnScore != 100">New loop</v-btn>
    <v-btn class="ma-10" @click="feedbackDialog = true" color="rgb(0 142 175)" dark :disabled="returnScore != 100">Check results</v-btn>
    </v-container>


    <feedback-dialog :visible="feedbackDialog" :success="successCounter" :fail="failCounter" @close="feedbackDialog=false" :reasons="reasons" />
  </div>
</template>

<script>
  import feedbackDialog from './CheckWidget'
  export default {
    name: 'FeedbackWidget',
    components: { feedbackDialog },

    data: function(){ return {
        feedbackDialog: false,
      }
    },
    props: {
      maxScore: {
        type: Number
      },
      successCounter: {
        type: Number
      },
      failCounter: {
        type: Number
      },

      reasons: {
        type: Array
      }
    },
    methods: {},

    computed: {
      returnScore(){
        return Math.round((this.successCounter + this.failCounter) / this.maxScore * 100)
      },

      feedbackIcon(){
        return this.failCounter > 0 ? 'mdi-alert' : 'mdi-check-all'
      }
    }
  }
</script>
