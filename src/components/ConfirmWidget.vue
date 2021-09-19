<template>
  <v-container>
    <div class="wrapper">
      <v-combobox
          v-model="excelMetaData.selects"
          :items="excelMetaData.fields"
          label="Fields to be sent through"
          multiple
          chips
        ></v-combobox>
        <v-btn @click="loopNfeedback($event)" color="primary">Loop!</v-btn>
        <v-btn @click="$emit('prev')" transition="scale-transition" class="mx-5">Back</v-btn>
    </div>
  </v-container>
</template>

<script>
  export default {
    name: 'ConfirmWidget',
//postWebHook(URL, jsonData, select)
    props: {
      excelMetaData: { type: Object }
    },

    data: () => ({}),

    methods: {

      resetState(){
        this.file = null
        this.fields = []
        this.select = []
        this.percent = 0
      },

      loopNfeedback(e){
        this.$emit('next', e, this.excelMetaData)

      },
      // init() { 
      //   this.jsonData = this.excelMetaData.data
      //   this.fields = this.excelMetaData.fields
      //   this.select = this.excelMetaData.selects
      // },
    },

    watch: {
      excelMetaData: function(new_value) { 
        // this.init()
        console.log('watch did something for me')
        
      }
    }
  }
</script>
