<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Détails de commande</h4>
                            </div>
                        </div>
                        <div class="card-body">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Détails</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Produits</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <form action="page-list-category.html" @submit.prevent="updateOrder" data-toggle="validator">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Numero de commande *</label>
                                                <input type="text" v-model="order.order_number" class="form-control" placeholder="" readonly>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>status de la commande *</label>
                                                <select v-model="order.status" class="form-control" name="" id="">
                                                    <option value="new">Nouvelle commande</option>
                                                    <option value="process">En cours</option>
                                                    <option value="delivered">Commande livrée</option>
                                                    <option value="cancel">Annulé</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Coût Total *</label>
                                                <input type="number" min="0" v-model="order.total_amount" class="form-control" placeholder="" readonly>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>   
                                    </div>  
                                    <hr>
                                    <div class="row">
                                        
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Nom *</label>
                                                <input type="text" min="0" v-model="order.nom" class="form-control" placeholder="" readonly>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div> 
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Prenoms *</label>
                                                <input type="text" min="0" v-model="order.prenoms" class="form-control" placeholder="" readonly>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>    
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>email *</label>
                                                <input type="text" min="0" v-model="order.email" class="form-control" placeholder="" readonly>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Numero *</label>
                                                <input type="text" min="0" v-model="order.phone" class="form-control" placeholder="" readonly>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>                        
                                    </div>                            
                                    <button v-if="perms.includes('edit-order')" type="submit" class="btn btn-primary mr-2">Modifier</button>
                                    <button type="reset" class="btn btn-danger">reinitialiser</button>
                                </form>
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div class="col-lg-12">
                                    <div class="table-responsive rounded mb-3">
                                        <table class="data-table table mb-0 tbl-server-info">
                                            <thead class="bg-white text-uppercase">
                                                <tr class="ligth ligth-data">
                                                    <th>#</th>
                                                    <th>Categories</th>
                                                    <th>Produits</th>
                                                    <th>prix </th>
                                                    <th>quantité</th>
                                                    <th>color</th>
                                                    <th>prix total</th>
                                                    <th>Photo</th>
                                                    <th v-if="perms.includes('edit-order')">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody class="ligth-body">
                                                <tr v-for="(panier,index) in order.cart" :key="index">
                                                    <td>{{index+1}}</td>
                                                    <td>{{panier.product.type.libelle}}</td>
                                                    <td>{{panier.product.libelle}}</td>
                                                    <td v-if="!panier.edit">{{panier.price}}</td>  
                                                    <td v-else> <input type="text" class="form-control" v-model="panier.price"> </td>
                                                    <td>{{panier.quantity}}</td>
                                                    <td v-if="panier.color == 'undefined'">Pas de Couleur</td>
                                                    <td v-else>{{panier.color}}</td>
                                                    <td> {{Number(panier.quantity*panier.price)}}</td>
                                                    <td v-if="panier.photo" @click="orderImage(panier.photo)"> voir photo</td>
                                                    <td v-else>Pas de photo</td>
                                                    <td v-if="perms.includes('edit-order')">
                                                        <div v-if="!panier.edit" class="d-flex align-items-center list-action" >
                                                            <button class="btn bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"
                                                                @click="update(index)"><i class="ri-delete-bin-line mr-0"></i> Modifier</button>
                                                        </div>
                                                        <div v-else class="d-flex align-items-center list-action">
                                                            <button class="btn bg-success mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"
                                                                @click="save(panier)"><i class="ri-delete-bin-line mr-0"></i> enregistrer</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
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
import {URL_COMMERCE_API,URL_COMMERCE} from '@/config'
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
            URL_COMMERCE:URL_COMMERCE,
            order:{},
            isLoading: false,
            fullPage: true,
            user: this.$store.state.user,
            perms:[]
        };
    },
    
    mounted(){
        this.user.permissions.forEach(element => {
            this.perms.push(element.name)
        });

        this.getorder()
    },
    methods:{
        store() {
            this.$router.push('/edit-e-commerce-order/'+this.$route.params.id)
            
        },
        update(id){
            console.log(id)
            this.order.cart[id].edit = true
        },
        orderImage(path){
            Swal.fire({
                title: '',
                text: '',
                imageUrl: URL_COMMERCE+path,
                imageAlt: 'Custom image',
            })
        },
        save(panier) {
            this.isLoading = true
            axios.put(URL_COMMERCE_API+'order-product/'+panier.id,panier)
            .then(response => {
                if (response.data.state) {
                    Swal.fire(
                        'Operation Effectuée!',
                        'Panier modifié avec succès.',
                        'success'
                    )
                }
                this.getorder()
                this.order = response.data
                this.isLoading = false
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        updateOrder() {
            this.isLoading = true
            axios.put(URL_COMMERCE_API+'orders/'+this.$route.params.id,this.order)
            .then(response => {
                console.log(response.data)
                if (response.data.state) {
                    Swal.fire(
                        'Operation Effectuée!',
                        'Commande modifié avec succès.',
                        'success'
                    )
                }
                
                this.order = response.data
                this.isLoading = false
                this.getorder()
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        getorder() {
            this.isLoading = true
            
            axios.get(URL_COMMERCE_API+'orders/'+this.$route.params.id)
            .then(response => {
                console.log(response.data)
                
                response.data.cart.forEach(element => {
                    element.edit=false
                });
                this.order = response.data
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