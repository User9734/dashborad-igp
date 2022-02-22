<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Modifier un panneau</h4>
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
                                                <option value="">Choisir une ville</option>
                                                <option v-for="(pi,index) in cities" :key="index" :value="pi.id"> {{pi.libelle}}  </option>
                                            </select>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                          
                                </div> 
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Description *</label>
                                            <input type="text" v-model="panel.description" class="form-control" placeholder="Entrer description" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                           
                                </div>     
                                <div class="row">  
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Format *</label>
                                            <input type="text" v-model="panel.format" class="form-control" placeholder="Entrer format" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>  
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Prix *</label>
                                            <input type="text" v-model="panel.price" class="form-control" placeholder="Entrer prix" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                        
                                </div>
                                <div class="row">  
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Url *</label>
                                            <input type="text" v-model="panel.url" class="form-control" placeholder="Entrer url" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                         
                                </div>   
                                <div class="row">  
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Latitude *</label>
                                            <input type="text" v-model="panel.lat" class="form-control" placeholder="Entrer latitude" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>  
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Discount *</label>
                                            <input type="text" v-model="panel.discount" class="form-control" placeholder="Entrer remise" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                        
                                </div>    
                                <div class="row">  
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Longitude *</label>
                                            <input type="text" v-model="panel.long" class="form-control" placeholder="Entrer longitude" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Disponibilité *</label>
                                            <select class="form-control" v-model="panel.available" name="" id="">
                                                <option value="">Choisir une option</option>
                                                <option value="0"> Indisponible  </option>
                                                <option value="1"> Disponible  </option>
                                            </select>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div> 
                                </div>  
                                <div class="row">  
                                    <div class="col-md-6">
                                        <div >
                                            <label for="">Ajouter une photo</label>
                                            <input type="file" ref="photo">
                                        </div>  
                                    </div>    
                                </div>              
                                <button type="submit" class="btn btn-primary mr-2">Enregistrer</button>
                                <button type="reset" class="btn btn-danger">reinitialiser</button>
                            </form>
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
export default {
    components: {
            Loading
    },
    data() {
        return {
            panel:{},
            cities:{},
            isLoading: false,
            fullPage: true,
            photos:null
        };
    },
    mounted(){
        this.getPAnel()
        this.getCities()
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
        store() {
            this.isLoading = true
            var panelData = new FormData();
             this.photos = this.$refs.photo.files[0]
                panelData.append('photo', this.photos);
                console.log(this.photos);
            panelData.append('libelle',this.panel.libelle)
            panelData.append('description',this.panel.description)
            panelData.append('price',this.panel.price)
            panelData.append('format',this.panel.format)
            panelData.append('lat',this.panel.lat)
            panelData.append('long',this.panel.long)
            panelData.append('available',this.panel.available)
            panelData.append('city_id',this.panel.city_id)
            panelData.append('discount',this.panel.discount)
            panelData.append('url',this.panel.url)
            panelData.append('id',this.$route.params.id)
            axios.post(URL_REGIE_API+'panel-update', panelData)
            .then(response => {
                console.log(response.data)
                this.cities = response.data
                this.isLoading = false
                if (response.data.state) {
                    Swal.fire(
                        'Modifié!',
                        'Le panneau a été modifié avec succès.',
                        'success'
                    )
                    this.$router.push('/index-regie-panels')
                     
                }
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        getCities() {
            // this.isLoading = true
            console.log(this.$route.params.id)
            axios.get(URL_REGIE_API+'cities')
            .then(response => {
                console.log(response.data)
                this.cities = response.data
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