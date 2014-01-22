/*
 * superHero
 * https://github.com/stefan/superhero
 *
 * Copyright (c) 2013 Stefan Ledin
 * Licensed under the MIT license.
 */

;(function($, window, document, undefined) {

    var defaults = {
        compensateFor: 0,
        inline: false,
        pushDown: false
    };

    function superHero (element, options) {
        this.element = element;
        this.options = $.extend( {}, defaults, options);
        if (this.options.pushDown) {
            this.nextElement = this.options.pushDown;
        }
        this.init();
    }

    superHero.prototype.init = function() {
        this.$window = $(window);
        this.$document = $(document);
        this.getWindowSize = {};
        this.bindEvents();
        this.setWindowSize();
        this.setHeroSize();
        if (this.nextElement) {
            this.pushDownElement();
        }

        // Set style on the container
        this.element.style.top = 0;
        this.element.style.left = 0;
        this.element.style.position = 'absolute';
        this.element.style.overflow = 'hidden';
    };

    superHero.prototype.setHeroSize = function() {
        this.element.style.width = this.getWindowSize.width + 'px';
        this.element.style.height = this.getWindowSize.height + 'px';
        this.element.style.maxHeight = this.element.querySelector('img').height + 'px';
    };

    superHero.prototype.pushDownElement = function() {
        var windowHeight, compensate, marginTop;

        marginTop = this.element.clientHeight;
        this.nextElement[0].style.marginTop = marginTop + 'px';
        this.nextElement[0].style.position = 'relative';
    };

    superHero.prototype.bindEvents = function() {
        var _this = this;
        this.$window.on('resize orientationchange', function () {
            _this.setWindowSize();
            _this.setHeroSize();
            if (_this.nextElement) {
                _this.pushDownElement();
            }
        });
    };

    superHero.prototype.setWindowSize = function() {
        var _this = this,
            width = _this.$window.width(),
            height = _this.$window.height();

        /*if (this.options.compensateFor) {
            height = height - _this.options.compensateFor.height()
        }*/

        this.getWindowSize = {
            width: width,
            height: _this.$window.height()
        };
    };

    $.fn.superHero = function(options) {
        return this.each(function(i) {
            new superHero(this, options);
        });
    };

}(jQuery, window, document));
