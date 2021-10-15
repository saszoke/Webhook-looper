<template>
  <v-container>
    <v-file-input label=".xlsx file" v-model="file" transition="scale-transition"></v-file-input>
    <v-btn @click="readInput($event,file)" transition="scale-transition" color="rgb(0 142 175)" dark :loading="load">Read</v-btn>
    <v-btn @click="$emit('prev')" transition="scale-transition" class="mx-5">Back</v-btn>
  </v-container>
</template>

<script>
  import { readXLSx } from '../plugins/inputReadService'
  export default {
    name: 'ExcelWidget',

    data: () => ({
      file: null,
      jsonData: [],
      fields: [],
      select: [],
      load: false
    }),

    props: ['someProp'],

    methods: {
      async readInput(e,file){
        if (file != null) this.load = true
        this.jsonData = await readXLSx(file)
        Object.keys(this.jsonData[0]).forEach(key => {
          this.fields.push(key)
          this.select.push(key)
        })
        this.$emit('next', e, {'data': this.jsonData, 'fields': this.fields, 'selects': this.select})
        this.load = false
      },

      resetState(){
        this.file = null
        this.fields = []
        this.select = []
      },

    }
  }
</script>
