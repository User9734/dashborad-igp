<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Ajouter un Vehicule</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <form action="page-list-category.html" @submit.prevent="store" data-toggle="validator">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Libelle *</label>
                                            <input type="text" v-model="car.libelle" class="form-control" placeholder="Entrer libelle" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Description *</label>
                                            <input type="text" v-model="car.description" class="form-control" placeholder="Entrer libelle" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Type *</label>
                                            <select v-model="car.car_type_id" class="form-control" required>
                                                <option v-for="(car,index) in carTypes" :key="index" :value="car.id"> {{car.libelle}} </option>
                                            </select>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Marque *</label>
                                            <select v-model="car_marque_id" @change="onChangeCarMarques(car_marque_id)" class="form-control" required>
                                                <option v-for="(car,index) in carMarques" :key="index" :value="car.id"> {{car.libelle}} </option>
                                            </select>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                    <label>Model *</label>
                                        <select v-model="car.car_model_id" class="form-control" required>
                                            <option v-for="(car,index) in carModels" :key="index" :value="car.id"> {{car.libelle}} </option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>slug *</label>
                                            <input type="text" v-model="car.slug" class="form-control" placeholder="Entrer adresse" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div> 
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Transmission *</label>
                                            <select v-model="car.transmission" class="form-control" required>
                                                <option  value="manuel"> Manuel </option>
                                                <option  value="automatique"> Automatique </option>
                                            </select>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div> 
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Année *</label>
                                            <input type="text" min="0" v-model="car.year" class="form-control" placeholder="Entrer adresse" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Couleur exterieur *</label>
                                            <input type="text" min="0" v-model="car.color_exterior" class="form-control" placeholder="Entrer adresse" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Couleur interieur *</label>
                                            <input type="text" min="0" v-model="car.color_interior" class="form-control" placeholder="Entrer adresse" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Type de carburant *</label>
                                            <select v-model="car.fuel_type" class="form-control" required>
                                                <option  value="gasoil"> Gasoil </option>
                                                <option  value="super"> Super </option>
                                            </select>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Kilometrage *</label>
                                            <input type="text" min="0" v-model="car.mileage" class="form-control" placeholder="Entrer adresse" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Prix *</label>
                                            <input type="number" min="0" v-model="car.price" class="form-control" placeholder="Entrer adresse" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Reduction(%) *</label>
                                            <input type="number" min="0" v-model="car.discount" class="form-control" placeholder="Entrer adresse" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>    
                                    <div >
                                        <label for="">Ajouter une photo</label>
                                        <input type="file" ref="photos" multiple>
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
            <!-- Page end  -->
        </div>
    </div>
</template>
<script>
import axios from "axios";
import {URL_TRANSPORT_API} from '@/config'
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
            car:{},
            carTypes:[],
            carModels:[],
            carMarques:[],
            car_marque_id:null,
            isLoading: false,
            fullPage: true,
            photos:{}
        };
    },
    mounted(){
        this.getCarTypes()
        // this.getCarModels()
        this.getCarMarques()
    },
    methods:{
        store() {
            this.isLoading = true
            var carData = new FormData();
             this.photos = this.$refs.photos.files
            for( var i = 0; i < this.photos.length; i++ ){
                let file = this.photos[i];
                carData.append('photo[' + i + ']', file);
            }
            carData.append('libelle',this.car.libelle)
            carData.append('description',this.car.description)
            carData.append('slug',this.car.slug)
            carData.append('price',this.car.price)
            carData.append('discount',this.car.discount)
            carData.append('mileage',this.car.mileage)
            carData.append('fuel_type',this.car.fuel_type)
            carData.append('color_exterior',this.car.color_exterior)
            carData.append('color_interior',this.car.color_interior)
            carData.append('year',this.car.year)
            carData.append('transmission',this.car.transmission)
            carData.append('car_type_id',this.car.car_type_id)
            carData.append('car_model_id',this.car.car_model_id)

            axios.post(URL_TRANSPORT_API+'cars', carData)
            .then(response => {
                console.log(response.data)
                this.car = response.data
                this.isLoading = false
                if (response.data.state) {
                    this.$router.push('/transport-cars')
                    Swal.fire(
                        'Operation Effectuée!',
                        'Vehicule crée avec succès.',
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

        getCarTypes(){
            this.isLoading = true
            axios.get(URL_TRANSPORT_API+'car-types')
            .then(response => {
                this.carTypes = response.data
                this.isLoading = false
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
  
        getCarMarques(){
            this.isLoading = true
            axios.get(URL_TRANSPORT_API+'car-marques')
            .then(response => {
                this.carMarques = response.data
                this.isLoading = false
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        onChangeCarMarques(id){
            this.isLoading = true
            axios.get(URL_TRANSPORT_API+'car-marques/'+id)
            .then(response => {
                console.log('onnn',response.data)
                this.carModels = response.data.models
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