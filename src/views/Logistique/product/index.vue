<template>
    <div class="content-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex flex-wrap align-items-center justify-content-between mb-4">
                        <div>
                            <h4 class="mb-3">Liste des Produits</h4>
                            <p class="mb-0">Use category list as to describe your overall core business from the provided list. <br>
                            Click the name of the category where you want to add a list item. .</p>
                        </div>
                        <router-link to="/create-logistique-product" class="btn btn-primary add-list" v-if="perms.includes('create-event-product')"><i class="las la-plus mr-3"></i> Ajouter un produit </router-link>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="table-responsive rounded mb-3">
                    <table id="example" class="data-table table mb-0 tbl-server-info">
                        <thead class="bg-white text-uppercase">
                            <tr class="ligth ligth-data">
                                <th>Libelle</th>
                                <th>Prix</th>
                                <th>Stocks</th>
                                <th>Categories</th>
                                <th v-if="perms.includes('delete-event-product') || perms.includes('edit-event-product') || perms.includes('show-event-product')">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="ligth-body">
                            <tr v-for="(product,index) in products" :key="index">
                                <td>{{product.libelle}}</td>
                                <td>{{product.price}}</td>   
                                <td>{{product.stock}}</td>
                                <td>{{product.type.libelle}}</td>
                                <td v-if="perms.includes('delete-event-product') || perms.includes('edit-event-product') || perms.includes('show-event-product')">
                                    <div class="d-flex align-items-center list-action">
                                        <router-link :to="'/show-logistique-product/'+product.id" v-if="perms.includes('show-event-product')"
                                                    class="badge badge-info mr-2" data-toggle="tooltip" data-placement="top" 
                                                    title="" data-original-title="View"><i class="fa fa-eye mr-0"></i>
                                        </router-link>
                                        <router-link :to="'/edit-logistique-product/'+product.id" v-if="perms.includes('edit-event-product')"
                                                    class="badge bg-success mr-2" data-toggle="tooltip" data-placement="top" 
                                                    title="" data-original-title="Edit"><i class="fa fa-edit mr-0"></i>
                                        </router-link>
                                        <button v-if="perms.includes('delete-event-product')" class="btn bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"
                                            @click="destroy(product.id)"><i class="fa fa-trash mr-0"></i></button>
                                    </div>
                                </td>
                            </tr>
                            
                            
                        </tbody>
                    </table>
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
import {URL_LOGISTIQUE_API} from '@/config'
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import Swal from 'sweetalert2'
import $ from "jquery"
export default {
    components: {
            Loading
    },
    data() {
        return {
            products:{},
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
        this.getProducts()
    },
    methods:{
        getProducts() {
            this.isLoading =  true
            axios.get(URL_LOGISTIQUE_API+'products')
            .then(response => {
                console.log(response.data)
                $(document).ready( function () {
                            $('#example').DataTable(
                                {
                                    "lengthMenu": [ 5,10, 25, 50, 75, 100 ],
                                    "pageLength": 10,
                                    'order':[]
                                }
                            );
                        } );
                this.products = response.data.data
                this.isLoading =  false
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                Swal.fire(
                        'Erreur!',
                        'Une erreur s\'est produite lors de la recuperation des données !',
                        'error'
                )
                this.isLoading =  false
            })
        },
        destroy(id) {
            Swal.fire({
                title: 'Voulez-vous supprimer ce produit?',
                text: "cette action est irreversible!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, supprimer!'
            }).then((result) => {
            if (result.isConfirmed) {
                this.isLoading =  true
                axios.delete(URL_LOGISTIQUE_API+'products/'+id)
                .then(response => {
                    console.log(response.data)
                    this.products = response.data
                    this.isLoading =  false
                    Swal.fire(
                        'Supprimé!',
                        'Le produit a été supprimée.',
                        'success'
                    )
                    location.reload()
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                    this.isLoading =  false
                })
                
            }
            })
            
        },
    }
}
</script>