<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Modifier un utilisateur</h4>
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
                                                <input type="text" v-model="user.nom" class="form-control" placeholder="">
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div> 
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Prenoms *</label>
                                                <input type="text" v-model="user.prenoms" class="form-control" placeholder="">
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>    
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Ville *</label>
                                                <input type="text" v-model="user.ville" class="form-control" placeholder="">
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div> 
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Commune *</label>
                                                <input type="text" v-model="user.commune" class="form-control" placeholder="">
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>    
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>email *</label>
                                                <input type="text" v-model="user.email" class="form-control" placeholder="">
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Numero *</label>
                                                <input type="text" v-model="user.phone" class="form-control" placeholder="">
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div> 
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Mot de passe *</label>
                                                <input type="password" v-model="user.newPassword" class="form-control" placeholder="">
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div> 
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Rôle *</label>
                                                <select name="" id="" class="form-control" v-model="user.roles" multiple>
                                                    <!-- <option :value="[]">Choisir un rôle</option> -->
                                                    <option :value="role.name" v-for="(role,index) in roles" :key="index"> {{ role.name }} </option>
                                                </select>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>                      
                                    </div>                            
                                    <button type="submit" class="btn btn-primary mr-2">Modifier</button>
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
import Swal from 'sweetalert2'
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
            roles:{},
            isLoading: false,
            fullPage: true,
        };
    },
    
    mounted(){
        this.getUser()
        this.getRole()
    },
    methods:{
        getUser() {
            this.isLoading = true
            
            axios.get(URL_AUTH_API+'showUser/'+this.$route.params.id)
            .then(response => {
                console.log('user',response.data)
                
                this.user = response.data.data
                this.user.user_id = this.$route.params.id,
                this.isLoading = false
                
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        store() {
            console.log(this.user);
            this.isLoading = true
            axios.post(URL_AUTH_API+'modify-account-by-admin', this.user)
            .then(response => {
                console.log(response.data)
                this.isLoading = false
                if (response.data.status) {
                    this.$router.push('/index-auth-users/')
                    Swal.fire(
                        'Operation Effectuée!',
                        'Utilisateur modifié avec succès.',
                        'success'
                    )
                }
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        getRole(){
            let app = this
            axios.get(URL_AUTH_API+'getRole')
            .then(function (reponse){
                console.log('roles',reponse.data)
                app.roles = reponse.data.data 
            })
            .catch(error => {
                console.log(error)
                app.errored = true
                app.isLoading = false
            })
        }
    }
}
</script>