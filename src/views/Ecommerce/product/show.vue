<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Détails d'un Produit</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <!-- <form  action="#" data-toggle="validator"> -->
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Libelle *</label>
                                            <input type="text" v-model="product.libelle" class="form-control" placeholder="Entrer libelle" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Categorie *</label>
                                            <select v-model="product.product_type_id" class="form-control" readonly>
                                                <option v-for="(product,index) in productlist" :key="index" :value="product.id"> {{product.libelle}} </option>
                                            </select>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>slug *</label>
                                            <input type="text" v-model="product.slug" class="form-control" placeholder="Entrer adresse" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div> 
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Prix *</label>
                                            <input type="number" min="0" v-model="product.price" class="form-control" placeholder="Entrer adresse" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Reduction *</label>
                                            <input type="number" min="0" v-model="product.discount" class="form-control" placeholder="Entrer adresse" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div> 
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Stock *</label>
                                            <input type="text" min="0" v-model="product.stock" class="form-control" placeholder="Entrer adresse" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div> 
                                    <div v-for="n in images" :key="n" class="col-md-6">
                                        <div class="form-group">
                                            <label>Photo *</label>
                                            <img :src="URL_COMMERCE+n" alt="" width="20%">
                                            <button class=" btn btn-secondary" @click="destroyPath(n)"><i class="fa fa-trash"></i></button>
                                        </div>
                                    </div>  
                                    <div v-if="tof">
                                        <label for="">Ajouter une photo</label>
                                        <input type="file" ref="photos" multiple>
                                    </div>                          
                                </div>                            
                                <button type="submit" @click="store" class="btn btn-primary mr-2" v-if="perms.includes('edit-product')">Modifier</button>
                                <div v-if="!tof">
                                    <button  class="btn btn-secondary mr-2" @click="addBoolPhoto(true)" v-if="perms.includes('create-product')">Ajouter une image</button>
                                </div>
                                <div v-else>
                                    <button  class="btn btn-secondary mr-2" @click="addPhoto()" v-if="perms.includes('create-product')">enregistrer l'image</button>
                                </div>
                                <button type="reset" class="btn btn-danger">reinitialiser</button>
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
import {URL_COMMERCE_API,URL_COMMERCE} from '@/config'
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
            URL_COMMERCE:URL_COMMERCE,
            product:{},
            productlist:[],
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

        this.getProductType()
        this.getProduct()
    },
    methods:{
        store() {
            this.$router.push('/edit-e-commerce-product/'+this.$route.params.id)
        },
        addBoolPhoto(bool) {
            this.tof = bool
        },
        addPhoto() {
            var productData = new FormData();
            this.photos = this.$refs.photos.files
            for( var i = 0; i < this.photos.length; i++ ){
                let file = this.photos[i];
                productData.append('photo[' + i + ']', file);
            }
            productData.append('id',this.$route.params.id)

            axios.post(URL_COMMERCE_API+'addFile', productData)
            .then(response => {
                console.log(response.data)
                this.product = response.data
                this.isLoading = false
                this.getProduct()
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        getProduct() {
            this.isLoading = true
            
            axios.get(URL_COMMERCE_API+'products/'+this.$route.params.id)
            .then(response => {
                console.log(response.data)
                this.product = response.data
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
        getProductType(){
            axios.get(URL_COMMERCE_API+'product-types')
            .then(response => {
                this.productlist = response.data
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
                    axios.post(URL_COMMERCE_API+'deleteFile',{
                        id:this.$route.params.id,
                        path:path
                    })
                    .then(response => {
                        app.getProduct()
                        console.log(response.data)
                        this.isLoading =  false
                        Swal.fire(
                            'Supprimé!',
                            'La categorie a été supprimée.',
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