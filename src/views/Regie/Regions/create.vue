<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Ajouter une Region</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <form action="page-list-category.html" @submit.prevent="store" data-toggle="validator">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Libelle *</label>
                                            <input type="text" v-model="regions.libelle" class="form-control" placeholder="Entrer libelle" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>  
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Pays *</label>
                                            <select class="form-control" v-model="regions.country_id" name="" id="">
                                                <option v-for="(pi,index) in country" :key="index" :value="pi.id"> {{pi.libelle}}  </option>
                                            </select>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                          
                                </div>                            
                                <button type="submit" class="btn btn-primary mr-2">Enregistrer</button>
                                <button type="reset" class="btn btn-danger">reinitialiser</button>
                            </form>
                        </div>
                    </div>
                    <!-- <div class="vld-parent">
                        <loading :active.sync="isLoading" 
                        :can-cancel="true" 
                        :on-cancel="onCancel"
                        :is-full-page="fullPage"></loading>
                    </div> -->
                </div>
            </div>
            <!-- Page end  -->
        </div>
    </div>
</template>

<script>
import {URL_REGIE_API} from '@/config'
import axios from 'axios'
/* import loading from '@/vue-loading-overlay';
 */import 'vue-loading-overlay/dist/vue-loading.css';
 import Swal from 'sweetalert2'
export default {
    mounted(){
        this.getCountries()
    },
    data(){
        return{
            isLoading: false,
            fullPage: true,
            regions:{
                libelle:'',
                country_id:null
            },
            country:{}
        }
    },
    methods:{
        store: function(){
            this.isLoading = true
            axios.post(URL_REGIE_API+'regions', this.regions)
            .then(function (reponse){
                console.log('reponse', reponse.data)
                if (reponse.data.state) {
                    Swal.fire({
                        title: 'Modifié!',
                        text: 'La region a été créé avec succès.',
                        icon: 'success',
                        timer: 2000,
                        ShowConfirmButton: false
                    })
                    window.location.href = '/index-regie-regions'
                     
                }
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        getCountries(){
            let app = this
            axios.get(URL_REGIE_API+'countries')
            .then(function (reponse){
                console.log('reponse', reponse.data)
                app.country = reponse.data
                console.log('rep', app.country)
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        }
    }
}
</script>