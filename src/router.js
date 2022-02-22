import VueRouter from "vue-router";

import Home from "./views/home.vue";
import Login from "./views/auth/login.vue";
import PageNotFound from "./views/notFound.vue";
import store from './store'

// E-COMMERCE

    // * product

import EcommerceProductCreate from "./views/Ecommerce/product/create.vue"
import EcommerceProductIndex from "./views/Ecommerce/product/index.vue"
import EcommerceProductShow from "./views/Ecommerce/product/show.vue"
import EcommerceProductEdit from "./views/Ecommerce/product/edit.vue"

    // * Type

import EcommerceProductTypeCreate from "./views/Ecommerce/Type/create.vue"
import EcommerceProductTypeIndex from "./views/Ecommerce/Type/index.vue"
import EcommerceProductTypeEdit from "./views/Ecommerce/Type/edit.vue"
import EcommerceProductTypeShow from "./views/Ecommerce/Type/show.vue"

    // * Order

import EcommerceOrderCreate from "./views/Ecommerce/Order/create.vue"
import EcommerceOrderIndex from "./views/Ecommerce/Order/index.vue"
import EcommerceOrderEdit from "./views/Ecommerce/Order/edit.vue"
import EcommerceOrderShow from "./views/Ecommerce/Order/show.vue"

// TRANSPORT

    // * CAR

import TransportCarCreate from "./views/Transport/car/create.vue"
import TransportCarIndex from "./views/Transport/car/index.vue"
import TransportCarShow from "./views/Transport/car/show.vue"
import TransportCarEdit from "./views/Transport/car/edit.vue"

    // * Type de CAR

import TransportCarTypeCreate from "./views/Transport/type/create.vue"
import TransportCarTypeIndex from "./views/Transport/type/index.vue"
import TransportCarTypeEdit from "./views/Transport/type/edit.vue"
import TransportCarTypeShow from "./views/Transport/type/show.vue"

    // * Marque de CAR

import TransportCarMarqueCreate from "./views/Transport/marque/create.vue"
import TransportCarMarqueIndex from "./views/Transport/marque/index.vue"
import TransportCarMarqueEdit from "./views/Transport/marque/edit.vue"
import TransportCarMarqueShow from "./views/Transport/marque/show.vue"

    // * Model de CAR

import TransportCarModelCreate from "./views/Transport/model/create.vue"
import TransportCarModelIndex from "./views/Transport/model/index.vue"
import TransportCarModelEdit from "./views/Transport/model/edit.vue"
import TransportCarModelShow from "./views/Transport/model/show.vue"

    // * Order

import TransportOrderCreate from "./views/Transport/order/create.vue"
import TransportOrderIndex from "./views/Transport/order/index.vue"
import TransportOrderEdit from "./views/Transport/order/edit.vue"
import TransportOrderShow from "./views/Transport/order/show.vue"

// EVENEMENTIEL

    // * product

    import LogistiqueProductCreate from "./views/Logistique/product/create.vue"
    import LogistiqueProductIndex from "./views/Logistique/product/index.vue"
    import LogistiqueProductShow from "./views/Logistique/product/show.vue"
    import LogistiqueProductEdit from "./views/Logistique/product/edit.vue"
    
        // * Type
    
    import LogistiqueProductTypeCreate from "./views/Logistique/Type/create.vue"
    import LogistiqueProductTypeIndex from "./views/Logistique/Type/index.vue"
    import LogistiqueProductTypeEdit from "./views/Logistique/Type/edit.vue"
    import LogistiqueProductTypeShow from "./views/Logistique/Type/show.vue"
    
        // * Order
    
    import LogistiqueOrderCreate from "./views/Logistique/Order/create.vue"
    import LogistiqueOrderIndex from "./views/Logistique/Order/index.vue"
    import LogistiqueOrderEdit from "./views/Logistique/Order/edit.vue"
    import LogistiqueOrderShow from "./views/Logistique/Order/show.vue"

