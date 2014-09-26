/*jslint indent: 2, maxlen: 80, nomen: true */
/*globals $, window, console, jQuery, angular */

(function () {
  'use strict';

  function nyplFeedback($sce, $rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/components/nypl_feedback/nypl_feedback.html',
      replace: true,
      scope: {
        height: '@',
        width: '@',
        url: '@',
        side: '@'
      },
      link: function (scope, element, attrs) {
        scope.trusted_url = $sce.trustAsResourceUrl(scope.url);
        scope.feedback = 'Feedback';

        if (scope.side === 'left') {
          element.addClass('left');
        } else {
          element.addClass('right');
        }

        $rootScope.$watch('close_feedback', function (newVal, oldVal) {
          if (newVal) {
            $rootScope.close_feedback = false;
            element.removeClass('open');
            scope.feedback = 'Feedback';
          }
        });

        element.find('a').click(function () {
          element.toggleClass('open');
          scope.feedback = element.hasClass('open') ? 'Close' : 'Feedback';

          scope.$apply();
        });
      }
    };
  }

  angular
    .module('nyplFeedback', [])
    .directive('nyplFeedback', nyplFeedback);

})();