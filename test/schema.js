'use strict';

const tape = require('tape');

const Joi = require('joi');
const schema = require('../schema');

function validate(config) {
  Joi.validate(config, schema, (err, value) => {
    if (err) {
      throw new Error(err.details[0].message);
    }
  });
}

tape('tests for looking up hierarchies', function(test) {
  test.test('config lacking datapath should throw error', function(t) {
    var config = {
      imports: {
        whosonfirst: {
          importVenues: true
        }
      }
    };

    t.throws(validate.bind(null, config), /"datapath" is required/, 'missing datapath should throw');
    t.end();

  });

  test.test('missing importVenues, importPostalcodes, and missingFilesAreFatal should not throw error', function(t) {
    var config = {
      imports: {
        whosonfirst: {
          datapath: '/path/to/data'
        }
      }
    };

    t.doesNotThrow(validate.bind(null, config));
    t.end();

  });

  test.test('config with spurious keys should throw error', function(t) {
    var config = {
      imports: {
        whosonfirst: {
          datapath: '/path/to/data',
          importVenues: true,
          spurious_key: 'value'
        }
      }
    };

    t.throws(validate.bind(null, config), /"spurious_key" is not allowed/);
    t.end();

  });

  test.test('non-string datapath should throw error', function(t) {
    [null, 17, {}, [], true].forEach((value) => {
      var config = {
        imports: {
          whosonfirst: {
            datapath: value
          }
        }
      };

      t.throws(validate.bind(null, config), /"datapath" must be a string/);

    });

    t.end();

  });

  test.test('non-boolean importVenues should throw error', function(t) {
    [null, 17, {}, [], 'string'].forEach((value) => {
      var config = {
        imports: {
          whosonfirst: {
            datapath: '/path/to/data',
            importVenues: value
          }
        }
      };

      t.throws(validate.bind(null, config), /"importVenues" must be a boolean/);
    });

    t.end();

  });

  test.test('non-boolean importPostalcodes should throw error', function(t) {
    [null, 17, {}, [], 'string'].forEach((value) => {
      var config = {
        imports: {
          whosonfirst: {
            datapath: '/path/to/data',
            importPostalcodes: value
          }
        }
      };

      t.throws(validate.bind(null, config), /"importPostalcodes" must be a boolean/);
    });

    t.end();

  });

  test.test('non-boolean missingFilesAreFatal should throw error', function(t) {
    [null, 17, {}, [], 'string'].forEach((value) => {
      var config = {
        imports: {
          whosonfirst: {
            datapath: '/path/to/data',
            missingFilesAreFatal: value
          }
        }
      };

      t.throws(validate.bind(null, config), /"missingFilesAreFatal" must be a boolean/);
    });

    t.end();

  });

  test.test('case-insensitive \'yes\' and true should be valid importVenues values', function(t) {
    [true, 'YeS', 'yEs'].forEach((value) => {
      var config = {
        imports: {
          whosonfirst: {
            datapath: '/path/to/data',
            importVenues: value
          }
        }
      };

      t.doesNotThrow(validate.bind(null, config));
    });

    t.end();

  });

  test.test('case-insensitive \'no\' and false should be valid importVenues values', function(t) {
    [false, 'nO', 'No'].forEach((value) => {
      var config = {
        imports: {
          whosonfirst: {
            datapath: '/path/to/data',
            importVenues: value
          }
        }
      };

      t.doesNotThrow(validate.bind(null, config));
    });

    t.end();

  });

  test.test('case-insensitive \'yes\' and true should be valid importPostalcodes values', function(t) {
    [true, 'YeS', 'yEs'].forEach((value) => {
      var config = {
        imports: {
          whosonfirst: {
            datapath: '/path/to/data',
            importPostalcodes: value
          }
        }
      };

      t.doesNotThrow(validate.bind(null, config));
    });

    t.end();

  });

  test.test('case-insensitive \'no\' and false should be valid importPostalcodes values', function(t) {
    [false, 'nO', 'No'].forEach((value) => {
      var config = {
        imports: {
          whosonfirst: {
            datapath: '/path/to/data',
            importPostalcodes: value
          }
        }
      };

      t.doesNotThrow(validate.bind(null, config));
    });

    t.end();

  });

  test.test('case-insensitive \'yes\' and true should be valid missingFilesAreFatal values', function(t) {
    [true, 'YeS', 'yEs'].forEach((value) => {
      var config = {
        imports: {
          whosonfirst: {
            datapath: '/path/to/data',
            missingFilesAreFatal: value
          }
        }
      };

      t.doesNotThrow(validate.bind(null, config));
    });

    t.end();

  });

  test.test('case-insensitive \'no\' and false should be valid missingFilesAreFatal values', function(t) {
    [false, 'nO', 'No'].forEach((value) => {
      var config = {
        imports: {
          whosonfirst: {
            datapath: '/path/to/data',
            missingFilesAreFatal: value
          }
        }
      };

      t.doesNotThrow(validate.bind(null, config));
    });

    t.end();

  });

});
