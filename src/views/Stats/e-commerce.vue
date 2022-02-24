<template>
    <div class="content-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-5">
                    <div class="card card-transparent card-block card-stretch card-height border-none">
                        <div class="card-body p-0 mt-lg-2 mt-0">
                            <h3 class="mb-3">Bonjour {{ this.$store.state.user.nom }},</h3>
                            <p class="mb-0 mr-4">Voici la liste des statistiques du module e-commerce.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-7">
                    <div class="row">
                        <div class="col-lg-4 col-md-4">
                            <div class="card card-block card-stretch card-height">
                                <div class="card-body">
                                    <div class="d-flex align-items-center mb-4 card-total-sale">
                                        <div class="icon iq-icon-box-2 bg-info-light">
                                            <img src="/assets/images/product/1.png" class="img-fluid" alt="image">
                                        </div>
                                        <div>
                                            <p class="mb-2">Nombre total de ventes</p>
                                            <h4> {{ this.all }} </h4>
                                        </div>
                                    </div>                                
                                    <div class="iq-progress-bar mt-2">
                                        <span class="bg-info iq-progress progress-1" data-percent="85">
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-lg-4 col-md-4">
                            <div class="card card-block card-stretch card-height">
                                <div class="card-body">
                                    <div class="d-flex align-items-center mb-4 card-total-sale">
                                        <div class="icon iq-icon-box-2 bg-success-light">
                                            <img src="/assets/images/product/3.png" class="img-fluid" alt="image">
                                        </div>
                                        <div>
                                            <p class="mb-2">Ventes totales</p>
                                            <h4> {{ this.t_amount }} FCFA </h4>
                                        </div>
                                    </div>
                                    <div class="iq-progress-bar mt-2">
                                        <span class="bg-success iq-progress progress-1" data-percent="75">
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-12">
                    <div class="card card-block card-stretch card-height">
                        <div class="card-header d-flex align-items-center justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Meilleurs Produits</h4>
                            </div>
                            <select name="" id="" v-model="param.status" class="col-lg-3 form-control" @change="getBestProduct">
                                <option value="new">En attente</option>
                                <option value="delivered">Acheté</option>
                                <option value="cancel">Retourné</option>
                            </select>
                        </div>
                        <div class="card-body">
                            <ul class="list-unstyled row top-product mb-0">
                                <li class="col-lg-3" v-for="(best, index) in bests" :key="index">
                                    <div class="card card-block card-stretch card-height mb-2">
                                        <div class="card-body">
                                            <div class="bg-warning-light rounded">
                                                <img :src="url_com+best.photo" class="style-img img-fluid m-auto p-3" :alt="best.photo">
                                            </div>
                                            <div class="style-text text-left mt-3">
                                                <h5 class="mb-1"> {{ best.libelle.toUpperCase() }} </h5>
                                                <p class="mb-0">Montant total : {{ best.amount }} FCFA</p>
                                                <p class="mb-0">Nombre d'achat : {{ best.order_count }} </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="card card-block card-stretch card-height">
                        <div class="card-header d-flex align-items-center justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Les utilisateurs les plus acheteurs</h4>
                            </div>
                            
                        </div>
                        <div class="card-body">
                            <ul class="list-unstyled row top-product mb-0">
                                <li class="col-lg-4" v-for="(user, index) in users" :key="index">
                                    <div class="card card-block card-stretch card-height mb-2">
                                        <div class="card-body">
                                            <div class="style-text text-left mt-3">
                                                <h5 class="mb-1"><svg class="svg-icon" id="p-dash8" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                              </svg> <p>{{ user.nom.toUpperCase() }} {{ user.prenoms }}</p> </h5>
                                                <p class="mb-0">Nombre de commandes : {{ user.order_count }} </p>
                                                <p class="mb-0">Nombre d'articles achetés : {{ user.count_article }} </p>
                                                <p class="mb-0">Montant cumulé : {{ user.cumul_amount }} FCFA</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>    
                <div class="col-lg-12">
                    <div class="card card-block card-stretch card-height">
                        <div class="card-header d-flex align-items-center justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Produits vendus</h4>
                            </div>
                            
                                <div class="col-lg-3 header-title">
                                    Debut : <input type="date" name="" id="" v-model="periode.from" class="form-control" @change="pivot">
                                </div>
                                <div class="col-lg-3 header-title" v-if="periode.from != null">
                                    Fin : <input type="date" name="" :min="periode.from" id="" v-model="periode.to" class="form-control" @change="getSellByPeriode">
                                </div>
                                <button v-if="periode.to != null" class=" header-title col-lg-2 btn btn-primary mr-2" @click="getSellAllTime">Tous</button>
                            
                        </div>
                        <div class="card-body">
                            <ul class="list-unstyled row top-product mb-0">
                                <li class="col-lg-4" v-for="(sell, index) in all_sells" :key="index">
                                    <div class="card card-block card-stretch card-height mb-2">
                                        <div class="card-body" >
                                            <div class="bg-warning-light rounded">
                                                <img :src="url_com+sell.photo" class="style-img img-fluid m-auto p-3" :alt="sell.photo">
                                            </div>
                                            <div class="style-text text-left mt-3">
                                                <h5 class="mb-1"> {{ sell.libelle.toUpperCase() }} </h5>
                                                 <p class="mb-0">Montant généré : {{ sell.amount }} FCFA</p>
                                                 <p class="mb-0">Nombre d'achat : {{ sell.count }} </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
                 
                <div class="col-lg-12">
                    <div class="card card-block card-stretch card-height">
                        <div class="card-header d-flex align-items-center justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Les mieux notés</h4>
                            </div>
                            
                        </div>
                        <div class="card-body">
                            <ul class="list-unstyled row top-product mb-0">
                                <li class="col-lg-3" v-for="(rate, index) in rates" :key="index">
                                    <div class="card card-block card-stretch card-height mb-2">
                                        <div class="card-body">
                                            <div class="bg-warning-light rounded">
                                                <img :src="url_com+rate.photo" class="style-img img-fluid m-auto p-3" :alt="rate.photo">
                                            </div>
                                            <div class="style-text text-left mt-3">
                                                <h5 class="mb-1"> {{ rate.libelle.toUpperCase() }} </h5>
                                                <p class="mb-0">Note :  {{ rate.start }} </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="card card-block card-stretch card-height">
                        <div class="card-header d-flex align-items-center justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Les plus vus</h4>
                            </div>
                            
                        </div>
                        <div class="card-body">
                            <ul class="list-unstyled row top-product mb-0">
                                <li class="col-lg-3" v-for="(view, index) in views" :key="index">
                                    <div class="card card-block card-stretch card-height mb-2">
                                        <div class="card-body">
                                            <div class="bg-warning-light rounded">
                                                <img :src="url_com+view.photo" class="style-img img-fluid m-auto p-3" :alt="view.photo">
                                            </div>
                                            <div class="style-text text-left mt-3">
                                                <h5 class="mb-1"> {{ view.libelle.toUpperCase() }} </h5>
                                                <p class="mb-0">Vue(s) : {{ view.view }} </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>         
            </div>
        </div>
      </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import {URL_COMMERCE_API, URL_COMMERCE} from '@/config'
