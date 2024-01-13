/**
 * WMS-CUSTOM-TAGS Directive library:
 * """"""""""""""""""""""""""""""""""
 * Created by Hariharaselvam Balasubramanian on 8/26/16.
 *
 * Custom tags for wms
 *
 */

window[appName].directive("wmsStatusLed", function () {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/tags/status.html",

        scope: {
            device: '=options'
        }


    };
});

window[appName].directive("wmsClientSessions", function () {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/tags/uesessions.html",

        scope: {
            ues: '=options'
        }


    };
});

window[appName].directive("wmsAccessPoints", function ($rootScope) {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/tags/accesspoints.html",

        scope: {
            ap: '=options'
        }


    };
});

window[appName].directive("wmsControllers", function () {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/tags/controllers.html",

        scope: {
            controllers: '=options'
        }


    };
});

window[appName].directive("wmsCpuLoad", function () {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/tags/cpuload.html",

        scope: {
            load: '=options'
        }


    };
});

window[appName].directive("wmsCpuState", function () {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/tags/cpustate.html",

        scope: {
            usage: '=options'
        }


    };
});

window[appName].directive("wmsDisk", function () {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/tags/disk.html",

        scope: {
            disks: '=options'
        }


    };
});

window[appName].directive("wmsDiskTable", function () {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/tags/disk_table.html",

        scope: {
            disks: '=options'
        }


    };
});

window[appName].directive("wmsMemory", function () {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/tags/memory.html",

        scope: {
            mem: '=options'
        }


    };
});

window[appName].directive("wmsRxTp", function () {
    return {

        restrict: 'E',

        template: '<span style="color: #000080;"><i class="fa fa-arrow-up"></i> {{ rx }}</span>',

        scope: {
            rx: '=rx'
        }


    };
});

window[appName].directive("wmsTxTp", function () {
    return {

        restrict: 'E',

        template: '<span style="color: #008000;"><i class="fa fa-arrow-down"></i> {{ tx }}</span>',

        scope: {
            tx: '=tx'
        }


    };
});