var app = angular.module('myApp', []);
app.controller('AppCtrl', function($scope, $http) {

	var refresh = function() {
		$http.get('/contactlist').success(function(response) {
			$scope.contactList = response;
			$scope.contact = "";
		});
	
	};

	refresh();
	
	$scope.addContact = function() {
		//console.log($scope.contact);
		if($scope.addform.$valid) {
			$http.post('/contactlist', $scope.contact).success(function(response) {
				console.log(response);
				refresh();
			});	
		}
		
	};

	$scope.removeContact = function(id) {
		//console.log('Delete id : ' + id);
		$http.delete('/contactlist/'+id).success(function(response){
			console.log(response);
			refresh();	
		});
		
	};

	$scope.editContact = function(id) {
		//console.log('Edit contact id:' + id);
		$http.get('/contactlist/'+id).success(function(response){
			$scope.contact = response;
		});
	};

	$scope.updateContact = function() {
		//console.log($scope.contact);
		$http.put('/contactlist/'+ $scope.contact._id, $scope.contact).success(function(response){
			refresh();
		});
	};

	$scope.clearContact = function() {
		$scope.contact = "";
	};

	
	
});