// REGIE

    // * Pays

    import RegiePaysCreate from "./views/Regie/Pays/create.vue"
    import RegiePaysIndex from "./views/Regie/Pays/index.vue"
    import RegiePaysShow from "./views/Regie/Pays/show.vue"
    import RegiePaysEdit from "./views/Regie/Pays/edit.vue"
    
     // * Regions

    import RegieRegionsCreate from "./views/Regie/Regions/create.vue"
    import RegieRegionsIndex from "./views/Regie/Regions/index.vue"
    import RegieRegionsShow from "./views/Regie/Regions/show.vue"
    import RegieRegionsEdit from "./views/Regie/Regions/edit.vue"
    
    // * Villes

    import RegieVillesCreate from "./views/Regie/Ville/create.vue"
    import RegieVillesIndex from "./views/Regie/Ville/index.vue"
    import RegieVillesShow from "./views/Regie/Ville/show.vue"
    import RegieVillesEdit from "./views/Regie/Ville/edit.vue"
    
    // * Panneaux

    import RegiePanneauxCreate from "./views/Regie/Panneaux/create.vue"
    import RegiePanneauxIndex from "./views/Regie/Panneaux/index.vue"
    import RegiePanneauxShow from "./views/Regie/Panneaux/show.vue"
    import RegiePanneauxEdit from "./views/Regie/Panneaux/edit.vue"
    
    // * Commandes

    import RegieOrdersIndex from "./views/Regie/Orders/index.vue"
    import RegieOrdersShow from "./views/Regie/Orders/show.vue"
    
    // * Users

    import authUsersIndex from "./views/auth/Users/index.vue"
    import authUsersShow from "./views/auth/Users/show.vue"
    import authUsersEdit from "./views/auth/Users/edit.vue"
    import authUsersCreate from "./views/auth/Users/create.vue"
    import authUsersPerms from "./views/auth/Users/perms.vue"
    
