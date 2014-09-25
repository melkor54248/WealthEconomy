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

    var controllerId = 'userElementItemElementFieldEditController';
    angular.module('main')
        .controller(controllerId, ['userElementItemElementFieldService',
            'elementItemElementFieldService',
            'userService',
            'logger',
            '$location',
            '$routeParams',
            userElementItemElementFieldEditController]);

    function userElementItemElementFieldEditController(userElementItemElementFieldService,
		elementItemElementFieldService,
		userService,
		logger,
		$location,
		$routeParams) {
        logger = logger.forSource(controllerId);

        var isNew = $location.path() === '/manage/userElementItemElementField/new';
        var isSaving = false;

        // Controller methods (alphabetically)
        var vm = this;
        vm.elementItemElementFieldSet = [];
        vm.userSet = [];
        vm.cancelChanges = cancelChanges;
        vm.isSaveDisabled = isSaveDisabled;
        vm.userElementItemElementField = null;
        vm.saveChanges = saveChanges;
        vm.hasChanges = hasChanges;

        initialize();

        /*** Implementations ***/

        function cancelChanges() {

            $location.path('/manage/userElementItemElementField');

            if (userElementItemElementFieldService.hasChanges()) {
                userElementItemElementFieldService.rejectChanges();
                logWarning('Discarded pending change(s)', null, true);
            }
        }

        function hasChanges() {
            return userElementItemElementFieldService.hasChanges();
        }

        function initialize() {

            elementItemElementFieldService.getElementItemElementFieldSet(false)
                .then(function (data) {
                    vm.elementItemElementFieldSet = data;
                });

            userService.getUserSet(false)
                .then(function (data) {
                    vm.userSet = data;
                });

            if (isNew) {
                // TODO For development enviroment, create test entity?
            }
            else {
                userElementItemElementFieldService.getUserElementItemElementField($routeParams.Id)
                    .then(function (data) {
                        vm.userElementItemElementField = data;
                    })
                    .catch(function (error) {
                        // TODO User-friendly message?
                    });
            }
        };

        function isSaveDisabled() {
            return isSaving ||
                (!isNew && !userElementItemElementFieldService.hasChanges());
        }

        function saveChanges() {

            if (isNew) {
                userElementItemElementFieldService.createUserElementItemElementField(vm.userElementItemElementField);
            } else {
                // To be able to do concurrency check, RowVersion field needs to be send to server
				// Since breeze only sends the modified fields, a fake modification had to be applied to RowVersion field
                var rowVersion = vm.userElementItemElementField.RowVersion;
                vm.userElementItemElementField.RowVersion = '';
                vm.userElementItemElementField.RowVersion = rowVersion;
            }

            isSaving = true;
            userElementItemElementFieldService.saveChanges()
                .then(function (result) {
                    $location.path('/manage/userElementItemElementField');
                })
                .catch(function (error) {
                    // Conflict (Concurrency exception)
                    if (error.status === '409') {
                        // TODO Try to recover!
                    }
                })
                .finally(function () {
                    isSaving = false;
                });
        }
    };
})();
