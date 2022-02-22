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
                                            <input type="text" v-model="product.libelle" class="form-control" placeholder="Entrer libelle" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Categorie parent </label>
                                            <select class="form-control" v-model="product.parent_id" name="" id="">
                                                <option :value="0">Selectionner le parent </option>
                                                <option v-for="cat in categories" :key="cat.id" :value="cat.id"> {{cat.libelle}}  </option>
                                            </select>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>  
                                    <div class="col-md-6">
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Description </label>
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
                        :on-cancel="onCancel"
                        :is-full-page="fullPage"></loading>
                    </div>
                </div>
            </div>
            <!-- Page end  -->
        </div>
    </div>
</template>
<script>
import axios from "axios";
import {URL_COMMERCE_API} from '@/config'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Swal from 'sweetalert2'
export default {
    components: {
            Loading
    },
    data() {
        return {
            product:{},
            categories:[],
            isLoading: false,
            fullPage: true
        };
    },
    mounted(){
        this.getCategorie()
    },
    methods:{

        store() {
            this.isLoading = true
            axios.post(URL_COMMERCE_API+'product-types', this.product)
            .then(response => {
                
                console.log(response.data)
                this.product = response.data
                this.isLoading = false
                
                if (response.data.state) {
                    Swal.fire(
                        'Effectué!',
                        'La categorie a été ajoutée avec succès.',
                        'success'
                    )
                    this.$router.push('/e-commerce-product-types')
                }
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        getCategorie() {
            this.isLoading = true
            axios.get(URL_COMMERCE_API+'product-types')
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
    }
}
</script>