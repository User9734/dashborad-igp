<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Ajouter une categorie</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <form action="page-list-category.html" @submit.prevent="store" data-toggle="validator">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Libelle *</label>
                                            <input type="text" v-model="carMarque.libelle" class="form-control" placeholder="Entrer libelle" required>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Description *</label>
                                            <input type="text" v-model="carMarque.description" class="form-control" placeholder="Entrer description" required>
                                            <div class="help-block with-errors"></div>
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
import {URL_TRANSPORT_API} from '@/config'
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
            carMarque:{},
            carMarquelist:[],
            isLoading: false,
            fullPage: true
        };
    },
    mounted(){
        this.getCarMarque()
    },

    methods:{
        store() {
            this.isLoading = true
            axios.put(URL_TRANSPORT_API+'car-marques/'+this.$route.params.id, this.carMarque)
            .then(response => {
                console.log(response.data)
                this.carMarque = response.data
                this.isLoading = false
                if (response.data.state) {
                    Swal.fire(
                        'Modifiée!',
                        'La categorie modifiée avec succès.',
                        'success'
                    )
                    this.$router.push('/transport-car-marques')
                     
                }
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        getCarMarque() {
            // this.isLoading = true
            console.log(this.$route.params.id)
            axios.get(URL_TRANSPORT_API+'car-marques/'+this.$route.params.id)
            .then(response => {
                console.log(response.data)
                this.carMarque = response.data
                this.isLoading = false
                if (response.data.state) {
                    this.$router.push('/transport-car-marques')
                }
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