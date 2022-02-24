<template>
    <div class="content-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex flex-wrap align-items-center justify-content-between mb-4">
                        <div>
                            <h4 class="mb-3">Liste des Regions</h4>
                            <!-- <p class="mb-0">Use category list as to describe your overall core business from the provided list. <br>
                            Click the name of the category where you want to add a list item. .</p> -->
                        </div>
                        <a href="/create-regie-regions" class="btn btn-primary add-list" v-if="perms.includes('create-region')"><i class="las la-plus mr-3"></i>Ajouter une région</a> 
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="table-responsive rounded mb-3">
                        <table id="example" class="data-table table mb-0 tbl-server-info"  v-if="regions.length > 0">
                            <thead class="bg-white text-uppercase">
                                <tr class="ligth ligth-data">
                                    <th>Libellé </th>
                                    <th>Villes </th>
                                    <th>Panneaux </th>
                                    <th v-if="perms.includes('show-region') || perms.includes('delete-region')">Actions</th> 
                                </tr>
                            </thead>
                            <tbody class="ligth-body" text-align="center">
                                <tr v-for="(region,index) in regions" :key="index">
                                    <td>{{region.libelle}}</td> 
                                    <td>{{region.cities.length}}</td>   
                                    <td>{{region.panels.length}}</td>   
                                    <td v-if="perms.includes('show-region') || perms.includes('delete-region')">
                                        <div class="d-flex align-items-center list-action">
                                            <router-link :to="{name:'RegieRegionsShow', params:{id: region.id}}" v-if="perms.includes('show-region')"
                                                        class="badge badge-info mr-2" data-toggle="tooltip" data-placement="top" 
                                                        title="" data-original-title="View"><i class="fa fa-eye mr-0"></i>
                                            </router-link>

                                            <button v-if="perms.includes('delete-region')" class="btn bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"
                                                @click="destroy(region.id)"><i class="fa fa-trash mr-0"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                
                                
                            </tbody>
                        </table>
                        <div v-else>
                            <div class="alert alert-danger text-center">
                                pas de regions
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
            regions:[],
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
        this.getRegions()
    },
    methods:{
        getRegions() {
            this.isLoading =  true
            axios.get(URL_REGIE_API+'regions')
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
                this.regions = response.data
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
                title: 'Voulez-vous supprimer cette region ?',
                text: "cette action est irreversible!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, supprimer!'
            }).then((result) => {
            if (result.isConfirmed) {
                this.isLoading =  true
                axios.delete(URL_REGIE_API+'regions/'+id)
                .then(response => {
                    console.log(response.data)
                    this.isLoading =  false
                    Swal.fire(
                        'Supprimé!',
                        'La region a été supprimée.',
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