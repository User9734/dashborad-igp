<template>
    <section class="login-content">
         <div class="container">
            <div class="row align-items-center justify-content-center height-self-center">
               <div class="col-lg-8">
                  <div class="card auth-card">
                     <div class="card-body p-0">
                        <div class="d-flex align-items-center auth-content">
                           <div class="col-lg-7 align-self-center">
                              <div class="p-3">
                                 <h2 class="mb-2">Connexion</h2>
                                 <p>Connectez-vous pour faire vos actions</p>
                                 <form @submit.prevent="orderSubmit">
                                    <div class="row">
                                       <div class="col-lg-12">
                                          <div class="floating-label form-group">
                                             <input class="floating-input form-control" v-model="user.email" type="email" placeholder=" ">
                                             <label>Email</label>
                                          </div>
                                       </div>
                                       <div class="col-lg-12">
                                          <div class="floating-label form-group">
                                             <input class="floating-input form-control" v-model="user.password" type="password" placeholder=" ">
                                             <label>Mot de passe</label>
                                          </div>
                                       </div>
                                       <div class="col-lg-6">
                                          <div class="custom-control custom-checkbox mb-3">
                                             <input type="checkbox" v-model="user.remember_me" class="custom-control-input" id="customCheck1">
                                             <label class="custom-control-label control-label-1" for="customCheck1">Se souvenir de moi </label>
                                          </div>
                                       </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Connexion</button>
                                    
                                 </form>
                              </div>
                           </div>
                           <div class="col-lg-5 content-right">
                              <img src="/assets/images/login/01.png" class="img-fluid image-right" alt="">
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
</template>
<script>
    import axios from 'axios'
   import Swal from 'sweetalert2'
   import {URL_AUTH_API} from '@/config'
    export default {
        data(){
        return{
            other_address:'',
            display_other: 'none',
            panier:[] ,
            user:{
               remember_me:false
            },
            roles:[]
        }
    },
    methods:{

            orderSubmit(){
               //let url = 'https://igp-auth.lce-ci.com/api/auth/login'
               let url = URL_AUTH_API+'loginByAdmin'
                axios.post(url,this.user)
                .then(res => {
                    console.log('dd',res.data)
                        if (res.data.status) {
                           
                            localStorage.setItem('token',res.data.access_token)
                            localStorage.setItem('user',JSON.stringify(res.data.user))
                            Swal.fire({
                                icon: 'success',
                                title: 'Connexion',
                                text: 'Connexion reussi avec succès !',
                                showConfirmButton: false,
                                timer: 2000
                            }) 
                            window.location.href = '/';
                        
                        }else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Echec',
                                text: 'Identifiant Incorrect !',
                                showConfirmButton: false,
                                timer: 2000
                            }) 
                        }
                })
                .catch(error =>{
                    if (!error.response.data.status) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Echec',
                                text: error.response.data.message,
                                showConfirmButton: false,
                                timer: 2000
                            }) 
                    }
                    
                })
            },
    }
    }
</script>