<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Détails d'un vehicule</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <!-- <form  action="#" data-toggle="validator"> -->
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Libelle *</label>
                                            <input type="text" v-model="car.libelle" class="form-control" placeholder="Entrer libelle" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Description *</label>
                                            <input type="text" v-model="car.description" class="form-control" placeholder="Entrer libelle" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Type *</label>
                                            <select v-model="car.car_type_id" class="form-control" readonly>
                                                <option v-for="(car,index) in carType" :key="index" :value="car.id"> {{car.libelle}} </option>
                                            </select>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Marque *</label>
                                            <input type="text" v-model="car.models.marques.libelle" class="form-control" placeholder="Entrer adresse" readonly>
                                            
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Models *</label>
                                            <input type="text" v-model="car.models.libelle" class="form-control" placeholder="Entrer adresse" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>slug *</label>
                                            <input type="text" v-model="car.slug" class="form-control" placeholder="Entrer adresse" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div> 
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Transmission *</label>
                                            <input type="text" min="0" v-model="car.transmission" class="form-control" placeholder="Entrer adresse" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div> 
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Année *</label>
                                            <input type="text" min="0" v-model="car.year" class="form-control" placeholder="Entrer adresse" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Couleur exterieur *</label>
                                            <input type="text" min="0" v-model="car.color_exterior" class="form-control" placeholder="Entrer adresse" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Couleur interieur *</label>
                                            <input type="text" min="0" v-model="car.color_interior" class="form-control" placeholder="Entrer adresse" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Type de carburant *</label>
                                            <input type="text" min="0" v-model="car.fuel_type" class="form-control" placeholder="Entrer adresse" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Kilometrage *</label>
                                            <input type="text" min="0" v-model="car.mileage" class="form-control" placeholder="Entrer adresse" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Prix *</label>
                                            <input type="number" min="0" v-model="car.price" class="form-control" placeholder="Entrer adresse" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Reduction(%) *</label>
                                            <input type="number" min="0" v-model="car.discount" class="form-control" placeholder="Entrer adresse" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div> 
                                    <div v-for="n in images" :key="n" class="col-md-6">
                                        <div class="form-group">
                                            <label>Photo *</label>
                                            <img :src="URL_TRANSPORT+n" alt="" width="20%">
                                            <button class=" btn btn-secondary" @click="destroyPath(n)" v-if="perms.includes('delete-car')"><i class="fa fa-trash"></i></button>
                                        </div>
                                    </div>  
                                    <div v-if="tof">
                                        <label for="">Ajouter une photo</label>
                                        <input type="file" ref="photos" multiple>
                                    </div>                          
                                </div>                            
                                <button v-if="perms.includes('edit-car')" type="submit" @click="store" class="btn btn-primary mr-2">Modifier</button>
                                <div v-if="!tof">
                                    <button v-if="perms.includes('edit-car')" class="btn btn-secondary mr-2" @click="addBoolPhoto(true)" >Ajouter une image</button>
                                </div>
                                <div v-else>
                                    <button v-if="perms.includes('edit-car')" class="btn btn-secondary mr-2" @click="addPhoto()" >enregistrer l'image</button>
                                </div>
                                <button v-if="perms.includes('edit-car')" type="reset" class="btn btn-danger">reinitialiser</button>
                            <!-- </form> -->
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
import {URL_TRANSPORT_API,URL_TRANSPORT} from '@/config'
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
            URL_TRANSPORT:URL_TRANSPORT,
            car:{},
            carType:[],
            images:[],
            isLoading: false,
            fullPage: true,
            tof:false,
            photos:{},
            user: this.$store.state.user,
            perms:[]
        };
    },
    mounted(){
        this.user.permissions.forEach(element => {
            this.perms.push(element.name)
        });
        this.getCarType()
        this.getCar()
    },
    methods:{
        store() {
            this.$router.push('/edit-transport-car/'+this.$route.params.id)
        },
        addBoolPhoto(bool) {
            this.tof = bool
        },
        addPhoto() {
            var carData = new FormData();
            this.photos = this.$refs.photos.files
            for( var i = 0; i < this.photos.length; i++ ){
                let file = this.photos[i];
                carData.append('photo[' + i + ']', file);
            }
            carData.append('id',this.$route.params.id)

            axios.post(URL_TRANSPORT_API+'addFile', carData)
            .then(response => {
                this.car = response.data.data
                this.isLoading = false
                this.getCar()
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        getCar() {
            this.isLoading = true
            
            axios.get(URL_TRANSPORT_API+'cars/'+this.$route.params.id)
            .then(response => {
                console.log(response.data)
                this.car = response.data.data
                this.images = response.data.photo.split(';')
                this.images.pop()
                this.isLoading = false
                console.log( this.images)
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        getCarType(){
            axios.get(URL_TRANSPORT_API+'car-types')
            .then(response => {
                this.carType = response.data
                this.isLoading = false
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        destroyPath(path) {
            let app = this
            Swal.fire({
                title: 'Voulez-vous supprimer cette image?',
                text: "cette action est irreversible!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, supprimer!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.isLoading =  true
                    axios.post(URL_TRANSPORT_API+'deleteFile',{
                        id:this.$route.params.id,
                        path:path
                    })
                    .then(response => {
                        app.getCar()
                        console.log(response.data)
                        this.isLoading =  false
                        Swal.fire(
                            'Supprimé!',
                            'L\'image a été supprimée.',
                            'success'
                        )
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