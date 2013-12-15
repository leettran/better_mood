cbtApp.directive('listEvents', ['$http', function($http){
	return function(scope, elem, attrs) {
		$http.get("/api/events")
			.success(function(data){
				scope.allMyEvents = data
			})
		}
	}])

cbtApp.directive('deleteEvent',['$http', '$state', function($http, $state){
	return function(scope, elem, attrs) {
		elem.bind ("mousedown", function () {
      $http.delete(
				"/api/events/" + attrs.id
			)
			.success(function(data, status, headers, config) {
				//ATTENTION: this is messing up the view
				//the app becomes unresponsive and weird
				console.log("Successfully deleted the event");
				console.log(data)
			})
			.error(function(data, status, headers, config) {
				console.log("Error, could not do this.")
			})
    })
	}
}])

cbtApp.directive('createEvent', ['$http', '$state', function($http, $state){
	return function(scope, elem, attrs){
		elem.bind("mousedown", function() {
			$http.post(
				"/api/events.json"
			)
			.success(function(data, status, headers, config){
				console.log("Success!")
				console.log(data)
				$state.go('new.description', {"id": data.id})
			})
			.error(function(data, status, headers, config) {
				console.log(data)
				console.log("Failure...")
			})
		})	
	}
}])

cbtApp.directive('updateEvent', ['$http', '$state', function($http, $state){
	return function(scope, elem, attrs){
		elem.bind("mousedown", function(){
			$http.put(
				"/api/events/" + attrs.id,
				{description: scope.cbtEvent.description}
			)
			.success(function(data, status, headers, config){
				console.log("Success!")
				console.log(data)
				$state.go('new.feelingsBefore', {"id": scope.cbtEventId})
				$scope.cbtEvent = data
			})
		})
	}
}])