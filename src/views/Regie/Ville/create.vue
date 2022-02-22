<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Ajouter un Panneau</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <form action="page-list-category.html" @submit.prevent="store" data-toggle="validator">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Libelle *</label>
                                            <input type="text" v-model="panel.libelle" class="form-control" placeholder="Entrer libelle" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>  
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Ville *</label>
                                            <select class="form-control" v-model="panel.city_id" name="" id="">
                                                <option v-for="(city,index) in cities" :key="index" :value="city.id"> {{city.libelle}}  </option>
                                            </select>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                          
                                </div>  
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Description *</label>
                                            <input type="text" v-model="panel.description" class="form-control" placeholder="Entrer libelle" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>  
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Prix *</label>
                                            <input type="number" v-model="panel.prix" class="form-control" placeholder="Entrer libelle" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                         
                                </div>  
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Format *</label>
                                            <input type="text" v-model="panel.format" class="form-control" placeholder="Entrer libelle" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>  
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Discount *</label>
                                            <input type="number" v-model="panel.discount" class="form-control" placeholder="Entrer libelle" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                         
                                </div>  
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>url *</label>
                                            <input type="text" v-model="panel.description" class="form-control" placeholder="Entrer libelle" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>  
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Disponible *</label>
                                            <select class="form-control" v-model="panel.available" name="" id="">
                                                <option :value='1' > Disponible  </option>
                                                <option :value='0' > Indisponible  </option>
                                            </select>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                          
                                </div>  
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Latitude *</label>
                                            <input type="text" v-model="panel.format" class="form-control" placeholder="Entrer libelle" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>  
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Longitude *</label>
                                            <input type="text" v-model="panel.discount" class="form-control" placeholder="Entrer libelle" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                         
                                </div>                          
                                <button type="submit" class="btn btn-primary mr-2">Enregistrer</button>
                                <button type="reset" class="btn btn-danger">reinitialiser</button>
                            </form>
                        </div>
                    </div>
                    <!-- <div class="vld-parent">
                        <loading :active.sync="isLoading" 
                        :can-cancel="true" 
                        :on-cancel="onCancel"
                        :is-full-page="fullPage"></loading>
                    </div> -->
                </div>
            </div>
            <!-- Page end  -->
        </div>
    </div>
</template>

<script>
import {URL_REGIE_API} from '@/config'
import axios from 'axios'
/* import loading from '@/vue-loading-overlay';
 */import 'vue-loading-overlay/dist/vue-loading.css';
 import Swal from 'sweetalert2'
export default {
    mounted(){
        this.getCountries()
    },
    data(){
        return{
            isLoading: false,
            fullPage: true,
            panel:{
                libelle:'',
                description:'',
                price:0,
                format:'',
                discount:0,
                lat:'',
                long:'',
                url:'',
                available:0,
                city_id:0
            },
            cities:{}
        }
    },
    methods:{
        store: function(){
            this.isLoading = true
            axios.post(URL_REGIE_API+'panels', this.villes)
            .then(function (reponse){
                console.log('reponse', reponse.data)
                if (reponse.data.state) {
                    Swal.fire({
                        title: 'Modifié!',
                        text: 'Le panneau a été créé avec succès.',
                        icon: 'success',
                        timer: 2000,
                        ShowConfirmButton: false
                    })
                    this.$route.push('/index-regie-panneaux')
                     
                }
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        getCountries(){
            let app = this
            axios.get(URL_REGIE_API+'cities')
            .then(function (reponse){
                console.log('reponse', reponse.data)
                app.cities = reponse.data
                console.log('rep', app.cities)
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