// STATS

  // * E-commerce

  import StatsCommerce from "./views/Stats/e-commerce.vue"
  
  // * Logistique

  import StatsLogistique from "./views/Stats/logistique.vue"
  
  // * Transport

  import StatsTransport from "./views/Stats/transport.vue"
  
  // * Transport

  import StatsRegie from "./views/Stats/regie.vue"

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
          layout: "Default",
          requiredAuth: true
        }
      },
    {   path: "*", 
        component: PageNotFound ,
        meta: {
            layout: "Auth",
            requiredAuth: false
          }
        
    },

      {
        path: "/connexion",
        name: "connexion",
        component: Login,
        meta: {
          layout: "Auth",
          requiredAuth: false
        }
      },
      // E-COMMERCE 

          // * product
      {
        path: "/create-e-commerce-product",
        name: "EcommerceProductCreate",
        component: EcommerceProductCreate,
        meta: {
          layout: "Default",
          requiredAuth: true
        }
      },
      {
        path: "/e-commerce-products",
        name: "EcommerceProductIndex",
        component: EcommerceProductIndex,
        meta: {
          layout: "Default",
          requiredAuth: true
        }
      },
      {
        path: "/show-e-commerce-product/:id",
        name: "EcommerceProductShow",
        component: EcommerceProductShow,
        meta: {
          layout: "Default",
          requiredAuth: true
        }
      },
      {
        path: "/edit-e-commerce-product/:id",
        name: "EcommerceProductEdit",
        component: EcommerceProductEdit,
        meta: {
          layout: "Default",
          requiredAuth: true
        }
      },
          // * product Type
      {
        path: "/create-e-commerce-product-type",
        name: "EcommerceProductTypeCreate",
        component: EcommerceProductTypeCreate,
        meta: {
          layout: "Default",
          requiredAuth: true
        }
      },
      {
        path: "/edit-e-commerce-product-type/:id",
        name: "EcommerceProductTypeEdit",
        component: EcommerceProductTypeEdit,
        meta: {
          layout: "Default",
          requiredAuth: true
        }
      },
      {
        path: "/show-e-commerce-product-type/:id",
        name: "EcommerceProductTypeShow",
        component: EcommerceProductTypeShow,
        meta: {
          layout: "Default",
          requiredAuth: true
        }
      },
      {
        path: "/e-commerce-product-types",
        name: "EcommerceProductTypeIndex",
        component: EcommerceProductTypeIndex,
        meta: {
          layout: "Default",
          requiredAuth: true
        }
      },
          // * COMMANDE
          {
            path: "/create-e-commerce-order",
            name: "EcommerceOrderCreate",
            component: EcommerceOrderCreate,
            meta: {
              layout: "Default",
              requiredAuth: true
            }
          },
          {
            path: "/e-commerce-orders",
            name: "EcommerceOrderIndex",
            component: EcommerceOrderIndex,
            meta: {
              layout: "Default",
              requiredAuth: true
            }
          },
          {
            path: "/show-e-commerce-order/:id",
            name: "EcommerceOrderShow",
            component: EcommerceOrderShow,
            meta: {
              layout: "Default",
              requiredAuth: true
            }
          },
          {
            path: "/edit-e-commerce-order/:id",
            name: "EcommerceOrderEdit",
            component: EcommerceOrderEdit,
            meta: {
              layout: "Default",
              requiredAuth: true
            }
          },
      
      // LOGISTIQUE 

          // * product
          {
            path: "/create-logistique-product",
            name: "LogistiqueProductCreate",
            component: LogistiqueProductCreate,
            meta: {
              layout: "Default",
              requiredAuth: true
            }
          },
          {
            path: "/logistique-products",
            name: "LogistiqueProductIndex",
            component: LogistiqueProductIndex,
            meta: {
              layout: "Default",
              requiredAuth: true
            }
          },
          {
            path: "/show-logistique-product/:id",
            name: "LogistiqueProductShow",
            component: LogistiqueProductShow,
            meta: {
              layout: "Default",
              requiredAuth: true
            }
          },
          {
            path: "/edit-logistique-product/:id",
            name: "LogistiqueProductEdit",
            component: LogistiqueProductEdit,
            meta: {
              layout: "Default",
              requiredAuth: true
            }
          },
              // * product Type
          {
            path: "/create-logistique-product-type",
            name: "LogistiqueProductTypeCreate",
            component: LogistiqueProductTypeCreate,
            meta: {
              layout: "Default",
              requiredAuth: true
            }
          },
          {
            path: "/edit-logistique-product-type/:id",
            name: "LogistiqueProductTypeEdit",
            component: LogistiqueProductTypeEdit,
            meta: {
              layout: "Default",
              requiredAuth: true
            }
          },
          {
            path: "/show-logistique-product-type/:id",
            name: "LogistiqueProductTypeShow",
            component: LogistiqueProductTypeShow,
            meta: {
              layout: "Default",
              requiredAuth: true
            }
          },
          {
            path: "/logistique-product-types",
            name: "LogistiqueProductTypeIndex",
            component: LogistiqueProductTypeIndex,
            meta: {
              layout: "Default",
              requiredAuth: true
            }
          },
              // * COMMANDE
              {
                path: "/create-logistique-order",
                name: "LogistiqueOrderCreate",
                component: LogistiqueOrderCreate,
                meta: {
                  layout: "Default",
                  requiredAuth: true
                }
              },
              {
                path: "/logistique-orders",
                name: "LogistiqueOrderIndex",
                component: LogistiqueOrderIndex,
                meta: {
                  layout: "Default",
                  requiredAuth: true
                }
              },
              {
                path: "/show-logistique-order/:id",
                name: "LogistiqueOrderShow",
                component: LogistiqueOrderShow,
                meta: {
                  layout: "Default",
                  requiredAuth: true
                }
              },
              {
                path: "/edit-logistique-order/:id",
                name: "LogistiqueOrderEdit",
                component: LogistiqueOrderEdit,
                meta: {
                  layout: "Default",
                  requiredAuth: true
                }
              },
    

      // TRANSPORT 

          // * CAR
      {
        path: "/create-transport-car",
        name: "TransportCarCreate",
        component: TransportCarCreate,
        meta: {
          layout: "Default",
          requiredAuth: true
        }
      },
      {
        path: "/transport-cars",
        name: "TransportCarIndex",
        component: TransportCarIndex,
        meta: {
          layout: "Default",
          requiredAuth: true
        }
      },
      {
        path: "/show-transport-car/:id",
        name: "TransportCarShow",
        component: TransportCarShow,
        meta: {
          layout: "Default",
          requiredAuth: true
        }
      },
      {
        path: "/edit-transport-car/:id",
        name: "TransportCarEdit",
        component: TransportCarEdit,
        meta: {
          layout: "Default",
          requiredAuth: true
        }
      },
          // * Car Type
      {
        path: "/create-transport-car-type",
        name: "TransportCarTypeCreate",
        component: TransportCarTypeCreate,
        meta: {
          layout: "Default",
          requiredAuth: true
        }
      },
      {
        path: "/edit-transport-car-type/:id",
        name: "TransportCarTypeEdit",
        component: TransportCarTypeEdit,
        meta: {
          layout: "Default",
          requiredAuth: true
        }
      },
      {
        path: "/show-transport-car-type/:id",
        name: "TransportCarTypeShow",
        component: TransportCarTypeShow,
        meta: {
          layout: "Default",
          requiredAuth: true
        }
      },
      {
        path: "/transport-car-types",
        name: "TransportCarTypeIndex",
        component: TransportCarTypeIndex,
        meta: {
          layout: "Default",
          requiredAuth: true
        }
      },
        // * Car Marque
      {
        path: "/create-transport-car-marque",
        name: "TransportCarMarqueCreate",
        component: TransportCarMarqueCreate,
        meta: {
          layout: "Default",
          requiredAuth: true
        }
      },
      {
        path: "/edit-transport-car-marque/:id",
        name: "TransportCarMarqueEdit",
        component: TransportCarMarqueEdit,
        meta: {
          layout: "Default",
          requiredAuth: true
        }
      },
      {
        path: "/show-transport-car-marque/:id",
        name: "TransportCarMarqueShow",
        component: TransportCarMarqueShow,
        meta: {
          layout: "Default",
          requiredAuth: true
        }
      },
      {
        path: "/transport-car-marques",
        name: "TransportCarMarqueIndex",
        component: TransportCarMarqueIndex,
        meta: {
          layout: "Default",
          requiredAuth: true
        }
      },
      // * Car Models
      {
        path: "/create-transport-car-model",
        name: "TransportCarModelCreate",
        component: TransportCarModelCreate,
        meta: {
          layout: "Default",
          requiredAuth: true
        }
      },
      {
        path: "/edit-transport-car-model/:id",
        name: "TransportCarModelEdit",
        component: TransportCarModelEdit,
        meta: {
          layout: "Default",
          requiredAuth: true
        }
      },
      {
        path: "/show-transport-car-model/:id",
        name: "TransportCarModelShow",
        component: TransportCarModelShow,
        meta: {
          layout: "Default",
          requiredAuth: true
        }
      },
      {
        path: "/transport-car-models",
        name: "TransportCarModelIndex",
        component: TransportCarModelIndex,
        meta: {
          layout: "Default",
          requiredAuth: true
        }
      },
          // * COMMANDE
          {
            path: "/create-transport-order",
            name: "TransportOrderCreate",
            component: TransportOrderCreate,
            meta: {
              layout: "Default",
              requiredAuth: true
            }
          },
          {
            path: "/transport-orders",
            name: "TransportOrderIndex",
            component: TransportOrderIndex,
            meta: {
              layout: "Default",
              requiredAuth: true
            }
          },
          {
            path: "/show-transport-order/:id",
            name: "TransportOrderShow",
            component: TransportOrderShow,
            meta: {
              layout: "Default",
              requiredAuth: true
            }
          },
          {
            path: "/edit-transport-order/:id",
            name: "TransportOrderEdit",
            component: TransportOrderEdit,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          
    // REGIE
          
          // * Pays
      
          {
            path: "/create-regie-pays",
            name: "RegiePaysCreate",
            component: RegiePaysCreate,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          {
            path: "/index-regie-pays",
            name: "RegiePaysIndex",
            component: RegiePaysIndex,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          {
            path: "/show-regie-pays/:id",
            name: "RegiePaysShow",
            component: RegiePaysShow,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          {
            path: "/edit-regie-pays/:id",
            name: "RegiePaysEdit",
            component: RegiePaysEdit,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          
          // * Regions
      
          {
            path: "/create-regie-regions",
            name: "RegieRegionsCreate",
            component: RegieRegionsCreate,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          {
            path: "/index-regie-regions",
            name: "RegieRegionsIndex",
            component: RegieRegionsIndex,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          {
            path: "/show-regie-regions/:id",
            name: "RegieRegionsShow",
            component: RegieRegionsShow,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          {
            path: "/edit-regie-regions/:id",
            name: "RegieRegionsEdit",
            component: RegieRegionsEdit,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          
          // * Villes
                
          {
            path: "/create-regie-villes",
            name: "RegieVillesCreate",
            component: RegieVillesCreate,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          {
            path: "/index-regie-villes",
            name: "RegieVillesIndex",
            component: RegieVillesIndex,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          {
            path: "/show-regie-villes/:id",
            name: "RegieVillesShow",
            component: RegieVillesShow,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          {
            path: "/edit-regie-villes/:id",
            name: "RegieVillesEdit",
            component: RegieVillesEdit,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          
           // * Panneaux
                
          {
            path: "/create-regie-panels",
            name: "RegiePanneauxCreate",
            component: RegiePanneauxCreate,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          {
            path: "/index-regie-panels",
            name: "RegiePanneauxIndex",
            component: RegiePanneauxIndex,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          {
            path: "/show-regie-panels/:id",
            name: "RegiePanneauxShow",
            component: RegiePanneauxShow,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          {
            path: "/edit-regie-panels/:id",
            name: "RegiePanneauxEdit",
            component: RegiePanneauxEdit,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          
          // * Commandes
                
          {
            path: "/index-regie-orders",
            name: "RegieOrdersIndex",
            component: RegieOrdersIndex,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          {
            path: "/show-regie-orders/:id",
            name: "RegieOrdersShow",
            component: RegieOrdersShow,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          
          // * Users
                
          {
            path: "/index-auth-users",
            name: "authUsersIndex",
            component: authUsersIndex,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          {
            path: "/show-auth-users/:id",
            name: "authUsersShow",
            component: authUsersShow,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          {
            path: "/edit-auth-users/:id",
            name: "authUsersEdit",
            component: authUsersEdit,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          {
            path: "/create-auth-users",
            name: "authUsersCreate",
            component: authUsersCreate,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          {
            path: "/perms-auth-users/:id",
            name: "authUsersPerms",
            component: authUsersPerms,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          
    // STATS
              
          // * E-commerce
          {
            path: "/stats-e-commerce",
            name: "StatsCommerce",
            component: StatsCommerce,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          
          // * Transport
          {
            path: "/stats-transport",
            name: "StatsTransport",
            component: StatsTransport,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          
          // * Logistique
          {
            path: "/stats-logistique",
            name: "StatsLogistique",
            component: StatsLogistique,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          
          // * Regie
          {
            path: "/stats-regie",
            name: "StatsRegie",
            component: StatsRegie,
            meta: {
              layout: "Default",
              requiredAuth: true
            },
          },
          
];



const router = new VueRouter({
    history: true,
    mode: "history",
    routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiredAuth)) {
    console.log('required')
    if (store.state.token) {
      next();
    } else {
      next("/connexion")
    }
  } else {
    console.log('non required')
    next() // make sure to always call next()!
  }
})

export default router;