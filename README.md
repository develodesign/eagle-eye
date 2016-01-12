# Eagle Eye

A simple jQuery plugin to test if an element is visible in the users window.

## Installation

Install through bower:
```bower install eagle-eye```

Plugin requires jQuery to work so ensure that is available before linking to eagle eye.

```
    <script src="bower-components/jquery/dist/jquery.js">
    <script src="bower-components/eagle-eye/scripts/eagle-eye.js">
```

There is a minified version too if you would prefer to use that:

```
    <script src="bower-components/eagle-eye/scripts/eagle-eye.min.js">
```

## Setup

Eagle eye exposes two callbacks for each element when they are initialised so you can define your own functionality 
when the elements come into view.

```
    jQuery( function( $ ){
    
        $( '.element' ).eagleEye({

            triggerOnPartial: false, // Default value, set to true to trigger visible when an element is only partially in view.
        
            onInvisible: function( $el ){
                // Do Something
            },
            
            onVisible: function( $el ){
                // Do something
            }
        });
    });
```

Have a look at the example in the example directory for more information.

## Todo

- Horizontal fold


