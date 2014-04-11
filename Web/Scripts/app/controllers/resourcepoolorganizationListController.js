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

    var controllerId = 'resourcePoolOrganizationListController';
    angular.module('main')
        .controller(controllerId, ['resourcePoolOrganizationService', 'logger', resourcePoolOrganizationListController]);

    function resourcePoolOrganizationListController(resourcePoolOrganizationService, logger) {

        logger = logger.forSource(controllerId);
        var logError = logger.logError;
        var logSuccess = logger.logSuccess;

        var vm = this;
        vm.deleteResourcePoolOrganization = deleteResourcePoolOrganization;
        vm.resourcePoolOrganizationSet = [];

        initialize();

        function initialize() {
            getResourcePoolOrganizationSet();
        };

        function deleteResourcePoolOrganization(resourcePoolOrganization) {
            resourcePoolOrganizationService.deleteResourcePoolOrganization(resourcePoolOrganization);

            resourcePoolOrganizationService.saveChanges()
                .then(function () {
                    vm.resourcePoolOrganizationSet.splice(vm.resourcePoolOrganizationSet.indexOf(resourcePoolOrganization), 1);
                    logSuccess("Hooray we saved", null, true);
                })
                .catch(function (error) {
                    logError("Boooo, we failed: " + error.message, null, true);
                    // Todo: more sophisticated recovery. 
                    // Here we just blew it all away and start over
                    // refresh();
                })
        };

        function getResourcePoolOrganizationSet() {
            return resourcePoolOrganizationService.getResourcePoolOrganizationSet().then(function (data) {
                return vm.resourcePoolOrganizationSet = data;
            });
        }
    };
})();
