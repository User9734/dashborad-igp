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
                            </ul>
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div class="card">
                                        <div class="card-header d-flex justify-content-between">
                                            <div class="header-title">
                                                <h4 class="card-title">Détails d'un panneau</h4>
                                            </div>
                                        </div>
                                        <div class="card-body">
                            <form @submit.prevent="update" data-toggle="validator">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Libelle *</label>
                                            <input type="text" v-model="panel.libelle" class="form-control" placeholder="Entrer libelle" required readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>  
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Ville *</label>
                                            <input type="text" v-model="panel.city.libelle" class="form-control"  readonly required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                          
                                </div> 
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Description *</label>
                                            <input type="text" v-model="panel.description" class="form-control" placeholder="Entrer description" readonly required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                           
                                </div>     
                                <div class="row">  
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Format *</label>
                                            <input type="text" v-model="panel.format" class="form-control" placeholder="Entrer format" readonly required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>  
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Prix *</label>
                                            <input type="text" v-model="panel.price" class="form-control" placeholder="Entrer prix" readonly required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                        
                                </div>
                                <div class="row">  
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Url *</label>
                                            <input type="text" v-model="panel.url" class="form-control" placeholder="Entrer url" readonly required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                         
                                </div>   
                                <div class="row">  
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Latitude *</label>
                                            <input type="text" v-model="panel.lat" class="form-control" placeholder="Entrer la latitude" readonly required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>  
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Discount *</label>
                                            <input type="text" v-model="panel.discount" class="form-control" placeholder="Entrer la remise" readonly required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                        
                                </div>    
                                <div class="row">  
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Longitude *</label>
                                            <input type="text" v-model="panel.long" class="form-control" placeholder="Entrer la longitude" readonly required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Disponibilité *</label>
                                            <select class="form-control" v-model="panel.available" name="" id="" readonly>
                                                <option value="0"> Indisponible  </option>
                                                <option value="1"> Disponible  </option>
                                            </select>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div> 
                                </div>  
                                <div class="row">  
                                    <div class="col-md-12" align="center">
                                        <img :src="url + panel.photo" alt="" width="30%"> 
                                    </div>    
                                </div>            
                                <button v-if="perms.includes('edit-panel')" type="submit" class="btn btn-primary mr-2">Modifier</button>
                            </form>
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
import {URL_REGIE} from '@/config'
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
//import Swal from 'sweetalert2'


export default {
    components: {
           Loading
    },
    data() {
        return {
            panel:[],
            isLoading: false,
            fullPage: true,
            cities:[],
            url: URL_REGIE,
            user: this.$store.state.user,
            perms:[]
        };
    },
    mounted(){
        this.user.permissions.forEach(element => {
            this.perms.push(element.name)
        });
        this.getPAnel()
    },

    methods:{
        
        getPAnel() {
            this.isLoading = true
            axios.get(URL_REGIE_API+'panels/'+this.$route.params.id)
            .then(response => {
                console.log('getreg',response.data)
                this.panel = response.data.data
                this.isLoading = false
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        getCities(){
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
        },
        update(){
            this.$router.push('/edit-regie-panels/'+this.$route.params.id)
        },
        
    }
}
</script>