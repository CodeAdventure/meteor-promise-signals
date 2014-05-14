Package.describe({
  summary: 'Signals that return promises when dispatched.'
});

Package.on_use(function(api) {

  api.use(
    ['mozart', 'js-signals', 'es6-promises'], 'client'
  );

  api.add_files(
    ['source/PromiseSignal.js'], 'client'
  );

});

Package.on_test(function(api) {

  api.use([
    'tinytest',
    'test-helpers',
    'promise-signals'
  ]);

  api.add_files(
    ['tests/PromiseSignal.unit.js'],
    ['client']
  );

});
