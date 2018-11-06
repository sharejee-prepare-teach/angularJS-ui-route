'use strict';

var App = angular.module('myApp',['ui.router','ngGrid']);

App.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	
	$urlRouterProvider.otherwise("/category")
	
	$stateProvider
	.state('category', {
		url: "/category",
		templateUrl: 'category',
		controller : "CategoryController as ctgController",
		resolve: {
            async: ['ItemService', function(ItemService) {
                return ItemService.fetchCategoryList();
           	}]
        }
	})

	.state('category.list', {
		url: '/{categoryId:[A-Za-z]{0,9}}',
		templateUrl: function(params){ return 'category/' + params.categoryId; },
		controller : "ItemListController as itemListCtrl",
		resolve: {
            async: ['ItemService', '$stateParams', function(ItemService, $stateParams) {
                return ItemService.fetchAllItems($stateParams.categoryId);
           	}]
        }
	})

	.state('category.list.detail', {
		url: '/{itemId:[0-9]{1,9}}',
		templateUrl: function(params){ return 'category/' + params.categoryId +'/'+params.itemId; },
		controller : "ItemDetailsController as itemDetailsCtrl",
		resolve: {
            async: ['ItemService', '$stateParams', function(ItemService, $stateParams) {
                return ItemService.fetchSpecificItem($stateParams.categoryId, $stateParams.itemId);
           	}]
        }
	})
	.state('pchome', {
        url: "/pchome",
        templateUrl: 'pchome',
        controller : "PCController as pcctl"
    })

}]);
App.controller("PCController", function($scope, $http) {
    _loadData();
	function _loadData() {
        $http({
            method: 'GET',
            url: '/Spring4MVCAngularJSRoutingWithUIRouterExample/pchomes'
        }).then(
            function(res) { // success
                $scope.pcs = res.data;
            },
            function(res) { // error
                console.log("Error: " + res.status + " : " + res.data);
            }
        );
    }
    $scope.gridOptions = {
        data: 'pcs',
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,

        //field : id is the key from the data coming from server side
        columnDefs:[
            {displayName:'ID',field:'id'},
            {displayName:'Brand',field:'brand'},
            {displayName:'Model',field:'model'},
        ]
    };
});
