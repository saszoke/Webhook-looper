<template>
    <v-dialog
        v-model="show"
        max-width="400"
    >
        <v-card>
            <v-card-title class="text-h5">
            Results
            </v-card-title>

            <v-card-text>
            <v-alert
                :color="fail > 0 ? 'error' : 'info'"
                text
                class="white"
            >
                <h2 class="black--text mb-5">Succesful iterations: {{ success }}</h2>
                <h2 class="black--text mb-5">Failed iterations: {{ fail }}</h2>
                <v-divider
                    class="my-4 black"
                    style="opacity: 0.22"
                ></v-divider>
                <div v-show="fail > 0">
                    <h3 class="black--text mb-5">Reasons:</h3>
                    <v-divider
                    class="my-4 black"
                    style="opacity: 0.22"
                    ></v-divider>
                    <div v-for="reason in reasons" :key="reason.id">
                        <div class="black--text">
                            Iteration {{reason.id+1}}.: {{reason.status}}
                            
                            <v-tooltip right v-if="fail > 0">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                v-bind="attrs"
                                v-on="on"
                                icon
                                class="mb-1"
                                >
                                <v-icon
                                    color="black lighten-1"
                                    
                                >
                                    mdi-information-outline
                                </v-icon>
                                </v-btn>
                            </template>
                            <span>{{reason.statusText}}</span>
                            </v-tooltip>
                        </div>

                        <v-divider
                            class="my-4 black"
                            style="opacity: 0.22"
                        ></v-divider>
                    </div>
                </div>
            </v-alert>

            </v-card-text>

            <v-card-actions>

            <v-btn
                text
                @click="show = false"
            >
                Close
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>



<script>
export default {
    name: 'CheckWidget',
    props: ['visible', 'results', 'success', 'fail', 'reasons'],

    data: () => ({}),
    computed: {
        show: {
            get () {
                return this.visible
            },
            set (value) {
                if (!value) {
                    this.$emit('close')
                }
            }
        }
    },

    methods: {},
    }
</script>