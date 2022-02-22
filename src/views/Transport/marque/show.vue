<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Details de marque</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <form action="page-list-category.html" @submit.prevent="update" data-toggle="validator">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Libelle *</label>
                                            <input type="text" v-model="carMarque.libelle" class="form-control" placeholder="Entrer libelle" readonly>
                                        </div>
                                    </div> 
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Description *</label>
                                            <input type="text" v-model="carMarque.description" class="form-control" placeholder="Entrer description" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                                 
                                </div>                            
                                <button v-if="perms.includes('edit-car')" type="submit" class="btn btn-primary mr-2">Modifier</button>
                                <button v-if="perms.includes('edit-car')" type="reset" class="btn btn-danger">Reinitialiser</button>
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


export default {
    components: {
            Loading
    },
    data() {
        return {
            carMarque:{},
            categories:[],
            isLoading: false,
            fullPage: true,
            user: this.$store.state.user,
            perms:[]
        };
    },
    mounted(){
        this.user.permissions.forEach(element => {
            this.perms.push(element.name)
        });
        this.gerCarMarque()
        this.getCategorie()
    },

    methods:{
        gerCarMarque() {
            this.isLoading = true
            axios.get(URL_TRANSPORT_API+'car-marques/'+this.$route.params.id)
            .then(response => {
                
                console.log(response.data)
                this.carMarque = response.data
                this.isLoading = false
                if (response.data.state) {
                    this.$router.push('/transport-car-marques')
                }
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        update(){
            this.$router.push('/edit-transport-car-marque/'+this.$route.params.id)
        }
    }
}
</script>