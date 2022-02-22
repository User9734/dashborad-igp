<template>
    <div class="content-page">
        <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="d-flex flex-wrap align-items-center justify-content-between mb-4">
                    <div>
                        <h4 class="mb-3">Approvisionnement des boutiques</h4>
                        <p class="mb-0">Sales enables you to effectively control sales KPIs and monitor them in one central<br>
                         place while helping teams to reach sales goals. </p>
                    </div>
                    <a href="/create-sale" class="btn btn-primary add-list"><i class="las la-plus mr-3"></i>Approvisionner</a>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="table-responsive rounded mb-3">
                <table class="data-table table mb-0 tbl-server-info">
                    <thead class="bg-white text-uppercase">
                        <tr class="ligth ligth-data">
                            
                            <th>Date</th>
                            <th>entité</th>
                            <th>Operation</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody class="ligth-body">
                        <tr v-for="(log,index) in logs" :key="index">
                            <td>{{log.created_at}}</td>
                            <td>{{log.log_name}}</td>
                            <td>{{log.description}}</td>
                            <td>
                                <div class="d-flex align-items-center list-action">
                                    <a class="badge badge-info mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="View"
                                        href="" @click="$router.push('/log/'+log.id)"><i class="ri-eye-line mr-0" ></i></a>
                                    <a class="badge bg-success mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit"
                                        href="#"><i class="ri-pencil-line mr-0"></i></a>
                                    <a class="badge bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"
                                        href="#"><i class="ri-delete-bin-line mr-0"></i></a>
                                </div>
                            </td>
                                
                        </tr>
                    </tbody>
                </table>
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
        logs:[]
    };
  },
    mounted(){
        this.getLogs()
    },
    methods:{
        getLogs() {
            console.log('ssss')
            axios.get('http://localhost:8000/api/logs')
            .then(response => {
                console.log('init',response.data)
                
                
                response.data.forEach(element => {
                   element.created_at = moment(element.created_at).format("Do MMMM YYYY HH:mm");
                });
                this.logs = response.data
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
        },
    }
}
</script>