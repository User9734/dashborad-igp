<template>
    <div class="content-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex flex-wrap align-items-center justify-content-between mb-4">
                        <div>
                            <h4 class="mb-3">Liste des Commandes</h4>
                            <p class="mb-0">Use category list as to describe your overall core business from the provided list. <br>
                            Click the name of the category where you want to add a list item. .</p>
                        </div>
                        <!-- <a href="/create-e-commerce-product" class="btn btn-primary add-list"><i class="las la-plus mr-3"></i>Ajouter un order</a> -->
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="table-responsive rounded mb-3">
                        <table id="example" class="data-table table mb-0 tbl-server-info">
                            <thead class="bg-white text-uppercase">
                                <tr class="ligth ligth-data">
                                    <th>No de commande</th>
                                    <th>Nom </th>
                                    <th>Prenoms</th>
                                    <th>status</th>
                                    <th v-if="perms.includes('show-panel-order') || perms.includes('delete-panel-order')">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="ligth-body">
                                <tr v-for="(order,index) in orders" :key="index">
                                    <td>{{order.order_number}}</td>
                                    <td>{{order.nom}}</td>   
                                    <td>{{order.prenoms}}</td>
                                    <td>{{order.status}}</td>
                                    <td v-if="perms.includes('show-panel-order') || perms.includes('delete-panel-order')">
                                        <div class="d-flex align-items-center list-action">
                                            <router-link :to="'/show-regie-orders/'+order.id" v-if="perms.includes('show-panel-order')"
                                                        class="badge badge-info mr-2" data-toggle="tooltip" data-placement="top" 
                                                        title="" data-original-title="View"><i class="fa fa-eye mr-0"></i>
                                            </router-link>
                                            
                                            <button v-if="perms.includes('delete-panel-order')" class="badge bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"
                                                @click="destroy(order.id)"><i class="fa fa-trash mr-0"></i></button>
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
import {URL_REGIE_API} from '@/config'
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
            orders:{},
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
        this.getOrders()
    },
    methods:{
        getOrders() {
            this.isLoading =  true
            axios.get(URL_REGIE_API+'orders')
            .then(response => {
                console.log('orders',response.data)
                $(document).ready( function () {
                            $('#example').DataTable(
                                {
                                    "lengthMenu": [ 5,10, 25, 50, 75, 100 ],
                                    "pageLength": 10,
                                    'order':[]
                                }
                            );
                        } );
                this.orders = response.data
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
                title: 'Voulez-vous supprimer cette commande?',
                text: "cette action est irreversible!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, supprimer!'
            }).then((result) => {
            if (result.isConfirmed) {
                this.isLoading =  true
                axios.delete(URL_REGIE_API+'orders/'+id)
                .then(response => {
                    console.log(response.data)
                    this.orders = response.data
                    this.isLoading =  false
                    Swal.fire(
                        'Supprimé!',
                        'La commande a été supprimée.',
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