<template>
  <v-container>
    <v-form
              v-model="stepOneDone"
            >
              <v-text-field 
                label="Webhook URL" 
                v-model="URL"
                :rules="URLrules"
                ></v-text-field>
              <v-text-field
                label="API username"
                :rules="rules"
                hide-details="auto"
                v-model="apiUser"
              ></v-text-field>
              <v-text-field 
                label="Application password" 
                v-model="apiPassword"
                :rules="PWrules"
                ></v-text-field>
            </v-form>
          <v-btn
            color="rgb(0 142 175)"
            :dark="stepOneDone"
            :disabled="!stepOneDone"
            @click="()=>{
              $emit('next', event, {URL,apiUser,apiPassword} )
            }"
            
          >
            Continue
          </v-btn>
  </v-container>
</template>

<script>

  export default {
    name: 'AuthWidget',

    data: () => ({
      apiUser: '',
      apiPassword: '',
      stepOneDone: false,
      URL: '',
      event: '',
      rules: [
          value => !!value || 'Required.',
          value => (value && value.length >= 3) || 'Min 3 characters',
        ],
        URLrules: [
          value => !!value || 'Required.',
          value => (value && value.includes("https://") && value.includes("/services/action-v1/api/webhooks/")) || 'Invalid URL',
        ],
        PWrules: [
          value => !!value || 'Required.',
          value => (value && value.length == 29) || 'valid Application Password',
        ],
    }),

    methods: {
      
      resetState(){
        this.apiUser = ''
        this.apiPassword = ''
        this.URL = ''
      }

    }
  }
</script>
