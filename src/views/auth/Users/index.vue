<template>
    <div class="content-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex flex-wrap align-items-center justify-content-between mb-4">
                        <div>
                            <h4 class="mb-3">Liste des Utilisateurs</h4>
                            
                        </div>
                        <a href="/create-auth-users" class="btn btn-primary add-list"><i class="las la-plus mr-3"></i>Ajouter un utilisateur</a> 
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="table-responsive rounded mb-3">
                        <table id="example" class="data-table table mb-0 tbl-server-info">
                            <thead class="bg-white text-uppercase">
                                <tr class="ligth ligth-data">
                                    <th>Nom </th>
                                    <th>Prenoms</th>
                                    <th>Contact</th>
                                    <th>Rôles</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody class="ligth-body">
                                    <tr v-for="(user,index) in users" :key="index">
                                    <td>{{user.nom}}</td>   
                                    <td>{{user.prenoms}}</td>
                                    <td>{{user.phone}}</td>
                                    <td v-if="user.roles.length > 0">
                                        <p v-for="(el,index) in user.roles" :key="index"> {{ el.name }} </p>
                                    </td>
                                    <td v-else><p>aucun</p></td>
                                    <td>
                                        <div class="d-flex align-items-center list-action">
                                            <router-link :to="'/show-auth-users/'+user.id" 
                                                        class="badge badge-info mr-2" data-toggle="tooltip" data-placement="top" 
                                                        title="" data-original-title="View"><i class="fa fa-eye mr-0"></i>
                                            </router-link>
                                            <button class="badge bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"
                                                @click="destroy(user.id)"><i class="fa fa-trash mr-0"></i></button>
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
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import Swal from 'sweetalert2'
import $ from "jquery"
import {URL_AUTH_API} from '@/config'
export default {
    components: {
            Loading
    },
    data() {
        return {
            users:{},
            isLoading: false,
            fullPage: true
        };
    },
    mounted(){
        this.getUsers()
    },
    methods:{
        getUsers() {
            this.isLoading =  true
            axios.get(URL_AUTH_API+'getUsers')
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
                this.users = response.data.data
                console.log('users',this.users)
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
                axios.delete(URL_AUTH_API+'getUsers/'+id)
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