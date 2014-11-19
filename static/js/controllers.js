// Group our controllers together
var appControllers = angular.module('appControllers', []);

// -----------------------------------------------------------------------
// Element Directives

    // The custom directive (html element) for the world clock display
    appControllers.directive('clocks' , function(){
        return {
            restrict: 'E',
            templateUrl: '/static/partials/clocks.html',
            controller: 'ClocksController',
            controllerAs: 'cc'
        }
    });

    // Settings Directive
    appControllers.directive('settings' , function(){
        return {
            restrict: 'E',
            templateUrl: '/static/partials/settings.html',
            controller: 'SettingsController',
            controllerAs: 'sc'
        }
    });

// -----------------------------------------------------------------------
// Controllers

    // Main Controller
    appControllers.controller('MainController', [
                 '$scope', // lining things up this way makes it easy to catch typos when dealing with many directives
        function( $scope )
        {
            console.log( "Loading MainController" );
            

        }
    ]);

    // Clocks
    appControllers.controller('ClocksController' , [
                 '$scope',
        function( $scope )
        {
            console.log('Loading ClocksController');

            var _self = this;                   // the easy way to avoid binding, apply and call when you don't need it
           
            this.update_cycle = 2000;           // how often the world clocks update, in milliseconds           
            this.update_interval = 'not set';   // the container for our interval

            this.toronto_time = new Date();        

            this.london_time = null;        
            this.london_offset = -6;

            this.sydney_time = null;        
            this.sydney_offset = -13;

            // formats a date object
            this.format = function( date , offset )
            {
                var offset = !offset ? 0 : offset;
                var string = '';

                var hours = date.getHours() + offset;
                var minutes = date.getMinutes();
                var seconds = date.getSeconds();
                
                // if single digits, prepend a 0 , otherwise use the value as-is
                string += ( hours < 10 ) ? ('0' + hours ) : hours;
                string += ':';
                string += ( minutes < 10 ) ? ('0' + minutes ) : minutes;
                string += ':';
                string += ( seconds < 10 ) ? ('0' + seconds ) : seconds;

                console.log( "the string is:" , string );
                return string;                
            };

            this.update_times = function()
            {
                console.log("updating world clocks...");

                // update the time by the seconds interval
                 _self.toronto_time.setSeconds( _self.toronto_time.getSeconds() + _self.update_cycle/1000 );

                // update our clocks
                $scope.fuck = _self.format( _self.toronto_time , 0 );
                $scope.london_time = this.format( this.toronto_time , this.london_offset );
                $scope.sydney_time = this.format( this.toronto_time , this.sydney_offset );

                $scope.$apply();
            };

            // set functions

            this.set_time = function( time )
            {   
                console.log("time is:", time);
                var time_array = time.split(":");  
                console.log("time_array is:", time_array);              
                this.toronto_time.setHours( time_array[0] );
                this.toronto_time.setMinutes( time_array[1] );
                this.toronto_time.setSeconds( time_array[2] );
            }

            this.set_offset = function( city , offset ){
                var selector = city + '_offset';
                _self[selector] = offset;
            }

            // function to start the cycle
            this.start_cycle = function(){
                // create an interval that runs the update function every predefined cycle length
                _self.update_interval = setInterval( function(){ _self.update_times() } , _self.update_cycle );
            };
            
            // should we ever need to stop
            this.stop_cycle = function(){
                clearInterval( _self.update_interval );
            };

            // set everything up
            this.init = function(){
                $scope.fuck = _self.toronto_time;
                this.start_cycle();
            };

            // Let's get this show on the road!
            this.init();

        }
    ]);

    // Settings
    // Handles the setting of times , and refreshes 
    appControllers.controller('SettingsController' , [
                 '$scope',
        function( $scope )
        {
            console.log('Loading SettingsController');
        }
    ]);



// REference: 
/*
            swal({
                title: "Chicken Killing Recipe",   
                text: "Step 1: grab a chicken.\nStep 2: kill the chicken.",   
                imageUrl: "http://lorempixel.com/200/200"
            });


appControllers.directive('mainNavigation' , function()
{
    return {
        restrict: 'E',
        templateUrl: '/static/partials/main-navigation.html',
        controller: 'MainNavigationController',
        controllerAs: 'mnc'
    }
});
*/
