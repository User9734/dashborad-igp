<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Ajouter un Product</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <form action="page-list-category.html" @submit.prevent="store" data-toggle="validator">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Libelle *</label>
                                            <input type="text" v-model="product.libelle" class="form-control" placeholder="Entrer libelle" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Categorie *</label>
                                            <select v-model="product.product_type_id" class="form-control">
                                                <option v-for="(product,index) in productlist" :key="index" :value="product.id"> {{product.libelle}} </option>
                                            </select>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Prix *</label>
                                            <input type="number" min="0" v-model="product.price" class="form-control" placeholder="Entrer adresse" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>     
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Stock *</label>
                                            <input type="text" min="0" v-model="product.stock" class="form-control" placeholder="Entrer adresse" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div> 
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Photo *</label>
                                            <input type="file" ref="photo" class="form-control" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>   
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Description *</label>
                                            <input type="text"  v-model="product.description" class="form-control" placeholder="Entrer adresse" required>
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
            <!-- Page end  -->
        </div>
    </div>
</template>
<script>
import axios from "axios";
import {URL_COMMERCE_API} from '@/config'
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
    components: {
            Loading
    },
    data() {
        return {
            product:{},
            productlist:[],
            isLoading: false,
            fullPage: true
        };
    },
    mounted(){
        this.getProductType()
    },
    methods:{
        store() {

            console.log('Check',this.product)

            this.isLoading = true
            var productData = new FormData();
            let photo = this.$refs.photo.files
            console.log(photo)
            for( var i = 0; i < photo.length; i++ ){
                let file = photo[i];
                productData.append('photo[' + i + ']', file);
            }
            productData.append('libelle',this.product.libelle)
            productData.append('stock',this.product.stock)
            productData.append('slug',this.product.slug)
            productData.append('description',this.product.description)
            productData.append('price',this.product.price)
            productData.append('product_type_id',this.product.product_type_id)

            axios.post(URL_COMMERCE_API+'products', productData)
            .then(response => {
                console.log(response.data)
                this.product = response.data
                this.isLoading = false
                if (response.data.state) {
                    this.$router.push('/e-commerce-products')
                }
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        getProductType(){
            axios.get(URL_COMMERCE_API+'product-types')
            .then(response => {
                this.productlist = response.data
                this.isLoading = false
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