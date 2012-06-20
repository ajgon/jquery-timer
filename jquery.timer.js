/*!
 * jQuery Timer Plugin
 * https://github.com/ajgon/jquery-timer
 *
 * Copyright 2012, Igor Rzegocki
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 *
 */
/*jslint browser: true, nomen: true, white: true */
/*properties
    _activate, _options, _pausedInterval, _startTime, _timerFunction, _timerID,
    extend, getTime, interval, kill, match, pause, pauseCallback, prototype,
    resume, resumeCallback, start, startCallback, stop, stopCallback, timer,
    timerCallback, useSetTimeout
*/

var jQuery = typeof(jQuery) === 'undefined' ? null : jQuery;

(function($) {

    "use strict";

    if($ === null) {
        throw 'jQuery is not defined';
    }

    var Timer = function(options) {

        var defaults = {
            timerCallback:  function() {},
            startCallback:  function() {},
            pauseCallback:  function() {},
            resumeCallback: function() {},
            stopCallback:   function() {},
            interval:       1000,
            useSetTimeout:  false
        };

        options.interval = parseInt(options.interval, 10);
        options.interval = isNaN(options.interval) ? defaults.interval : options.interval * 1000;
        this._options = $.extend(defaults, options);

        this._timerFunction = options.useSetTimeout ? 'Timeout' : 'Interval';
        this._timerID = null;
        this._startTime = 0;
        this._pausedInterval = -1;
    };

    Timer.prototype = {
        _activate: function() {
            this._startTime = new Date().getTime();
            this._timerID = window['set' + this._timerFunction](this._options.timerCallback, this._options.interval);
        },
        start: function() {
            if(this._startTime !== 0) {
                throw 'Timer is running';
            }
            this._activate();
            this._options.startCallback();
        },

        pause: function() {
            if(this._startTime === 0 || this._timerID === null) {
                throw 'Timer not started';
            }
            window['clear' + this._timerFunction](this._timerID);
            this._pausedInterval = (new Date().getTime() - this._startTime) % this._options.interval;
            this._timerID = null;
            this._options.pauseCallback();
        },

        resume: function(fullFrame) {
            fullFrame = typeof(fullFrame) === 'undefined' ? false : fullFrame;
            if(this._pausedInterval === -1) {
                throw 'Timer not paused';
            }
            if(fullFrame) {
                var self = this;
                setTimeout(function() {
                    self._options.timerCallback();
                    if(!self._options.useSetTimeout) {
                        self._activate();
                    }
                }, this._options.interval - this._pausedInterval);
            } else {
                this._activate();
            }
            this._options.resumeCallback();
        },

        stop: function() {
            if(this._startTime === 0 || this._timerID === null) {
                throw 'Timer not started';
            }
            window['clear' + this._timerFunction](this._timerID);
            this._startTime = 0;
            this._pausedInterval = -1;
            this._timerID = null;
            this._options.stopCallback();
        },

        kill: function() {
            if(this._timerID !== null) {
                window['clear' + this._timerFunction](this._timerID);
                this._startTime = 0;
                this._pausedInterval = -1;
                this._timerID = null;
            }
        }
    };

    $.timer = function(name, callback, interval, options) {
        if(typeof(name) !== 'string' || !name.match(/^[a-zA-Z][a-zA-Z_0-9]*$/)) {
            throw 'Invalid timer name (it must start with a letter and cannot contain other characters than letters, numbers and underscore';
        }
        if(typeof(callback) === 'undefined') {
            return $.timer[name];
        }
        if(callback === null) {
            $.timer[name].kill();
            delete($.timer[name]);
            return true;
        }
        if(typeof(callback) !== 'function') {
            throw 'Please provide a callback function for setTimer/setInterval function';
        }
        interval = parseInt(interval, 10);
        if(isNaN(interval) || interval <= 0) {
            throw 'Please provide an interval for timer (in seconds)';
        }

        options = options || {};

        options.timerCallback = callback;
        options.interval = interval;
        $.timer[name] = new Timer(options);
        return null;
    };

}(jQuery));
