jQuery( function( $ ){

	'use strict';

	var $all = $( 'body > *:not( footer, script )' );
	var total = $all.length;
	var visibleElements = [];
	var $total = $( 'footer .total-elements-visible' );
	var $visible = $( 'footer .number-of-elements-visible' );

	$all.each( function( index, el ){

		var id = 'el-' + index;

		$( el ).prop( 'id', id );
	});

	$all.eagleEye({

		triggerOnPartial: false,

		onInvisible: function( $el ){

			var pos = $.inArray( $el.prop( 'id' ), visibleElements );

			if( pos > -1 ){

				visibleElements.splice( pos, 1 );
				updateFooter();
			}
		},

		onVisible: function ($el) {

			var pos = $.inArray( $el.prop( 'id' ), visibleElements );

			if( pos == -1 ) {

				visibleElements.push( $el.prop( 'id' ) );
				updateFooter();
			}
		}
	});

	$total.text( total );

	var updateFooter = function(){

		$visible.text( visibleElements.length );
	};
});