function Autokey(key, alphabet) {
  this.key = new Array(key.length);
  var keys = new Buffer(key);
  for (var i = 0, ii = keys.length; i < ii; ++i) {
    this.key[i] = keys[i];
  }
  this.alphabet = new Array(alphabet.length);
  this.betaalph = new Array(alphabet.length);
  var alphabetbuf = new Buffer(alphabet);
  for (var i = 0, ii = alphabet.length; i < ii; ++i) {
    this.alphabet[i] = alphabetbuf[i];
    this.betaalph[alphabetbuf[i]] = i;
  }
}

Autokey.prototype.encode = function(str) {
  var raw = new Buffer(str, 'utf8');
  var key = this.key.slice();
  var res = [];
  var cipher = key.length;
  var cc = cipher;
  for (var i = 0, ii = raw.length; i < ii; ++i) {
    if (this.betaalph[raw[i]] == undefined)
      res[i] = raw[i]
    else {
      var k = key.shift() % this.alphabet.length;
      if (cc-- > 0) {
        res[i] = this.alphabet[(this.betaalph[raw[i]] + k) % this.alphabet.length];
      } else {
        res[i] = this.alphabet[(this.betaalph[raw[i]] + this.betaalph[res[i - cipher]]) % this.alphabet.length];
      }
    }
  }
  return new Buffer(res).toString('utf8');
}

Autokey.prototype.decode = function(str) {
  var raw = new Buffer(str, 'utf8');
  var key = this.key.slice();
  var res = []; // output buffer
  var cipher = key.length;
  var cc = cipher; // key switch counter
  for (var i = 0, ii = raw.length; i < ii; ++i) {
    if (this.betaalph[raw[i]] == undefined)
      res[i] = raw[i]
    else {
      var k = key.shift() % this.alphabet.length;
      if (cc-- > 0) {
        res[i] = this.alphabet[(this.betaalph[raw[i]] - k + this.alphabet.length) % this.alphabet.length];
      } else {
        res[i] = this.alphabet[(this.betaalph[raw[i]] - this.betaalph[raw[i - cipher]] + this.alphabet.length) % this.alphabet.length];
      }
    }
  }
  return new Buffer(res).toString('utf8');
}

module.exports = Autokey;
