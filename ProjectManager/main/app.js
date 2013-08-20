
//Routing
var projectManager = angular.module("projectManager",[])
	.config(function($routeProvider) {
		$routeProvider
		.when("/", 
		{
			templateUrl: "sub/list.html",
			controller: "ListCtrl"
		})
		.when("/list",
		{
			templateUrl: "sub/list.html",
			controller: "ListCtrl"
		})
		.when("/add",
		{
			templateUrl: "sub/add.html",
			controller: "AddCtrl"
		})
		.when("/delete/:id_project",
		{
			templateUrl: "sub/delete.html",
			controller: "DeleteCtrl"
		})
		//Note that :id_project is going to be refered in the DetailCtrl
		.when("/detail/:id_project",
		{
			templateUrl: "sub/detail.html",
			controller: "DetailCtrl",
		})
		.when("/edit/:id_project",
		{
			templateUrl: "sub/edit.html",
			controller: "EditCtrl"
		})
		.when("/comment/:id_project",
		{
			templateUrl: "sub/comment.html",
			controller: "CommentCtrl"
		})
		.otherwise(
		{
			//If page does not exist, redirect to the root
			redirectTo: "/"
		});
		
});







