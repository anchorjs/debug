# Anchor/Debug

The debug module provides debugging utilities to the Anchor platform.

## Install

##### component

    $ component install anchorjs/debug

##### volo

    $ volo add anchorjs/debug

## Usage

This module allows you to enable one or more topic-specific debugging functions.
Simply invoke the exported function to generate your debug function, passing it
a name which will determine if a noop function is returned, or a decorated
`console.log`.

```javascript
debug = debug('xmpp');

client.on('stanza', function(stanza) {
  debug('stanza from: ' + stanza.from);
});
```

To enable a topic, call `debug.enable`.

```javascript
debug.enable('xmpp');
```

For convenience, the debug module can be loaded via a script tag, so debug
topics can be enabled prior to module loading.

```html
<script src="js/lib/debug/debug.js"></script>
```

```javascript
anchor.debug.enable('bosh');
anchor.debug.enable('xmpp');

require(['app/app']);
```

## Compatibility

##### Implements

This module conforms to the interface exported by [debug](https://github.com/visionmedia/debug).

##### component

This module uses the [AMD](https://github.com/amdjs/amdjs-api) format.  To
include in component builds, use [component-amd](https://github.com/jaredhanson/component-amd):

    component build -u component-amd

## Tests

To run tests in a browser, execute the Make target for the desired browser:

    $ make test-chrome
    $ make test-firefox
    $ make test-safari
    
Headless tests can be executed directly from a terminal:
    
    $ make test-phantomjs

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)
  - [TJ Holowaychuk](https://github.com/visionmedia)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2012-2013 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>  
Copyright (c) 2011 TJ Holowaychuk <[tj@vision-media.ca](mailto:tj@vision-media.ca)>
