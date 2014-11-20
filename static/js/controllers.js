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

            // --------------------------------------------
            // declare variables 

            var _self = this;                   // the easy way to avoid binding, apply and call when you don't need it
           
            this.update_cycle = 2000;           // how often the world clocks update, in milliseconds           
            this.update_interval = 'not set';   // the container for our interval

            this.toronto_time = new Date();        
            this.london_time = null;        
            this.london_offset = -6;
            this.sydney_time = null;        
            this.sydney_offset = -13;

            // --------------------------------------------
            // time display

            // formats a date object into a fancy
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

            // updates all clocks based on time interval 
            this.update_times = function()
            {
                // update the time by the seconds interval
                 _self.toronto_time.setSeconds( _self.toronto_time.getSeconds() + _self.update_cycle/1000 );

                // update our clocks
                $scope.toronto_time = this.format( this.toronto_time , 0 );
                $scope.london_time = this.format( this.toronto_time , this.london_offset );
                $scope.sydney_time = this.format( this.toronto_time , this.sydney_offset );

                // update the DOM
                $scope.$apply();
            };

            // --------------------------------------------
            // setter functions

            this.set_update_interval = function( interval )
            {
                this.update_cycle = interval;
                this.stop_cycle();
                this.start_cycle();
            }

            //
            this.set_time = function( time )
            {   
                var time_array = time.split(":");  

                this.toronto_time.setHours( time_array[0] );
                this.toronto_time.setMinutes( time_array[1] );
                this.toronto_time.setSeconds( time_array[2] );
            }

            // sets the time offset for a particular city, relative to Toronto
            this.set_offset = function( city , offset ){
                console.log(city);
                var selector = city + '_offset';
                var which_offset = 'new_offset_' + city;
                _self[selector] = parseInt( $scope[which_offset] );
            }

            // --------------------------------------------
            // loop functions

            // function to start the cycle
            this.start_cycle = function(){
                // create an interval that runs the update function every predefined cycle length
                _self.update_interval = setInterval( function(){ _self.update_times() } , _self.update_cycle );
            };
            
            // should we ever need to stop
            this.stop_cycle = function(){
                clearInterval( _self.update_interval );
            };

            // --------------------------------------------
            // setup

            this.init = function(){
                $scope.fuck = _self.toronto_time;
                this.start_cycle();
            };
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

