<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
        <div class="card-body">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Détails</a>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Panneaux</a>
                                </li>
                            </ul>
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div class="card">
                                        <div class="card-header d-flex justify-content-between">
                                            <div class="header-title">
                                                <h4 class="card-title">Détails d'une ville</h4>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <form action="page-list-category.html" @submit.prevent="update" data-toggle="validator">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label>Libelle *</label>
                                                            <input type="text" v-model="villes.libelle" class="form-control" placeholder="Entrer libelle" readonly>
                                                        </div>
                                                        <div class="form-group">
                                                            <label>Panneaux *</label>
                                                            <input type="text" v-model="villes.panels.length" class="form-control" placeholder="Entrer libelle" readonly>
                                                        </div>
                                                    </div>                               
                                                </div>                            
                                                <button v-if="perms.includes('edit-city')" type="submit" class="btn btn-primary mr-2">Modifier</button>
                                                <button v-if="perms.includes('edit-city')" type="reset" class="btn btn-danger">Reinitialiser</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div class="table-responsive rounded mb-3">
                                        <table id="example" class="data-table table mb-0 tbl-server-info"  v-if="villes.panels.length > 0">
                                            <thead class="bg-white text-uppercase">
                                                <tr class="ligth ligth-data">
                                                    <th>#</th>
                                                    <th>Panneaux </th>
                                                </tr>
                                            </thead>
                                            <tbody class="ligth-body" text-align="center">
                                                <tr v-for="(el,index) in villes.panels" :key="index">
                                                    <td> {{ index + 1 }} </td>
                                                    <td>{{el.libelle}}</td>  
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div v-else>
                                            <div class="alert alert-danger text-center">
                                                pas de panneaux
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
import {URL_REGIE_API} from '@/config'
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
            villes:[],
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
        this.getVilles()
    },

    methods:{
        
        getVilles() {
            this.isLoading = true
            axios.get(URL_REGIE_API+'cities/'+this.$route.params.id)
            .then(response => {
                console.log('getreg',response.data)
                this.villes = response.data.data
                this.isLoading = false
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        update(){
            this.$router.push('/edit-regie-villes/'+this.$route.params.id)
        }
    }
}
</script>