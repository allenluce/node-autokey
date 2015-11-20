function __encode(raw, key) {
  var res = [];
  var cipher = key.length;
  var cc = cipher;
  for (var i = 0, ii = raw.length; i < ii; ++i) {
    if (cc-- > 0) {
      res[i] = (raw[i] + key.shift()) % 256;
    } else {
      res[i] = (raw[i] + raw[i - cipher]) % 256;
    }
  }
  return new Buffer(res);
}

function __decode(raw, key) {
  var res = []; // output buffer
  var cipher = key.length;
  var cc = cipher; // key switch counter
  for (var i = 0, ii = raw.length; i < ii; ++i) {
    if (cc-- > 0) {
      res[i] = (raw[i] - key.shift()) % 256;
    } else {
      res[i] = (raw[i] - res[i - cipher]) % 256;
    }
  }
  return new Buffer(res);
}

function Autokey(key) {
  this.key = new Array(key.length);
  var keys = new Buffer(key);
  for (var i = 0, ii = keys.length; i < ii; ++i) {
    this.key[i] = keys[i];
  }
}

Autokey.prototype.encode = function(str) {
  var out = new Buffer(str, 'utf8');
  return __encode(out, this.key.slice()).toString(output_encoding || 'utf8');
};

Autokey.prototype.decodeString = function(str, input_encoding, output_encoding) {
  var out = new Buffer(str, input_encoding || 'hex');
  return __decode(out, this.key.slice()).toString(output_encoding || 'utf8');
};


module.exports = new Autokey(key);
