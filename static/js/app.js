// Defin our angular module for the application
var ats = angular.module( 'ats' , [
    'ngRoute',          // individual routing for pages
    'ui.bootstrap',     // avoid using jQuery at all costs, as the doctor ordered
    'appControllers'    // file containing controllers for the page
]);

// Configure the module 
ats.config([ '$routeProvider','$locationProvider',
    function( $routeProvider , $locationProvider )
    {
        $routeProvider
            .when('/', {
                templateUrl: '/static/partials/main.html',
                controller: 'MainController',
                controllerAs: 'mc'
            })
            .otherwise({
                redirectTo: '/'
            });

        // Get rid of hashes in the URL
        $locationProvider.html5Mode(true);
    }
]);

