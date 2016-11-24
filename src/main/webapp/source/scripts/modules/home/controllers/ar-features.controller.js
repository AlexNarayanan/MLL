(function (angular) {
    'use strict';

    angular
        .module('mllApp.home')
        .controller('ARFeaturesController', ARFeaturesController);

    ARFeaturesController.$inject = 	['$stateParams', 'arHomePageSerivce'];

    function ARFeaturesController($stateParams, arHomePageService) {

    	var model = this;
        
    	var userId = $stateParams.id;
		model.registered = {};
		model.unregistered = {};
        
        function getRegisteredMusician(){
        	arHomePageService.getRegisteredMusician(userId)
        		.success(function(response){
        			var registeredMusiciansObject = [];
        			var unregisteredMusiciansObject = [];

        			for(var i=0; i< response.registeredMusicians.length; i++){
        				registeredMusiciansObject.push(response.registeredMusicians[i]);        				
        			}
        			
        			for(var j=0; j< response.unregisteredMusicians.length; j++){
        				unregisteredMusiciansObject.push(response.unregisteredMusicians[j]);        				
        			}    
        			
        			model.musicians = registeredMusiciansObject;
        			model.unregisteredMusicians = unregisteredMusiciansObject;
        			console.log(registeredMusiciansObject)
        			model.registered = {
        					data : registeredMusiciansObject,
        					columnDefs: 
        					[
        					  { field: 'name', displayName: 'First Name', width: "40%" , cellTemplate:'<a href="{{row.entity.musicianId}}">{{row.entity.name}}</a>'},
                              { field: 'gender', displayName: 'Gender', width: "30%" },
                              { field: 'age', width: "30%"}
                            ]
        			}
        			
        			model.unregistered = {
        					data : unregisteredMusiciansObject,
        					columnDefs: 
        					[
        					  { field: 'emailId', displayName: 'Email', width: "40%" },
                              { field: 'tokenId', displayName: 'Token Id', width: "30%"},
                              { field: 'tokenId', displayName: 'Send Invitation', width: "30%", cellTemplate:'<button>Send Invitation</button>'},
                            ]
        			}
        		});
        }    
        
        getRegisteredMusician();
//        	() => {
    }
})(window.angular);