'use strict';

App.controller('ItemListController', ['async', function(async) {
          alert("Ctl");
          var self = this;
          self.items=async;

    $scope.gridOptions = {
        data: 'items',
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,

        //field : id is the key from the data coming from server side
        columnDefs:[
            {displayName:'stuId',field:'stuId'},
            {displayName:'stuName',field:'stuName'},
            {displayName:'stuSex',field:'stuSex'},
        ]
    };
}]);
