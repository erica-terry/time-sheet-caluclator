/**
* TimeSheetCalculator Module
*
* Description Calculates hours worked during a week
*/
angular.module('TimeSheetCalculator', [])
.controller('CalculatorController', ['$scope', 
    function($scope) {
        $scope.title = "Time Sheet Calculator"

        var vm = this;
        vm.hours = 0;


        vm.days = [
            {name: 'Monday', code: 'mon', hours: 0},
            {name: 'Tuesday', code: 'tues', hours: 0},
            {name: 'Wednesday', code: 'wed', hours: 0},
            {name: 'Thursday', code: 'thur', hours: 0},
            {name: 'Friday', code: 'fri', hours: 0},
            {name: 'Saturday', code: 'sat', hours: 0},
            {name: 'Sunday', code: 'sun', hours: 0},
        ];

        // returns array of numbers from min to max, increasing by step
        vm.range = function(min, max, step) {
            step = step || 1;
            var input = [];
            for(var i = min ; i <= max ; i+=step) {
                input.push(i);
            }
            return input;
        };


        // Calculates the hours per day worked and the hours worked for the week
        vm.calculateHours = function() {
           
            this.hours = 0;
            var hours;

            function getTwelveHourTime( hours, meridiem ) {
                if(meridiem == 'pm') {
                    return +hours * 12;
                }
                else { return hours; }
            };

            for(var i = 0 ; i < vm.days.length ; i++) {
                hrStart = $('#' + vm.days[i].code + '_starthour').val();
                minStart = $('#' + vm.days[i].code + '_startmin').val();
                meriStart = $('#' + vm.days[i].code + '_startmerid').val();

                hrEnd = $('#' + vm.days[i].code + '_endhour').val();
                minEnd = $('#' + vm.days[i].code + '_endmin').val();
                meriEnd = $('#' + vm.days[i].code + '_endmerid').val();

                var twelveHrStart = getTwelveHourTime(hrStart, meriStart);
                var twelveHrEnd = getTwelveHourTime(hrEnd, meriEnd);

                var result = parseFloat(twelveHrEnd - twelveHrStart) + parseFloat(+minEnd - +minStart)/60.0;
                if(result < 0.0) {
                    this.hours = 0;
                    break;

                    alert("Error: Your start time must be before your end time on the same day.");
                }

                vm.days[i].hours = result;
                this.hours +=  result;
            }

        };
    }
])
// returns input number to two digits
.filter('two_digits', function() {
    return function(input) {
        if(+input < 10) {
            input = '0' + input;
        }

        return input;
    }
});