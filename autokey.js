function Autokey(key, alphabet) {
  this.key = key;
  this.alphabet = alphabet;
  this.betaalph = [];
  for (var i = 0, ii = alphabet.length; i < ii; ++i) {
    this.betaalph[alphabet[i]] = i;
  }
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
        k = this.key[cc].charCodeAt(0);
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
        k = this.key[cc].charCodeAt(0) % alpha_length;
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
