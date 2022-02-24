<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Détails d'utilisateur</h4>
                            </div>
                        </div>
                        <div class="card-body">
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <form @submit.prevent="store" data-toggle="validator">
                                    
                                    <div class="row">
                                        
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Nom *</label>
                                                <input type="text" min="0" v-model="user.nom" class="form-control" placeholder="" readonly>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div> 
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Prenoms *</label>
                                                <input type="text" min="0" v-model="user.prenoms" class="form-control" placeholder="" readonly>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>    
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Ville *</label>
                                                <input type="text" v-model="user.ville" class="form-control" placeholder="" readonly>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div> 
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Commune *</label>
                                                <input type="text" v-model="user.commune" class="form-control" placeholder="" readonly>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>    
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>email *</label>
                                                <input type="text" min="0" v-model="user.email" class="form-control" placeholder="" readonly>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Numero *</label>
                                                <input type="text" min="0" v-model="user.phone" class="form-control" placeholder="" readonly>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div> 
                                        <div class="col-md-6" v-if="user.roles.length > 0">
                                            <div class="form-group">
                                                <label>Rôle *</label>
                                                <input type="text" min="0" v-model="el.name" class="form-control" placeholder="" readonly v-for="(el,index) in user.roles" :key="index">
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-md-6" v-else>
                                            <div class="form-group">
                                                <label>Rôle *</label>
                                                <input type="text" min="0" value="Aucun" class="form-control" placeholder="" readonly>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>                        
                                    </div>                            
                                    <button type="submit" class="btn btn-primary mr-2">Modifier</button>
                                    <router-link :to="'/perms-auth-users/'+this.$route.params.id" class="btn btn-primary add-list"><i class="las la-plus mr-3"></i>Assigner permissions</router-link> 

                                </form>
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
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
//import Swal from 'sweetalert2'
import {URL_AUTH_API} from '@/config'
import moment from 'moment';
moment.locale('fr');

export default {
    components: {
        Loading
    },
    data() {
        return {
            user:{},
            isLoading: false,
            fullPage: true,
        };
    },
    
    mounted(){
        this.getUser()
    },
    methods:{
        store() {
            this.$router.push('/edit-auth-users/'+this.$route.params.id)
        },
        getUser() {
            this.isLoading = true
            
            axios.get(URL_AUTH_API+'showUser/'+this.$route.params.id)
            .then(response => {
                console.log('user',response.data)
                
                this.user = response.data.data
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