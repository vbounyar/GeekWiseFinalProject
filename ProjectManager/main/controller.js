
//The Controllers

projectManager.controller("AppController", function($scope, $http){
		$scope.method = "GET";
		$scope.url = "data/project_test_data.json";
		$http({
			method: $scope.method,
			url: $scope.url
		}).success(function(response){
			$scope.projects = response;
			
			//If the array is empty
			if($scope.projects == ""){
				console.log("Empty projects. Creating empty projects array.");
				
				$scope.projects = [];
			} 
		}).error(function(data, status) {
			$scope.data = data || "Request for projects failed";
			$scope.status = status;
		//DEBUG	
			console.log("Type of data: " + typeof(data));
			console.log("ERROR in finding localhost project file: " + data);
		});		
});

/*
	ListContrller list and store projects.
*/
projectManager.controller("ListCtrl", function ($scope, $routeParams) {
		
});

//Add new project to the array
projectManager.controller("AddCtrl", function($scope, $location, $http){
	var defaultProject = {
        title : "",
		description : "",
		duedate: "",
		team: "",
		status: ""
    };
	$scope.project = {}; 
	$scope.addTheProject = function(){
		//Push it onto the browser's copy of the projects
		$scope.projects.push($scope.project);
		
		update($scope, $http);
	
		$location.url("sub/list.html");
	};
	
	$scope.clearTheForm = function(){
		$scope.project.title="";
		$scope.project.description="";
		$scope.project.duedate="";
		$scope.project.team="";
		$scope.project.status="";
		
		$scope.form.$setPristine();
		$scope.project = defaultProject;
	};
});

//Delete the project
projectManager.controller("DeleteCtrl", function($scope, $routeParams, $location, $http){
	$scope.project = $scope.projects[$routeParams.id_project];
	$scope.deleteTheProject = function(){
		$scope.projects.pop($scope.project);
		update($scope, $http);
		$location.url("sub/list.html");
	};	
});

//Finds by the id_project the right project via the $routeParams
projectManager.controller("DetailCtrl", function($scope, $routeParams){
	/*
	$scope.model= {
		idProject: $routeParams.id_project
	}*/
	$scope.project = $scope.projects[$routeParams.id_project];
	
});

//Edits the projects details. 
projectManager.controller("EditCtrl", function($scope, $routeParams, $location, $http){
	var copyOfProject;
	//$scope.project = $scope.projects[$routeParams.id_project];
	
	//Make a copy of the project
	copyOfProject = $scope.projects[$routeParams.id_project];
	
	//put them into the models
	$scope.project_title = copyOfProject.title;
	$scope.project_description = copyOfProject.description;
	$scope.project_duedate = copyOfProject.duedate;
	$scope.project_team = copyOfProject.team;
	$scope.project_status = copyOfProject.status;
	
	
	$scope.saveTheProjectDetails = function(){
		//Now set the models to the project in the scope
		$scope.project = $scope.projects[$routeParams.id_project];
		$scope.project.title = $scope.project_title;
		$scope.project.description = $scope.project_description;
		$scope.project.duedate = $scope.project_duedate;
		$scope.project.team = $scope.project_team;
		$scope.project.status = $scope.project_status;
		
		update($scope, $http);
		
		//Go back to list
		$location.url("sub/list.html");
	}
	
	$scope.cancelTheProject = function(){
		//Put back what was the original
		resetFields($scope, copyOfProject);
	}
});

projectManager.controller("CommentCtrl", function($scope, $routeParams, $location, $http){
	$scope.project = $scope.projects[$routeParams.id_project];
	
});

//Directive that connects with the edit controller
projectManager.directive("buttonaction", function () {
	return function (scope, element, attrs) {
			element.bind("click", function(){
				scope.$apply(attrs.buttonaction); 
			})
	}
});

//Only call this if services are established
function update($scope, $http){
		$scope.method = "POST";
		$scope.url = "http://localhost/changeJsonFile.php";
		
		$http({
			method: $scope.method,
			url: $scope.url,
			data: $scope.projects,
			headers:{"Content-Type": "application/json"}

		//	cache: $templateCache
		})
		.success(function(data, status) {
			$scope.status = status;
			//$scope.data = data;
		})
		.error(function(data, status) {
			$scope.data = data || "Request failed";
			$scope.status = status;
		});

}

function resetFields($scope, copyOfProject){
		$scope.project_title = copyOfProject.title;
		$scope.project_description = copyOfProject.description;
		$scope.project_duedate = copyOfProject.duedate;
		$scope.project_team = copyOfProject.team;
		$scope.project_status = copyOfProject.status;
}