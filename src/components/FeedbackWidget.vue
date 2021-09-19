<template>
  <v-container class="d-flex justify-center">

    <v-progress-circular
      :rotate="-90"
      :size="100"
      :width="15"
      :value="returnScore"
      color="primary"
    >
      <v-icon>{{returnScore == 100 ? 'mdi-check-all' : returnScore}}</v-icon>
    </v-progress-circular>
    <v-btn class="ma-10" @click="$emit('next')" color="primary" :disabled="returnScore != 100">New loop</v-btn>
  </v-container>
</template>

<script>
  export default {
    name: 'FeedbackWidget',


    data: function(){ return {}
    },
    props: {
      maxScore: {
        type: Number
      },
      startScore: {
        type: Number
      }
    },
    methods: {},

    computed: {
      returnScore(){
        return Math.round(this.startScore / this.maxScore * 100)
      },
    }
  }
</script>
