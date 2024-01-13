/**
 * Created by hariharaselvam on 8/9/16.
 *
 *  This directive can be used for enter key events on text boxes
 */
window[appName].directive('wmsEnterKey', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.wmsEnterKey);
                });
                event.preventDefault();
            }
        });
    };
});

window[appName].directive('wmsRightClick', function() {
    return function(scope, element, attrs) {
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                scope.$eval(attrs.wmsRightClick);
            });
            event.preventDefault();
        });
    };
});
