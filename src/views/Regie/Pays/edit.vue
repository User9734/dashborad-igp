<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Modifier un pays</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <form action="page-list-category.html" @submit.prevent="store" data-toggle="validator">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Libelle *</label>
                                            <input type="text" v-model="pays.libelle" class="form-control" placeholder="Entrer libelle" required>
                                        </div>
                                    </div>
                                    
                                                                    
                                </div>                            
                                <button type="submit" class="btn btn-primary mr-2">Enregistrer</button>
                                <button type="reset" class="btn btn-danger">reinitialiser</button>
                            </form>
                        </div>
                    </div>
                    <div class="vld-parent">
                        <loading :active.sync="isLoading" 
                        :can-cancel="true" 
                        :is-full-page="fullPage"></loading>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import {URL_REGIE_API} from '@/config'
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

import Swal from 'sweetalert2'
export default {
    components: {
            Loading
    },
    data() {
        return {
            pays:{},
            categories:[],
            isLoading: false,
            fullPage: true
        };
    },
    mounted(){
        this.getPays()
    },

    methods:{
        store() {
            this.isLoading = true
            axios.put(URL_REGIE_API+'countries/'+this.$route.params.id, this.pays)
            .then(response => {
                console.log(response.data)
                this.pays = response.data
                this.isLoading = false
                if (response.data.state) {
                    Swal.fire(
                        'Modifié!',
                        'Le pays a été modifié avec succès.',
                        'success'
                    )
                    this.$router.push('/index-regie-pays')
                     
                }
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        getCarModels() {
            // this.isLoading = true
            console.log(this.$route.params.id)
            axios.get(URL_REGIE_API+'countries/'+this.$route.params.id)
            .then(response => {
                console.log(response.data)
                this.pays = response.data
                this.isLoading = false
                /* if (response.data.state) {
                    this.$router.push('/index-regie-pays')
                } */
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
    }
}
</script>