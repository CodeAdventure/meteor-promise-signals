# Promise Signals [![Build Status](https://github.com/CodeAdventure/meteor-promise-signals.png?branch=master)](https://travis-ci.org/CodeAdventure/meteor-promise-signals)

Javascript Signals ([js-signals](http://millermedeiros.github.io/js-signals/)) that return promises to
the invoking party that dispatches the signal and expects some return values or reaction.

This is useful for signal-command setups when you want to get rid of
the event listening pattern for simple *success / failure* scenarios.
The command can still dispatch signals for success and failure but
the code that *requested* the action should be informed by fulfilling
or rejecting a promise.

## Install with Meteorite
Install the module with: `mrt add promise-signals`

## Documentation & Examples
http://CodeAdventure.github.io/meteor-promise-signals

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality.
Lint and test your code using [grunt](https://github.com/gruntjs/grunt).

## Run the tests
`mrt test-packages ./`

## Release History
0.1.0 - Initial release of the library

## License
Copyright (c) 2014 Code Adventure
Licensed under the MIT license.
