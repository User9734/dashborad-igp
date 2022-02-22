<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Add Customer</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <form action="https://templates.iqonic.design/posdash/html/backend/page-list-customers.html" data-toggle="validator">
                                <div class="row"> 
                                    <div class="col-md-6">                      
                                        <div class="form-group">
                                            <label>Date *</label>
                                            <input type="text" class="form-control" v-model="logs.created_at" placeholder="Enter Name" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Entité *</label>
                                            <input type="text" class="form-control" v-model="logs.log_name" placeholder="Enter Email" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div> 
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Type d'operation *</label>
                                            <input type="text" class="form-control" v-model="logs.description" placeholder="Enter Phone Number" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div> 
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Country *</label>
                                            <input type="text" class="form-control" placeholder="Enter Country" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Address</label>
                                            <textarea class="form-control" rows="4"></textarea>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>City *</label>
                                            <input type="text" class="form-control" placeholder="Enter City" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div> 
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>State *</label>
                                            <input type="text" class="form-control" placeholder="Enter State" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Customer Group</label>
                                            <input type="text" class="form-control">
                                        </div>
                                    </div>
                                </div>                            
                                <button type="reset" @click="$router.go(-1)" class="btn btn-danger">Retour</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import moment from 'moment';
moment.locale('fr');
export default {
    data() {
    return {
        logs:{}
    };
  },
    mounted(){
        this.getLogs()
    },
    methods:{
        getLogs() {
            console.log('ssss')
            axios.get('http://localhost:8000/api/log/'+this.$route.params.id)
            .then(response => {
                console.log('init',response.data[0])
                
                this.logs = response.data[0]
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
        },
    }
}
</script>