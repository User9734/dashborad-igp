<template>
    <div class="content-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex flex-wrap align-items-center justify-content-between mb-4">
                        <div>
                            <h4 class="mb-3">Liste des vehicules</h4>
                            <p class="mb-0">Use category list as to describe your overall core business from the provided list. <br>
                            Click the name of the category where you want to add a list item. .</p>
                        </div>
                        <a href="/create-transport-car" class="btn btn-primary add-list" v-if="perms.includes('create-car')"><i class="las la-plus mr-3"></i>Ajouter un vehicule</a>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="table-responsive rounded mb-3">
                    <table id="example" class="data-table table mb-0 tbl-server-info">
                        <thead class="bg-white text-uppercase">
                            <tr class="ligth ligth-data">
                                <th>Libelle</th>
                                <th>Prix</th>
                                <th>Transmission</th>
                                <th>Type</th>
                                <th>Marque</th>
                                <th>Model</th>
                                <th v-if="perms.includes('show-car') || perms.includes('delete-car') || perms.includes('edit-car')">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="ligth-body">
                            <tr v-for="(stock,index) in cars" :key="index">
                                <td>{{stock.libelle}}</td>
                                <td>{{stock.price}}</td>  
                                <td>{{stock.transmission}}</td> 
                                <td>{{stock.type.libelle}}</td>
                                <td>{{stock.models.marques.libelle}}</td>
                                <td>{{stock.models.libelle}}</td>
                                <td v-if="perms.includes('show-car') || perms.includes('delete-car') || perms.includes('edit-car')">
                                    <div class="d-flex align-items-center list-action">
                                        <router-link :to="'/show-transport-car/'+stock.id" v-if="perms.includes('show-car')"
                                                    class="badge badge-info mr-2" data-toggle="tooltip" data-placement="top" 
                                                    title="" data-original-title="View"><i class="fa fa-eye mr-0"></i>
                                        </router-link>
                                        <router-link :to="'/edit-transport-car/'+stock.id" v-if="perms.includes('edit-car')"
                                                    class="badge bg-success mr-2" data-toggle="tooltip" data-placement="top" 
                                                    title="" data-original-title="Edit"><i class="fa fa-edit mr-0"></i>
                                        </router-link>
                                        <button v-if="perms.includes('delete-car')" class="badge bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"
                                            @click="destroy(stock.id)"><i class="fa fa-trash mr-0"></i></button>
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
import {URL_TRANSPORT_API} from '@/config'
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
            cars:{},
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
        this.getCars()
    },
    methods:{
        getCars() {
            this.isLoading =  true
            axios.get(URL_TRANSPORT_API+'cars')
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
                this.cars = response.data
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
                title: 'Voulez-vous supprimer cette voiture?',
                text: "cette action est irreversible!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, supprimer!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.isLoading =  true
                    axios.delete(URL_TRANSPORT_API+'cars/'+id)
                    .then(response => {
                        console.log(response.data)
                        this.cars = response.data
                        this.isLoading =  false
                        Swal.fire(
                            'Supprimé!',
                            'La voiture a été supprimée.',
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