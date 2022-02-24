<template>
    <div class="content-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex flex-wrap align-items-center justify-content-between mb-4">
                        <div>
                            <h4 class="mb-3">Liste des Pays</h4>
                            <!-- <p class="mb-0">Use category list as to describe your overall core business from the provided list. <br>
                            Click the name of the category where you want to add a list item. .</p> -->
                        </div>
                        <a href="/create-regie-pays" class="btn btn-primary add-list" v-if="perms.includes('create-country')"><i class="las la-plus mr-3"></i>Ajouter un pays</a> 
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="table-responsive rounded mb-3">
                        
                        <table id="example" class="data-table table mb-0 tbl-server-info"  v-if="countries.length > 0">
                            <thead class="bg-white text-uppercase">
                                <tr class="ligth ligth-data">
                                    <th>Libellé </th>
                                    <th>Regions </th>
                                    <th>Villes </th>
                                    <th v-if="perms.includes('show-country') || perms.includes('delete-country')">Actions</th> 
                                </tr>
                            </thead>
                            <tbody class="ligth-body" text-align="center">
                                <tr v-for="(pay,index) in countries" :key="index">
                                    <td>{{pay.libelle}}</td> 
                                    <td>{{pay.regions.length}}</td>   
                                    <td>{{pay.cities.length}}</td>   
                                    <td v-if="perms.includes('show-country') || perms.includes('delete-country')">
                                        <div class="d-flex align-items-center list-action">
                                            <router-link :to="{name:'RegiePaysShow', params:{id: pay.id}}" v-if="perms.includes('show-country')"
                                                        class="badge badge-info mr-2" data-toggle="tooltip" data-placement="top" 
                                                        title="" data-original-title="View"><i class="fa fa-eye mr-0"></i>
                                            </router-link>

                                            <button v-if="perms.includes('delete-country')" class="btn bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"
                                                @click="destroy(pay.id)"><i class="fa fa-trash mr-0"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                
                                
                            </tbody>
                        </table>
                        <div v-if="countries.length = 0">
                            <div class="alert alert-danger text-center">
                                pas de Pays
                            </div>
                        </div>
                    </div>
                    <div class="vld-parent">
                        <loading :active.sync="isLoading" 
                        :can-cancel="true" 
                        :is-full-page="fullPage">
                        </loading>
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
import $ from "jquery";
export default {
    components: {
            Loading,
    },
    data() {
        return {
            countries:[],
            isLoading: false,
            table:null,
            fullPage: true,
            user: this.$store.state.user,
            perms:[]
        };
    },
    mounted(){
        this.user.permissions.forEach(element => {
            this.perms.push(element.name)
        });
        this.getCountries()
    },
    methods:{
        getCountries() {
            let app = this 
            app.isLoading =  true
            axios.get(URL_REGIE_API+'countries')
            .then(response => {
                        $(document).ready( function () {
                            $('#example').DataTable(
                                {
                                    "lengthMenu": [ 5,10, 25, 50, 75, 100 ],
                                    "pageLength": 10,
                                    'order':[]
                                }
                            );
                        } );
                
                console.log(response.data)
                app.countries = response.data
                app.isLoading =  false
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
                title: 'Voulez-vous supprimer ce pays?',
                text: "cette action est irreversible!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, supprimer!'
            }).then((result) => {
            if (result.isConfirmed) {
                this.isLoading =  true
                axios.delete(URL_REGIE_API+'countries/'+id)
                .then(response => {
                    console.log(response.data)
                    this.countries = response.data
                    this.isLoading =  false
                    Swal.fire(
                        'Supprimé!',
                        'La commande a été supprimée.',
                        'success'
                    )
                     window.location.href = '/index-regie-pays'
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