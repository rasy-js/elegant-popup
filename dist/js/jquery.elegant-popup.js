/*
 * jQuery-boilerplate plugin by Rasy 0.1.0
 * https://github.com/rasy-js
 *
 * Author: Rasy
 * Email: rasy.js@gmail.com
 * Website: /
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

;(function ( $, window, undefined ) {

  'use strict';

  var pluginName = 'elegantPopup',
      document = window.document,
      defaults = {
        popup: "popup_toggle",
        callback: function() {}
      };

  function Plugin( element, options ) {
    this.element = element;

    this.options = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype.init = function () {

    var $popupElem = $('#'+this.options.popup+'');
    var options = this.options;

    $popupElem.wrap('<div class="popup-overlay"><div class="popup trans-b"></div></div>');
    $popupElem.parent().prepend('<a href="#" class="popup-close"></a>');

      var $overlay = $popupElem.closest($('.popup-overlay')),
          $popup = $popupElem.parent();

      function too(elem) {
        elem.toggleClass('popup-animate');
      }

      function togg(elem) {
        $popup.toggleClass(elem);
      }

      $(this.element).on('click', function () {
        $('.elegant-popup').toggleClass('elegant-popup--hidden');
        too($overlay);
        togg('trans-a');
        togg('trans-b');
      });

      function positionPopup() {
        var top = ($(window).height() - $popup.outerHeight()) / 2,
            left = ($(window).width() - $popup.outerWidth()) / 2;

        $popup.css({
          'top': top,
          'left' : left
        });

      }
      positionPopup();

      $(window).resize(function () {
        positionPopup();
      });


      $overlay.on('click', function (event) {

        var e = event || window.event;

        if (e.target == this || e.target.getAttribute('class') === 'popup-close') {
          $overlay.removeClass('popup-animate');
          $popup.removeClass('trans-a').addClass('trans-b');
          setTimeout(function() {
            $('.elegant-popup').toggleClass('elegant-popup--hidden');
          }, 1000);

          options.callback();

          return false;
        }

      });

  };

  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
      }
    });
  };

}(jQuery, window));