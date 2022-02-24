<template>
    <div class="content-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex flex-wrap align-items-center justify-content-between mb-4">
                        <div>
                            <h4 class="mb-3">Liste des Panneaux</h4>
                            <!-- <p class="mb-0">Use category list as to describe your overall core business from the provided list. <br>
                            Click the name of the category where you want to add a list item. .</p> -->
                        </div>
                        <a href="/create-regie-panels" class="btn btn-primary add-list" v-if="perms.includes('create-panel')"><i class="las la-plus mr-3"></i>Ajouter un panneau</a> 
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="table-responsive rounded mb-3">
                        <table id="example" class="data-table table mb-0 tbl-server-info"  v-if="panels.length > 0">
                            <thead class="bg-white text-uppercase">
                                <tr class="ligth ligth-data">
                                    <th>#</th>
                                    <th>Libellé </th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Format</th>
                                    <th>Discount</th>
                                    <th>Ville</th>
                                    <th v-if="perms.includes('delete-panel') || perms.includes('show-panel')">Actions</th> 
                                </tr>
                            </thead>
                            <tbody class="ligth-body" text-align="center">
                                <tr v-for="(pan,index) in panels" :key="index">
                                    <td> {{ index + 1 }} </td>
                                    <td>{{pan.libelle}}</td> 
                                    <td>{{pan.description}}</td>  
                                    <td>{{ pan.price }}</td> 
                                    <td>{{ pan.format }}</td> 
                                    <td>{{ pan.discount }}</td> 
                                    <td v-if="pan.city"> {{ pan.city.libelle }} </td> 
                                    <td v-else>Ville introuvable</td>
                                    <td v-if="perms.includes('delete-panel') || perms.includes('show-panel')">
                                        <div class="d-flex align-items-center list-action">
                                            <router-link :to="{name:'RegiePanneauxShow', params:{id: pan.id}}" v-if="perms.includes('show-panel')"
                                                        class="badge badge-info mr-2" data-toggle="tooltip" data-placement="top" 
                                                        title="" data-original-title="View"><i class="fa fa-eye mr-0"></i>
                                            </router-link>

                                            <button v-if="perms.includes('delete-panel')" class="btn bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"
                                                @click="destroy(pan.id)"><i class="fa fa-trash mr-0"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                
                                
                            </tbody>
                        </table>
                        <div v-else>
                            <div class="alert alert-danger text-center">
                                pas de panneau
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
            panels:[],
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
        this.getPanels()
    },
    methods:{
        getPanels() {
            this.isLoading =  true
            axios.get(URL_REGIE_API+'panels')
            .then(response => {
                console.log(response.data)
                $(document).ready( function () {
                            $('#example').DataTable(
                                {
                                    "lengthMenu": [ 5,10, 25, 50, 75, 100 ],
                                    "pageLength": 5,
                                    'order':[]
                                }
                            );
                        } );
                this.panels = response.data
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
                title: 'Voulez-vous supprimer ce panneau ?',
                text: "cette action est irreversible!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, supprimer!'
            }).then((result) => {
            if (result.isConfirmed) {
                this.isLoading =  true
                axios.delete(URL_REGIE_API+'panels/'+id)
                .then(response => {
                    console.log(response.data)
                    this.isLoading =  false
                    Swal.fire(
                        'Supprimé!',
                        'Le panneau a été supprimée.',
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