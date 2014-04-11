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

    var serviceId = 'userResourcePoolOrganizationService';
    angular.module('main')
        .factory(serviceId, ['dataContext', 'logger', userResourcePoolOrganizationService]);

    function userResourcePoolOrganizationService(dataContext, logger) {

        // Logger
        logger = logger.forSource(serviceId);
        var logError = logger.logError;
        var logSuccess = logger.logSuccess;
        var logWarning = logger.logWarning;

        // To determine whether the data will be fecthed from server or local
        var minimumDate = new Date(0);
        var fetchedOn = minimumDate;

        // Service methods (alphabetically)
        var service = {
            createUserResourcePoolOrganization: createUserResourcePoolOrganization,
            deleteUserResourcePoolOrganization: deleteUserResourcePoolOrganization,
            getChanges: getChanges,
            getChangesCount: getChangesCount,
            getUserResourcePoolOrganizationSet: getUserResourcePoolOrganizationSet,
            getUserResourcePoolOrganization: getUserResourcePoolOrganization,
            hasChanges: hasChanges,
            rejectChanges: rejectChanges,
            saveChanges: saveChanges
        };

        return service;

        /*** Implementations ***/

        function createUserResourcePoolOrganization(userResourcePoolOrganization) {
            return dataContext.manager.createEntity('UserResourcePoolOrganization', userResourcePoolOrganization);
        }

        function deleteUserResourcePoolOrganization(userResourcePoolOrganization) {
            userResourcePoolOrganization.entityAspect.setDeleted();
        }

        function getChanges() {
            return dataContext.getChanges();
        }

        function getChangesCount() {
            return dataContext.getChangesCount();
        }

        function getUserResourcePoolOrganizationSet(forceRefresh) {

            var count;
            if (forceRefresh) {
                if (dataContext.hasChanges()) {
                    count = dataContext.getChangesCount();
                    dataContext.rejectChanges(); // undo all unsaved changes!
                    logWarning('Discarded ' + count + ' pending change(s)', null, true);
                }
            }

            var query = breeze.EntityQuery
				.from("UserResourcePoolOrganization")
				.expand(['User', 'ResourcePoolOrganization'])
            ;

            // Fetch the data from server, in case if it's not fetched earlier or forced
            var fetchFromServer = fetchedOn === minimumDate || forceRefresh;

            // Prepare the query
            if (fetchFromServer) { // From remote
                query = query.using(breeze.FetchStrategy.FromServer)
                fetchedOn = new Date();
            }
            else { // From local
                query = query.using(breeze.FetchStrategy.FromLocalCache)
            }

            return dataContext.manager.executeQuery(query)
                .then(success).catch(failed);

            function success(response) {
                count = response.results.length;
                logSuccess('Got ' + count + ' userResourcePoolOrganization(s)', response, true);
                return response.results;
            }

            function failed(error) {
                var message = error.message || "UserResourcePoolOrganization query failed";
                logError(message, error, true);
            }
        }

        function getUserResourcePoolOrganization(userResourcePoolOrganizationId, forceRefresh) {
            return dataContext.manager.fetchEntityByKey("UserResourcePoolOrganization", userResourcePoolOrganizationId, !forceRefresh)
                .then(success).catch(failed);

            function success(result) {
                return result.entity;
            }

            function failed(error) {
                var message = error.message || "getUserResourcePoolOrganization query failed";
                logError(message, error, true);
            }
        }

        function hasChanges() {
            return dataContext.hasChanges();
        }

        function rejectChanges() {
            dataContext.rejectChanges();
        }

        function saveChanges() {
            return dataContext.saveChanges();
        }
    }
})();
