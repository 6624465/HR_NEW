angular.module('ngHR').controller('HolidayListController', ['$scope', '$http', 'growl', '$filter', 'UtilityFunc', 'HolidayListService', 'growlService',
function ($scope, $http, growl, $filter, UtilityFunc, HolidayListService, growlService) {
    $scope.init = function () {
        $scope.Locations = {};
        $scope.countryId = null;
        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.HolidayListByLocation = {};
        $scope.HolidayList = {
            BranchId: UtilityFunc.BranchId(),
        }
        $scope.IsVisible=false;
        $scope.calendarView = 'month';
        $scope.viewDate = new Date();
        $scope.viewChangeEnabled = false;
        $scope.events = [];
    }

    $scope.addHolidayList = function () {
        $('#AddHolidayListDialog').modal('show');
    };

    $scope.formatDate = function (date) {
        if (date != null)
            return moment(date).format(UtilityFunc.DateFormat());
        else
            return null;
    }
    /*Save */

    $scope.onClickSaveHoliDayList = function (holiDayList) {
        holiDayList.Date = moment(holiDayList.Date).format('MM/DD/YYYY');
        HolidayListService.SaveHolidayList(holiDayList).then(function (response) {
            if (response.data && response.data.success == true) {
                $('#AddHolidayListDialog').modal('hide');
                growlService.growl(response.data.message, 'success');
            }
        })
    }
    /*SAVE*/


    $scope.onClickCancelHoliDayList = function () {
        $('#AddHolidayListDialog').modal('hide');
        $scope.HolidayList = {
            BranchID: UtilityFunc.BranchId(),
        }
    }

    $scope.SearchByLocation = function () {
        var countryId = $scope.countryId;
        if (countryId == 0 || countryId == null){
            growlService.growl('Please select location to get holidays.', 'danger');
            return;
        }

        HolidayListService.GetHolidayList(countryId).then(function (response) {
            if (response.data && response.data.success == true) {
                $scope.events = [];
                $scope.IsVisible = true;
                $scope.HolidayListByLocation = response.data.holidayList;
                angular.forEach($scope.HolidayListByLocation, function (val, idx) {
                    $scope.itemsToAdd = {
                        title: val.Description,
                        startsAt: val.Date,
                        endsAt: val.Date,
                        draggable: true,
                        resizable: true,
                        LocationId: val.CountryId,
                        Id: val.Id
                    };
                    $scope.events.push($scope.itemsToAdd);
                })
            }
            else {
                growlService.growl("No Holidays Found.", 'danger');
                $scope.IsVisible = false;
            }
        }, function (err) {
            growlService.growl(err, 'danger');
        })
    }

    
    $scope.eventClicked = function (event) {
        $scope.HolidayList.Id = event.Id;
        $scope.HolidayList.CountryId = event.LocationId;
        $scope.HolidayList.Date = $scope.formatDate(event.startsAt);
        $scope.HolidayList.Description = event.title;
        $('#AddHolidayListDialog').modal('show');
    };
   

    HolidayListService.GetBranchLocations().then(function (response) {
        if (response.data && response.data.success == true) {
            $scope.Locations = response.data.BranchLocations;
        }
        else
            growlService.growl("Error Occured.", 'danger');
    }, function (err) {
        growlService.growl(err, 'danger');

    })




    $scope.init();
}])
