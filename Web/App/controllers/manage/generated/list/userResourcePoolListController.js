//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

(function () {
    'use strict';

    var controllerId = 'userResourcePoolListController';
    angular.module('main')
        .controller(controllerId, ['userResourcePoolFactory',
            'logger',
			userResourcePoolListController]);

    function userResourcePoolListController(userResourcePoolFactory,
        logger) {
        logger = logger.forSource(controllerId);

        var vm = this;
        vm.deleteUserResourcePool = deleteUserResourcePool;
        vm.userResourcePoolSet = [];

        initialize();

        function initialize() {
            getUserResourcePoolSet();
        };

        function deleteUserResourcePool(userResourcePool) {
            userResourcePoolFactory.deleteUserResourcePool(userResourcePool);

            userResourcePoolFactory.saveChanges()
                .then(function () {
                    vm.userResourcePoolSet.splice(vm.userResourcePoolSet.indexOf(userResourcePool), 1);
                    logger.logSuccess("Hooray we saved", null, true);
                })
                .catch(function (error) {
                    logger.logError("Boooo, we failed: " + error.message, null, true);
                    // Todo: more sophisticated recovery. 
                    // Here we just blew it all away and start over
                    // refresh();
                })
        };

        function getUserResourcePoolSet() {
            userResourcePoolFactory.getUserResourcePoolSet(false)
			    .then(function (data) {
                    vm.userResourcePoolSet = data;
                });
        }
    };
})();