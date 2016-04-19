var tmCountdownTimers = new function (){
  
  this.timerFlip = '.tm-cdt-flip';
  this.timerSimple = '.tm-cdt-simple';
  this.timerNotStarted ='.not-started';
  var _localeName = 'cu_LO'; // customer locale
  var _self = this;

  var _initTranslations = function (){
    if (!(_localeName in FlipClock.Lang)) {
      FlipClock.Lang[_localeName] = {
        'years' : Translator.translate('Years'),
        'months' : Translator.translate('Months'),
        'days' : Translator.translate('Days'),
        'hours' : Translator.translate('Hours'),
        'minutes' : Translator.translate('Minutes'),
        'seconds' : Translator.translate('Seconds')
      };
    };
  }

  var _initFonts = function (){
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
  }

  var _getSecondsLeft = function(obj){
    var end = jQuery(obj).data('end-datetime-utc');
    var left = 0;
    if (end) {
      left = end - Math.floor(Date.now() / 1000);
      left = (left < 0) ? 0 : left;
    }
    return left;
  };

  var _startFlipClock = function(obj){
    obj.each(function(i, el){
      jQuery(el).FlipClock(
        _getSecondsLeft(el),
        {
          clockFace: jQuery(el).data('flipface'),
          countdown: true,
          language: _localeName
        }
      );
    });
  }

  var _startSimpleTimer = function(obj){
    // prepare data for start
    obj.html('').each(function(i, el){
      var secLeft = _getSecondsLeft(el);
      if (jQuery(el).data('display-days')) {
        var days = Math.floor( secLeft / ( 24 * 60 * 60 ) );
        if (days > 0) {
          secLeft -= days * 24 * 60 * 60;
          var text = days.toString() + ' ' + Translator.translate('day(s)');
          jQuery(el).append('<span class="days">'+text+'</span>');
        }
      };
      jQuery(el).data('seconds-left', secLeft);
    });
    obj.startTimer();
  }

  this.start = function(){
    _initTranslations();
    _initFonts();
    var timers = jQuery(_self.timerNotStarted);
    _startFlipClock(timers.filter(_self.timerFlip));
    _startSimpleTimer(timers.filter(_self.timerSimple));
    timers.removeClass(_self.timerNotStarted.substring(1));
  }

}

// trigger timer start on document ready event
document.observe("dom:loaded", function() {
  tmCountdownTimers.start();
  // INITIALIZE EVENTS LISTEN
  // jquery event
  jQuery(document).on("tm:countdowntimer:start", function(){tmCountdownTimers.start()});
  // prototype event
  var eventsArr = [
    "tm:countdowntimer:start",
    "quickshopping:previewloaded",
    "ajaxlayerednavigation:ready",
    "AjaxPro:onComplete:after"
  ];
  eventsArr.map(function(eventName){
    document.observe(eventName, function(){tmCountdownTimers.start()});
  });
});
