/**
 * WMS-CHARTS Directive library:
 * """""""""""""""""""""""""""""
 * Created by Hariharaselvam Balasubramanian on 9/2/16.
 * for Wireless Monitoring Server Project
 *
 * This directive to generate series and pie charts with following options
 *
 *  1. Dual charts
 *      one without title and smaller size adoptable to the page, visible
 *      another with title and 980 size, hidden
 *  2. Expand to view the bigger chart
 *  3. Minimize the widget
 *  4. Pin to Dashboard
 *  5. Loading icon while data fetching from api
 *  6. Event table which will be filtered while zooming
 *
 *
 *  Template "/media/js/directive/templates/chart.tpl.html"
 *
 *
 *  How to use:
 *  """ "" """"
 *  <wms-charts options="db_throughput"></wms-charts> on your html ( controller scope )
 *  $scope.db_throughput = {
            "api": "/api/dashboardmain/total/throughput/", "type": "throughput", "start": $scope.start_date,
            "end": $scope.end_date, "event": "/api/dashboardmain/events/","popid":"tpgraphp"
        };

    on your js  ( controller function )

 *  Options:
 *  """"""""
 *  1. api          api link to fetch data
 *  2. start        start time to be send as parameter to api
 *  3. end          end time to be send as parameter to api
 *  4. additional   like frames error graph or ap perspective option as additional parameter
 *  5. type         template name of the graph
 *  6. events       optional api for events table to be placed along with pop up chart
 *  7. popid        id of the popup chart
 *
 *
 *
 */
window[appName].directive("wmsCharts", function (http, message, pin, graph, $rootScope) {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/chart.tpl.html",

        scope: {
            config: '=options'
        },

        controller: function ($scope) {

            $scope.chart = {};
            $scope.chart_pop = {};
            $scope.title = $scope.config.title;


            $scope.load_chart = function () {

                if ($scope.config.api == ""||$scope.config.api == undefined) {
                    return false;
                }
                $scope.loaded = false;

                $scope.api = $scope.config.api;


                if ($scope.config.start != undefined && $scope.config.end != undefined) {
                    $scope.api = $scope.api + "?start=" + $scope.config.start + "&end=" + $scope.config.end;
                }

                if ($scope.config.additional != undefined) {
                    $scope.api = $scope.api + $scope.config.additional;
                }

                if ($scope.config.event != undefined) {
                    $scope.events = {
                        "api": "",
                        "type": "events",
                        "tools": false,
                        "itemperpage": 5
                    };
                }

                http.Requests('get', $scope.api, '').success(function (response) {
                    log_plt($scope.config.api, response);
                    $scope.loaded = true;
                    var graphs = graph.Template($scope.config.type, response);
                    $scope.chart = graphs[0];
                    $scope.chart_pop = graphs[1];
                    $scope.title = graphs[2];


                });


            };


            $scope.get_style = function () {
                if ($scope.config.db_id != undefined) {
                    return {cursor: "move"};
                }
                return {}
            };

            $scope.get_opacity = function () {
                if (!$scope.loaded) {
                    return {opacity: 0.5};
                }
                return {}
            };


            $scope.pin_graph = function () {
                pin.popup($scope.config.api, $scope.config.type);
            };


            $scope.load_chart();

            $rootScope.$watchCollection('interval', function () {

                if ($rootScope.interval != {} && $scope.config.event!=undefined) {

                    $scope.events = {
                        "api": $scope.config.event,
                        "type": "events",
                        "tools": false,
                        "itemperpage": 5,
                        "start": $rootScope.interval.start, "end": $rootScope.interval.end
                    };


                }


            }, true);


        },
        link: function (scope, element, attrs) {
            scope.$watch('config', function () {
                scope.load_chart();
            });


        }
    };
});
