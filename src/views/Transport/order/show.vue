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
                                                <label>Prix *</label>
                                                <input type="number" min="0" v-model="order.total_amount" class="form-control" placeholder="" readonly>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>  
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Lieu d'utilisation *</label>
                                                <input type="text"  v-model="order.rent_location" class="form-control" placeholder="" readonly>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>  
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Date de la commande *</label>
                                                <input type="text" v-model="order.created_at" class="form-control" placeholder="" readonly>
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
                                    <button v-if="perms.includes('edit-car-orders')" type="submit" class="btn btn-primary mr-2">Modifier</button>
                                    <button v-if="perms.includes('edit-car-orders')" type="reset" class="btn btn-danger">reinitialiser</button>
                                </form>
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div class="col-lg-12">
                                    <div class="table-responsive rounded mb-3">
                                        <table class="data-table table mb-0 tbl-server-info">
                                            <thead class="bg-white text-uppercase">
                                                <tr class="ligth ligth-data">
                                                    <th>Produit</th>
                                                    <th>prix </th>
                                                    <th>Date depart</th>
                                                    <th>Date retour</th>
                                                    <th>Nb jour</th>
                                                    <th>prix total</th>
                                                    <th>Chauffeur</th>
                                                    <th v-if="perms.includes('edit-car-orders')">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody class="ligth-body">
                                                <tr v-for="(panier,index) in order.cart" :key="index">
                                                    <td>{{panier.car.libelle}}</td>
                                                    <td v-if="!panier.edit">{{panier.price}}</td>  
                                                    <td v-else> <input type="text" class="form-control" v-model="panier.price"> </td>
                                                    <td>{{panier.from}}</td>
                                                    <td>{{panier.to}}</td>
                                                    <td>{{panier.days}}</td>
                                                    <td> {{Number(panier.days*panier.price)}}</td>
                                                    <td v-if="panier.photo" @click="orderImage(panier.photo)"> Avec Chauffeur</td>
                                                    <td v-else > Sans chauffeur </td>
                                                    <td  v-if="perms.includes('edit-car-orders')">
                                                        <div v-if="!panier.edit" class="d-flex align-items-center list-action" >
                                                            <button class="badge bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"
                                                                @click="update(index)"><i class="ri-delete-bin-line mr-0"></i> Modifier</button>
                                                        </div>
                                                        <div v-else class="d-flex align-items-center list-action">
                                                            <button class="badge bg-success mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"
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
import {URL_TRANSPORT_API,URL_TRANSPORT} from '@/config'
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import Swal from 'sweetalert2'

import moment from 'moment';
moment.locale('fr');

export default {
    components: {
        Loading
    },
    data() {
        return {
            URL_TRANSPORT:URL_TRANSPORT,
            order:{},
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
        this.getorder()
    },
    methods:{
        store() {
            this.$router.push('/edit-transport-order/'+this.$route.params.id)
            
        },
        update(id){
            console.log(id)
            this.order.cart[id].edit = true
        },
        orderImage(path){
            Swal.fire({
                title: '',
                text: '',
                imageUrl: URL_TRANSPORT+path,
                imageAlt: 'Custom image',
            })
        },
        save(panier) {
            this.isLoading = true
            axios.put(URL_TRANSPORT_API+'order-car/'+panier.id,panier)
            .then(response => {
                console.log(response.data)
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
            axios.put(URL_TRANSPORT_API+'orders/'+this.$route.params.id,this.order)
            .then(response => {
                console.log(response.data)
                this.order = response.data
                if (response.data.state) {
                    Swal.fire(
                        'Operation Effectuée!',
                        'Commande modifié avec succès.',
                        'success'
                    )
                }
                
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
            
            axios.get(URL_TRANSPORT_API+'orders/'+this.$route.params.id)
            .then(response => {
                console.log('transport',response.data)
                response.data.data.cart.forEach(element => {
                    element.edit=false
                   element.to = moment(element.to).format("Do MMMM YYYY");
                   element.from = moment(element.from).format("Do MMMM YYYY");
                
                });
                this.order = response.data.data
                this.order.created_at = moment(response.data.data.created_at).format("Do MMMM YYYY H:m");
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