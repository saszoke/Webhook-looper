<template>
  <v-container>
    <div class="wrapper d-flex justify-space-between">
      <div class="action-wrapper">
        <v-combobox
            v-model="excelMetaData.selects"
            :items="excelMetaData.fields"
            label="Fields to be sent through"
            multiple
            chips
        ></v-combobox>
        <v-btn @click="loopNfeedback($event)" color="rgb(0 142 175)" dark>Loop!</v-btn>
        <v-btn @click="$emit('prev')" transition="scale-transition" class="mx-5">Back</v-btn>
      </div>
      <div class="info-wrapper">
        <v-alert
          class="info-alert"
          dense
          outlined
          color="rgb(0 142 175)"
          min-height="200"
          max-height="300"
          style="white-space: pre-line"
          overflow
        >
          {{ prettyPreview }}
        </v-alert>
      </div>
    </div>
  </v-container>
</template>

<script>
  export default {
    name: 'ConfirmWidget',
    props: {
      excelMetaData: { type: Object }
    },

    data: () => ({
      preview: null
    }),

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
    },

    mounted(){
      this.preview = this.excelMetaData
    },

    computed: {
      prettyPreview(){
        let final = ''
        
        try{
          Object.values(this.preview.selects).forEach(element => {
            final += element + ': ' + '"' + this.preview.data[0][element] + '"' + ',\n'
          });
        } catch {()=>{}}

        return final
      }
    }
  }
</script>

<style scoped>
.info-wrapper{
  margin-left: 1%;
  width: 50%;
}

.action-wrapper{
  margin-right: 1%;
  width: 50%;
}

.info-alert{
  overflow-x: auto;
}
</style>