function Autokey(key, alphabet) {
  this.key = [];
  for (var i = 0, ii = key.length; i < ii; ++i)
    this.key[i] = key[i].charCodeAt(0);
  this.betaalph = [];
  for (var i = 0, ii = alphabet.length; i < ii; ++i) 
    this.betaalph[alphabet[i]] = i;
  this.alphabet = alphabet;
}

Autokey.prototype.encode = function(raw) {
  var res = "";
  var cipher = this.key.length;
  var cc = cipher;
  var last;
  var alpha_length = this.alphabet.length;
  var k;
  for (var i = 0, ii = raw.length; i < ii; ++i) {
    if (this.betaalph[raw[i]] == undefined)
      res += raw[i]
    else {
      if (cc-- > 0) {
        k = this.key[cc];
      } else {
        k = this.betaalph[last];
      }
      last = this.alphabet[(this.betaalph[raw[i]] + k) % alpha_length];
      res += last;
    }
  }
  return res;
}

Autokey.prototype.decode = function(raw) {
  var res = "";
  var cipher = this.key.length;
  var cc = cipher;
  var last;
  var alpha_length = this.alphabet.length;
  var k;
  for (var i = 0, ii = raw.length; i < ii; ++i) {
    if (this.betaalph[raw[i]] == undefined)
      res += raw[i]
    else {
      if (cc-- > 0) {
        k = this.key[cc] % alpha_length;
      } else {
        k = this.betaalph[last];
      }
      res += this.alphabet[(this.betaalph[raw[i]] - k + alpha_length) % alpha_length];
      last = raw[i];
    }
  }
  return res;
}

module.exports = Autokey;
