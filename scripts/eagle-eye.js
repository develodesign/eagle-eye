/**
 * Very simple jQuery plugin that'll test to see if an element is visible on the users window.
 * When the element is visible a call back can be fired.
 *
 * @todo Test for whether widths are over the horizontal fold.
 *
 * @copyright   (c) Develo Design 2015
 * @author      paul@develodesign.co.uk
 * @package     eagle-eye
 * @date        06/07/15
 */
+function ($) {

	'use strict';

	/**
	 * Eagle eye element
	 *
	 * @param $el
	 * @param options {object}
	 * @constructor
	 */
	var EagleEyeObject = function( $el, options ){

		this.$el = $el;

		this.options = $.extend( true, {

			// Should the onVisible callback fire when the element is only partially visible? By default it'll only fire
			// when the whole element is visible in the window.
			triggerOnPartial: false,

			// Callback for when the element is visible.
			onVisible: function( $el, dimensions ){ return true },

			// Callback for when the element is not visible
			onInvisible: function( $el, dimensions ){ return true }

		}, options );

		this.cacheDimensions();
	};

	/**
	 * Cache the elements dimensions
	 */
	EagleEyeObject.prototype.cacheDimensions = function(){

		this.elHeight = parseInt( this.$el.height() );

	};

	/**
	 * On scroll test if the element is visible
	 * Pass the element and the cached dimensions back to the callback.
	 */
	EagleEyeObject.prototype.onScroll = function( windowDimensions, windowScrollTop ){

		var dimensions = {
			el: {
				dimensions:  {},
				offsetTop: this.elOffsetTop
			},
			window: {
				dimensions: windowDimensions,
				scrollTop: windowScrollTop
			}
		};

		if( this.isVisible() ){

			dimensions.el.dimensions.height = this.elOffsetTop;
			this.options.onVisible( this.$el )
		}
		else {

			dimensions.el.dimensions.height = this.elOffsetTop;
			this.options.onInvisible( this.$el );
		}

	};

	/**
	 * Test the element is visible in the window.
	 *
	 * @return boolean
	 */
	EagleEyeObject.prototype.isVisible = function(){

		var elTop = this.elOffsetTop = this.$el[0].getBoundingClientRect().top;
		var elBottom = this.$el[0].getBoundingClientRect().bottom;

		return this.options.triggerOnPartial ?
			elTop < window.innerHeight && elBottom >= 0:
			elTop >= 0 && elBottom <= window.innerHeight;
	};

	/**
	 * Eagle eye controller
	 *
	 * @constructor
	 */
	var EagleEye = function(){

		// Store all the elements that we need to test.
		this.elements = [];

		// Cache the window element
		this.$window = $( window );

		this.cacheDimensions();
		this.setupBindings();
	};

	/**
	 * Cache the window dimensions
	 *
	 * @todo add widths for when we test horizontal
	 */
	EagleEye.prototype.cacheDimensions = function(){

		this.windowDimensions = {

			height: parseInt( this.$window.height() )
		}
	};

	/**
	 * Setup bindings on scroll and resize
	 */
	EagleEye.prototype.setupBindings = function(){

		this.$window.on( 'scroll', $.proxy( this.onScroll, this ) );
	};

	/**
	 * On resize cache all the dimensions
	 */
	EagleEye.prototype.onResize = function(){

		this.cacheDimensions();

		for( var i = 0; i < this.elements.length; i ++ ){

			this.elements[i].cacheDimensions();
		}
	};

	/**
	 * When we scroll test each element is within the bounds of the window.
	 */
	EagleEye.prototype.onScroll = function(){

		var windowScrollTop = this.$window.scrollTop();

		for( var i = 0; i < this.elements.length; i ++ ){

			this.elements[i].onScroll( this.windowDimensions, windowScrollTop );
		}
	};

	/**
	 * Global object that'll look after all the elements that we need to watch.
	 */
	window.eagleEye = new EagleEye();

	/**
	 * Attach the plugin to all elements
	 *
	 * @param options {object}
	 *
	 * @returns {$.fn}
	 */
	$.fn.eagleEye = function( options ) {

		this.each( function(){

			var $el = $( this );

			window.eagleEye.elements.push( new EagleEyeObject( $el, options ) );

			$el.data( 'eagleEye', window.eagleEye.elements[window.eagleEye.elements.length - 1] );
		} );

		return this;
	};

}( jQuery );