export default {
    name: "StatsCommerce",
    data(){
        return{
            users : {},
            param:{
                status: 'new'
            },
            periode: {
                from: null,
                to: null,
            },
            bests: {},
            t_amount: null,
            all_sells: {},
            rates: {},
            views: {},
            today: null,
            all: null ,
            url_com: URL_COMMERCE
        }
    },
    computed: {
        modalShow(){
            return this.productModal
        }
    },
    methods: {
        pivot(){
            if(this.periode.to != null)
            {
                this.getSellByPeriode()
            }
        },
        getBestProduct(){
            let app = this
            axios.post(URL_COMMERCE_API+'bestproduct', app.param)
            .then(function (reponse){
                console.log('reponse', reponse.data);
                reponse.data.forEach(element => {
                    var img = element.photo.split(';')
                    element.photo = img[0]
                   
                });
                
                app.bests = reponse.data
            })
        },
        getSellByPeriode(){
            let app = this
            axios.post(URL_COMMERCE_API+'getsellByPeriode', app.periode)
            .then(function (reponse){
                console.log('sell/periode', reponse.data);
                reponse.data.forEach(element => {
                    var img = element.photo.split(';')
                    element.photo = img[0]
                    element.per = true
                   
                });
                
                app.all_sells = reponse.data
                console.log('OK', app.all_sells);
            })
        },
        getBestViews(){
            let app = this
            axios.get(URL_COMMERCE_API+'bestviews')
            .then(function (reponse){
                console.log('views', reponse.data);
                reponse.data.forEach(element => {
                    var img = element.photo.split(';')
                    element.photo = img[0]
                   
                });
                
                app.views = reponse.data
            })
        },
        getSellAllTime(){
            let app = this
            axios.get(URL_COMMERCE_API+'getsellAllTime')
            .then(function (reponse){
                console.log('all_sells', reponse.data);
                reponse.data.forEach(element => {
                    var img = element.photo.split(';')
                    element.photo = img[0]
                    app.t_amount += element.amount
                    element.per = false
                });
                app.all_sells = reponse.data
                app.all = reponse.data.length
                console.log('OK', app.all_sells);
            })
        },
        getBestRate(){
            let app = this
            axios.get(URL_COMMERCE_API+'bestrate')
            .then(function (reponse){
                console.log('rates', reponse.data);
                reponse.data.forEach(element => {
                    var img = element.photo.split(';')
                    element.photo = img[0]
                   
                });
                
                app.rates = reponse.data
            })
        },
        getUserSeller(){
            let app = this
            axios.get(URL_COMMERCE_API+'getuserSeller')
            .then(function (reponse) {
                console.log('user_seller',reponse);
                app.users = reponse.data
            })
            .catch(function (error){
                Swal.fire('Erroeur','Une erreur s\'est produite lors de la récupération des données','error')
                console.log(error);
            })
        }
    },
    mounted(){
        this.today = new Date().toJSON().slice(0,10);
        this.getUserSeller()
        this.getSellAllTime()
        this.getBestProduct()
        this.getBestViews()
        this.getBestRate()
        // this.cart = JSON.parse(localStorage.getItem('panier'))
        console.log('user',this.$store.state.user)
        console.log('token',this.$store.state.token)
       
    },
}

</script>
