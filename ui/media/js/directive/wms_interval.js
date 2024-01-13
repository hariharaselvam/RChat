/**
 * WMS-TIME-INTERVAL directive library:
 * """"""""""""""""""""""""""""""""""""
 * Created by Hariharaselvam Balasubramanian on 8/29/16.
 *
 * This directive is used for date time interval on drill down pages and dashboard pages
 */
window[appName].directive("wmsTimeInterval", function (http) {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/interval.tpl.html",

        scope: {
            config: '=options',
            show: '&showTab',
            reload: '&reload'
        },

        controller: function ($scope) {

            $('#daterange').daterangepicker(
                {
                    timePicker: true,
                    format: 'YYYY-MM-DD hh:mm:ss'
                },
                function (start, end) {
                    $scope.graph_button = 'CUSTOM';
                    $('#reservationtime').val(start.format('MMMM D, YYYY h:mm A') + ' - ' + end.format('MMMM D, YYYY h:mm A'));
                    var startdate = start.format('YYYY-MM-DD H:mm:ss');
                    var enddate = end.format('YYYY-MM-DD H:mm:ss');
                    var api = '/api/ui/daterange/?start=' + startdate + '&end=' + enddate;
                    $scope.call_api(api);
                }
            );

            $scope.select_range = function (range) {
                var api = "/api/ui/daterange/";
                api = (range == "WEEK") ? "/api/ui/daterange/?days=7" : api;
                api = (range == "MONTH") ? "/api/ui/daterange/?days=30" : api;
                $scope.graph_button = range;
                $scope.call_api(api);
            };

            $scope.call_api = function (api) {

                http.Requests('get', api, '').success(function (response) {
                    $scope.start_date = response.start;
                    $scope.end_date = response.end;
                    $scope.local_timezone = response.timezone;
                });

            };
            $scope.call_api("/api/ui/daterange/");
            $scope.graph_button = "DAY"

        },
        link: function (scope, element, attrs) {

            scope.$watchCollection('start_date', function () {
                console.log("Trigger chart change from interval lib...");
                scope.show({arg1: scope.start_date, arg2: scope.end_date});
            });
            scope.$watchCollection('end_date', function () {
                console.log("Trigger chart change from interval lib...");
                scope.show({arg1: scope.start_date, arg2: scope.end_date});
            });


        }


    };
});