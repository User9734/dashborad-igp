<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Modifier un model</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <form action="page-list-category.html" @submit.prevent="store" data-toggle="validator">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Libelle *</label>
                                            <input type="text" v-model="product.libelle" class="form-control" placeholder="Entrer libelle" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Marque *</label>
                                            <select class="form-control" v-model="product.car_marque_id" name="" id="">
                                                <option v-for="cat in categories" :key="cat.id" :value="cat.id"> {{cat.libelle}}  </option>
                                            </select>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>  
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Description *</label>
                                            <input type="text" v-model="product.description" class="form-control" placeholder="Entrer description" required>
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
            product:{},
            productlist:[],
            categories:[],
            isLoading: false,
            fullPage: true
        };
    },
    mounted(){
        this.getCarModels()
        this.getMarques()
    },

    methods:{
        getMarques() {
            this.isLoading = true
            axios.get(URL_TRANSPORT_API+'car-marques')
            .then(response => {
                console.log(response.data)
                this.categories = response.data
                this.isLoading = false
               
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        store() {
            this.isLoading = true
            axios.put(URL_TRANSPORT_API+'car-models/'+this.$route.params.id, this.product)
            .then(response => {
                console.log(response.data)
                this.product = response.data
                this.isLoading = false
                if (response.data.state) {
                    Swal.fire(
                        'Modifiée!',
                        'La categorie modifiée avec succès.',
                        'success'
                    )
                    this.$router.push('/transport-car-models')
                     
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
            axios.get(URL_TRANSPORT_API+'car-models/'+this.$route.params.id)
            .then(response => {
                console.log(response.data)
                this.product = response.data
                this.isLoading = false
                if (response.data.state) {
                    this.$router.push('/e-commerce-car-models')
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