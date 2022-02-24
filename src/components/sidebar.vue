<template>
    <div class="iq-sidebar  sidebar-default ">
          <div class="iq-sidebar-logo d-flex align-items-center justify-content-between">
              <a href="/index.html" class="header-logo">
                  <img src="/assets/images/logo.png" class="img-fluid rounded-normal light-logo" alt="logo"><h5 class="logo-title light-logo ml-3">IGP ADMIN</h5>
              </a>
              <div class="iq-menu-bt-sidebar ml-0">
                  <i class="las la-bars wrapper-menu"></i>
              </div>
          </div>
          <div class="scroller data-scrollbar" data-scroll="3">
              <nav class="iq-sidebar-menu">
                    <ul id="iq-sidebar-toggle" class="iq-menu" v-if="roles.length > 0">
                      <li class="active">
                          <a href="/" class="svg-icon">                        
                              <svg  class="svg-icon" id="p-dash1" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>
                              </svg>
                              <span class="ml-4">Tableau de Bord</span>
                          </a>
                      </li>
                      <!-- <li class="" :class="{active : clickMenu == 1}" @click="selectSide(1)"> -->
                        <li class="" v-if="eco == true || adm == true">
                          <a href="#boutique" class="collapsed" data-toggle="collapse" aria-expanded="">
                              
                              <svg class="svg-icon" id="p-dash2" width="20" height="20"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
                                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                              </svg>
                              <span class="ml-4">E-commerce</span>
                              <svg class="svg-icon iq-arrow-right arrow-active" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <polyline points="10 15 15 20 20 15"></polyline><path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                              </svg>
                          </a>
                          <ul id="boutique" class="iq-submenu collapse"  data-parent="#iq-sidebar-toggle">
                                  <li class="">
                                    <router-link to="/e-commerce-product-types" v-if="perms.includes('index-product-type')">
                                        <i class="las la-minus"></i><span>Type de produit</span>
                                    </router-link>
                                  </li>

                                  <li class="">
                                    <router-link to="/e-commerce-products" v-if="perms.includes('index-products')">
                                        <i class="las la-minus "></i><span>Produits</span>
                                    </router-link>
                                  </li>
                                  
                                  <li class="">
                                    <router-link to="/e-commerce-orders" v-if="perms.includes('index-orders')">
                                        <i class="las la-minus"></i><span>Commandes</span>
                                    </router-link>
                                  </li>
                          </ul>
                      </li>
                      <li class=" " v-if="tr == true || adm == true">
                          <a href="#product" class="collapsed" data-toggle="collapse" aria-expanded="false">
                              <svg class="svg-icon" id="p-dash3" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                              <span class="ml-4">Transport</span>
                              <svg class="svg-icon iq-arrow-right arrow-active" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <polyline points="10 15 15 20 20 15"></polyline><path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                              </svg>
                          </a>
                          <ul id="product" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                                <li class="">
                                        <router-link to="/transport-car-types" v-if="perms.includes('index-car-type')">
                                            <i class="las la-minus"></i><span>Type de vehicule</span>
                                        </router-link>
                                </li>
                                <li class="">
                                        <router-link to="/transport-car-marques" v-if="perms.includes('index-car-marque')">
                                            <i class="las la-minus"></i><span>Marque de vehicule</span>
                                        </router-link>
                                </li>
                                <li class="">
                                        <router-link to="/transport-car-models" v-if="perms.includes('index-car-model')">
                                            <i class="las la-minus"></i><span>Model de vehicule</span>
                                        </router-link>
                                </li>
                                
                                <li class="" v-if="perms.includes('index-cars')">
                                        <router-link to="/transport-cars">
                                            <i class="las la-minus"></i><span>Vehicules</span>
                                        </router-link>
                                </li>
                                <li class="">
                                    <router-link to="/transport-orders" v-if="perms.includes('index-car-orders')">
                                            <i class="las la-minus"></i><span>Commandes</span>
                                        </router-link>
                                </li>
                          </ul>
                      </li>
                      <li class=" " v-if="log == true || adm == true">
                          <a href="#category" class="collapsed" data-toggle="collapse" aria-expanded="false">
                              <svg class="svg-icon" id="p-dash3" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                              <span class="ml-4">Logistique</span>
                              <svg class="svg-icon iq-arrow-right arrow-active" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <polyline points="10 15 15 20 20 15"></polyline><path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                              </svg>
                          </a>
                          <ul id="category" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                                  <li class="">
                                    <router-link to="/logistique-product-types" v-if="perms.includes('index-event-categories')">
                                        <i class="las la-minus"></i><span>Type de produit</span>
                                    </router-link>
                                  </li>
                                  
                                  <li class="">
                                    <router-link to="/logistique-products" v-if="perms.includes('index-event-products')">
                                        <i class="las la-minus "></i><span>Produits</span>
                                    </router-link>
                                  </li>
                                  
                                  <li class="">
                                    <router-link to="/logistique-orders" v-if="perms.includes('index-event-orders')">
                                        <i class="las la-minus"></i><span>Commandes</span>
                                    </router-link>
                                  </li>
                          </ul>
                      </li>
                      <li class=" " v-if=" (reg == true || adm == true)">
                          <a href="#sale" class="collapsed" data-toggle="collapse" aria-expanded="false">
                              <svg class="svg-icon" id="p-dash4" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                              </svg>
                              <span class="ml-4" >Regie publicitaire</span>
                              <svg class="svg-icon iq-arrow-right arrow-active" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <polyline points="10 15 15 20 20 15"></polyline><path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                              </svg>
                          </a>
                          <ul id="sale" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                                <li class="" v-if="perms.includes('index-countries')">
                                    <router-link to="/index-regie-pays">
                                        <i class="las la-minus"></i><span>Pays</span>
                                    </router-link>
                                </li>
                                <li class="" v-if="perms.includes('index-regions')">
                                    <router-link to="/index-regie-regions">
                                        <i class="las la-minus"></i><span>Regions</span>
                                    </router-link>
                                </li>
                                <li class="" v-if="perms.includes('index-cities')">
                                    <router-link to="/index-regie-villes">
                                        <i class="las la-minus"></i><span>Villes</span>
                                    </router-link>
                                </li>
                                <li class="">
                                    <router-link to="/index-regie-panels" v-if="perms.includes('index-panels')">
                                        <i class="las la-minus"></i><span>Panneaux</span>
                                    </router-link>
                                </li>
                                <li class="">
                                    <router-link to="/index-regie-orders" v-if="perms.includes('index-panel-orders')">
                                        <i class="las la-minus"></i><span>Commandes</span>
                                    </router-link>
                                </li>
                          </ul>
                      </li>
                      <li class=" " v-if="adm == true">
                          <a href="#people" class="collapsed" data-toggle="collapse" aria-expanded="false">
                              <svg class="svg-icon" id="p-dash8" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                              </svg>
                              <span class="ml-4">Utilisateur</span>
                              <svg class="svg-icon iq-arrow-right arrow-active" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <polyline points="10 15 15 20 20 15"></polyline><path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                              </svg>
                          </a>
                          <ul id="people" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                
                                <li class="">
                                    <router-link to="/index-auth-users">
                                        <i class="las la-minus"></i><span>Utilisateurs</span>
                                    </router-link>
                                </li>
                                  
                          </ul>
                      </li>
                      <li class=" " v-if="adm == true">
                          <a href="#stat" class="collapsed" data-toggle="collapse" aria-expanded="false">
                              <svg class="svg-icon" id="p-dash7" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>
                              </svg>
                              <span class="ml-4">statistiques</span>
                              <svg class="svg-icon iq-arrow-right arrow-active" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <polyline points="10 15 15 20 20 15"></polyline><path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                              </svg>
                          </a>
                          <ul id="stat" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                
                                <li class="">
                                    <router-link to="/stats-e-commerce">
                                        <i class="las la-minus"></i><span>E-commerce</span>
                                    </router-link>
                                </li>
                                <li class="">
                                    <router-link to="/stats-transport">
                                        <i class="las la-minus"></i><span>Transport</span>
                                    </router-link>
                                </li>
                                <li class="">
                                    <router-link to="/stats-logistique">
                                        <i class="las la-minus"></i><span>Logistique</span>
                                    </router-link>
                                </li>
                                <!-- <li class="">
                                    <router-link to="/stats-regie">
                                        <i class="las la-minus"></i><span>Regie</span>
                                    </router-link>
                                </li> -->
                                
                                
                          </ul>
                      </li>
                  </ul>
              </nav>
              <div class="p-3"></div>
          </div>
        </div>
</template>
<script>
export default {
    mounted(){
        this.user.roles.forEach(element => {
            this.roles.push(element.name)
        });
        this.user.permissions.forEach(element => {
            this.perms.push(element.name)
        });
        console.log('roles',this.roles)
        console.log('perms',this.perms)
        console.log('user',this.user)
        this.adm = this.roles.includes("admin")
        this.eco = this.roles.includes("Gestionnaire e-commerce")
        this.tr = this.roles.includes("Gestionnaire Transport")
        this.log = this.roles.includes("Gestionnaire Evenementiel")
        this.reg = this.roles.includes("Gestionnaire Regie Publicitaire")
    },
    data() {
        return {
            clickMenu:1,
            user: this.$store.state.user,
            roles:[],
            perms:[],
            adm:false,
            eco:false,
            tr:false,
            log:false,
            reg:false,
        };
    },
    methods:{
        
    }
}
</script>