(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    if (root.anchorjs && root.anchorjs.debug) {
      // The debug module was loaded via a script tag.  Define the module such
      // that it is the same as the browser global.
      define(function() {
        return root.anchorjs.debug;
      });
    } else {
      define(factory);
    }
  } else {
    // Browser global.
    //
    // The debug module is often loaded via a script tag, so that debug settings
    // can be configured prior to module loading.
    root.anchorjs = root.anchorjs || {};
    root.anchorjs.debug = factory();
  }
}(this, function() {
  function debug(name) {
    if (!enabled(name)) return function(){};
  
    return function(fmt) {
      var curr = new Date;
      var ms = curr - (prev[name] || curr);
      prev[name] = curr;
  
      fmt = '['
        + name
        + '] '
        + fmt
        + ' +' + humanize(ms);
  
      // This hackery is required for IE8
      // where `console.log` doesn't have 'apply'
      window.console
        && console.log
        && Function.prototype.apply.call(console.log, console, arguments);
    }
  }
  
  debug.enable = function(name) {
    var split = (name || '').split(/[\s,]+/)
      , len = split.length;
  
    for (var i = 0; i < len; i++) {
      name = split[i].replace('*', '.*?');
      if (name[0] === '-') {
        skips.push(new RegExp('^' + name.substr(1) + '$'));
      } else {
        names.push(new RegExp('^' + name + '$'));
      }
    }
  }
  
  
  var names = [];
  var skips = [];
  var prev = [];
  
  function enabled(name) {
    for (var i = 0, len = skips.length; i < len; i++) {
      if (skips[i].test(name)) {
        return false;
      }
    }
    for (var i = 0, len = names.length; i < len; i++) {
      if (names[i].test(name)) {
        return true;
      }
    }
    return false;
  }
  
  function humanize(ms) {
    var sec = 1000
      , min = 60000 // 60 * 1000 = 1 min
      , hour = 3600000; // 60 * 60 * 1000 = 1 hour
  
    if (ms >= hour) return (ms / hour).toFixed(1) + 'h';
    if (ms >= min) return (ms / min).toFixed(1) + 'm';
    if (ms >= sec) return (ms / sec | 0) + 's';
    return ms + 'ms';
  }
  
  return debug;
}));