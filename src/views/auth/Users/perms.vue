<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Assigner permissions</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="tab-content" id="myTabContent">
                                <form @submit.prevent="store" data-toggle="validator">
                                    
                                    <div class="row">
                                        
                                        <div v-for="(usr_role,index) in user.roles" :key="index">
                                            <div>
                                                <input type="text" min="0" v-model="usr_role.name"  class="form-control" placeholder="" readonly>
                                                <div class="help-block with-errors"></div>
                                                <div v-for="(role,index) in roles" :key="index">
                                                    <div v-if="role.name == usr_role.name" class="row">
                                                        <div v-for="(perm,index) in role.permissions" :key="index" class="col-md-4">
                                                            <div v-if="perms.includes(perm.name)">
                                                                <input type="checkbox" checked="true" name="perms" :id="index" :value="perm.name" > {{ perm.libelle }}
                                                            </div>
                                                            <div v-else>
                                                                <input type="checkbox" name="perms" :id="index" :value="perm.name" > {{ perm.libelle }}
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                         
                                    </div>                            
                                    <button class="btn btn-primary mr-2"><i class="las la-plus mr-3"></i>Assigner</button> 

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
</template>

<script>
import axios from 'axios'
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import {URL_AUTH_API} from '@/config'
import Swal from 'sweetalert2'

export default {
    components:{
        Loading
    },
    data(){
        return{
            user:{},
            roles:[],
            perms:[],
            permissions:[],
            fullPage: true,
            isLoading: false,
            payload:{
                permissions:[],
                user_id:null
            }
        }
    },
    mounted(){
        
        this.getUser()
        
        this.getRole()
        this.permissions = document.getElementsByName("perms")
        console.log('perms',this.permissions)
    },
    methods:{
        store(){
            this.permissions = document.getElementsByName("perms")
            console.log('perms',this.permissions)
            this.payload.user_id = this.user.user_id
            for (let i = 0; i < this.permissions.length; i++) {
                if (this.permissions[i].checked == true) {
                    this.payload.permissions.push(this.permissions[i].value)
                }
            }
            console.log(this.payload.permissions);
            axios.post(URL_AUTH_API+'assignPermission', this.payload)
            .then(response => {
                console.log('rep_perms',response.data)
                if(response.data.status){
                    Swal.fire(
                        'Operation Effectuée!',
                        'Permission assignée avec succès.',
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
        getUser() {
            let app=this
            app.isLoading = true
            
            axios.get(URL_AUTH_API+'showUser/'+app.$route.params.id)
            .then(response => {
                console.log('user',response.data)
                
                app.user = response.data.data
                app.user.permissions.forEach(element => {
            app.perms.push(element.name)
        });
                app.user.user_id = app.$route.params.id,
                app.isLoading = false
                
            })
            .catch(error => {
                console.log(error)
                app.errored = true
                app.isLoading = false
            })
        },
        getRole(){
            axios.get(URL_AUTH_API+'getRole')
            .then(response => {
                console.log('roles',response.data)
                
                this.roles = response.data.data
                this.isLoading = false
                
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        }
    }
}
</script>

<style>
      .vertical-line{
        border-left: 2px solid #000;
        display: inline-block;
        height: 130px;
        margin: 0 20px;
      }
    </style>