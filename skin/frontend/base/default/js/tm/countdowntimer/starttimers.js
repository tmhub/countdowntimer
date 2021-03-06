;(function($){

    if (typeof $ === "undefined") { return; }

    var _webFontsInitialized = false,
        _timerFlip = '.tm-cdt-flip',
        _timerSimple = '.tm-cdt-simple',
        _timerNotStarted ='.not-started',
        _localeName = 'cu_LO',
        _texts = {
            'years' : 'Years',
            'months' : 'Months',
            'days' : 'Days',
            'hours' : 'Hours',
            'minutes' : 'Minutes',
            'seconds' : 'Seconds'
        };

    function _initializeWebFonts() {
        if (_webFontsInitialized) {
            return;
        }
        // initialize additional fonts
        WebFontConfig = {
            google: { families: [ 'Fredoka+One::latin', 'Josefin+Sans::latin' ] }
        };
        (function() {
            var wf = document.createElement('script');
            wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
            wf.type = 'text/javascript';
            wf.async = 'true';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(wf, s);
        })();
        _webFontsInitialized = true;
    };

    function _getSecondsLeft(obj){
        var end = $(obj).data('endDatetimeUtc');
        var left = 0;
        if (end) {
          left = end - Math.floor(Date.now() / 1000);
        }
        return (left < 0) ? 0 : left;
    };

    function _startFlipClock(timers){
        timers.each(function(i, el){
            $(el).FlipClock(
                _getSecondsLeft(el),
                {
                    clockFace: $(el).data('flipface'),
                    countdown: true,
                    language: _localeName
                }
            );
        });
    };

    function _startSimpleTimer(timers){
        // prepare data for start
        timers.html('').each(function(i, el){
            var secLeft = _getSecondsLeft(el);
            if ($(el).data('displayDays')) {
                var days = Math.floor( secLeft / ( 24 * 60 * 60 ) );
                if (days > 0) {
                    secLeft -= days * 24 * 60 * 60;
                    var text = days.toString() + ' '
                        + Translator.translate('day(s)');
                    $(el).append('<span class="days">'+text+'</span>');
                }
            };
            $(el).data('secondsLeft', secLeft);
            if ($(el).is('.cmyk, .thin-shadow')) {
                _initializeWebFonts();
            }
        });
        timers.startTimer();
    }


    var CountdownTimers = function(){};

    CountdownTimers.prototype = {

        initialize: function() {
            // initialize translation
            if (!(_localeName in FlipClock.Lang)) {
                var transl = {};
                for (key in _texts) {
                    transl[key] = Translator.translate(_texts[key]);
                }
                FlipClock.Lang[_localeName] = transl;
            };
        },

        start: function(){
            var timers = $(_timerNotStarted);
            _startFlipClock(timers.filter(_timerFlip));
            _startSimpleTimer(timers.filter(_timerSimple));
            timers.removeClass(_timerNotStarted.substring(1));
        }

    };

    window.tmCountdownTimers = new CountdownTimers();

})(jQuery);

// trigger timer start on document ready event
document.observe("dom:loaded", function() {
    if (typeof jQuery === 'undefined') {
        console.warn('Countdown Timer can not find jQuery');
        return;
    }
    tmCountdownTimers.initialize();
    tmCountdownTimers.start();
    // INITIALIZE EVENTS LISTEN
    // jQuery event
    jQuery(document).on("tm:countdowntimer:start", tmCountdownTimers.start);
    // prototype event
    ["tm:countdowntimer:start", "quickshopping:previewloaded",
     "ajaxlayerednavigation:ready", "AjaxPro:onSuccess:after",
     "AjaxPro:onComplete:after"].map(
        function(eventName){
            document.observe(eventName, tmCountdownTimers.start);
        }
    );
    // integration with Sm_Shopby module
    if (typeof ajaxListener === 'function') {
        ajaxListener = ajaxListener.wrap(function(originalCall){
            originalCall();
            jQuery(document).trigger("tm:countdowntimer:start");
        });
    }
});
