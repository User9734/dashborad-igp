<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Details d'un type de vehicule</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <form action="page-list-category.html" @submit.prevent="update" data-toggle="validator">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Libelle *</label>
                                            <input type="text" v-model="product.libelle" class="form-control" placeholder="Entrer libelle" readonly>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Type parent *</label>
                                            <select class="form-control" v-model="product.parent_id" name="" id="" readonly>
                                                <option v-for="cat in categories" :key="cat.id" :value="cat.id"> {{cat.libelle}}  </option>
                                            </select>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Description *</label>
                                            <input type="text" v-model="product.description" class="form-control" placeholder="Entrer description" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                                 
                                </div>                            
                                <button v-if="perms.include('edit-car-type')" type="submit" class="btn btn-primary mr-2">Modifier</button>
                                <button v-if="perms.include('edit-car-type')" type="reset" class="btn btn-danger">Reinitialiser</button>
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
import {URL_TRANSPORT_API} from '@/config'
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
            categories:[],
            isLoading: false,
            user: this.$store.state.user,
            perms:[],
            fullPage: true
        };
    },
    mounted(){
        this.user.permissions.forEach(element => {
            this.perms.push(element.name)
        });
        this.getProductType()
        this.getCategorie()
    },

    methods:{
        getCategorie() {
            this.isLoading = true
            axios.get(URL_TRANSPORT_API+'car-types')
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
        getProductType() {
            this.isLoading = true
            axios.get(URL_TRANSPORT_API+'car-types/'+this.$route.params.id)
            .then(response => {
                
                console.log(response.data)
                this.product = response.data
                this.isLoading = false
                if (response.data.state) {
                    this.$router.push('/transport-car-types')
                }
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        update(){
            this.$router.push('/edit-transport-car-type/'+this.$route.params.id)
        }
    }
}
</script>