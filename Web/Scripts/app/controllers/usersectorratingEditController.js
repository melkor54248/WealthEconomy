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

    var controllerId = 'userSectorRatingEditController';
    angular.module('main')
        .controller(controllerId, ['userSectorRatingService',
            'sectorService',
            'userService',
            'logger',
            '$location',
            '$routeParams',
            userSectorRatingEditController]);

    function userSectorRatingEditController(userSectorRatingService,
		sectorService,
		userService,
		logger,
		$location,
		$routeParams) {

        logger = logger.forSource(controllerId);
        var logError = logger.logError;
        var logSuccess = logger.logSuccess;

        var isNew = $location.path() === '/UserSectorRating/new';
        var isSaving = false;

        // Controller methods (alphabetically)
        var vm = this;
        vm.sectorSet = [];
        vm.userSet = [];
        vm.cancelChanges = cancelChanges;
        vm.isSaveDisabled = isSaveDisabled;
        vm.userSectorRating = null;
        vm.saveChanges = saveChanges;
        vm.hasChanges = hasChanges;

        initialize();

        /*** Implementations ***/

        function cancelChanges() {

            $location.path('/UserSectorRating/');

            if (userSectorRatingService.hasChanges()) {
                userSectorRatingService.rejectChanges();
                logWarning('Discarded pending change(s)', null, true);
            }
        }

        function hasChanges() {
            return userSectorRatingService.hasChanges();
        }

        function initialize() {

            sectorService.getSectorSet()
                .then(function (data) {
                    vm.sectorSet = data;
                });

            // TODO Catch?

            userService.getUserSet()
                .then(function (data) {
                    vm.userSet = data;
                });

            // TODO Catch?

            if (isNew) {
                // TODO Only for development, create test entity ?!
            }
            else {
                userSectorRatingService.getUserSectorRating($routeParams.Id)
                    .then(function (data) {
                        vm.userSectorRating = data;
                    })
                    .catch(function (error) {
                        logError("Boooo, we failed: " + error.message, null, true);
                        // Todo: more sophisticated recovery. 
                        // Here we just blew it all away and start over
                        // refresh();
                    });
            }
        };

        function isSaveDisabled() {
            return isSaving ||
                (!isNew && !userSectorRatingService.hasChanges());
        }

        function saveChanges() {

            if (isNew) {
                userSectorRatingService.createUserSectorRating(vm.userSectorRating);
            }

            isSaving = true;
            return userSectorRatingService.saveChanges()
                .then(function () {
                    logSuccess("Hooray we saved", null, true);
                    $location.path('/UserSectorRating/');
                })
                .catch(function (error) {
                    logError("Boooo, we failed: " + error.message, null, true);
                    // Todo: more sophisticated recovery. 
                    // Here we just blew it all away and start over
                    // refresh();
                })
                .finally(function () {
                    isSaving = false;
                });
        }
    };
})();