# Autokey

[![Build Status](https://travis-ci.org/allenluce/node-autokey.svg?branch=master)](https://travis-ci.org/allenluce/node-autokey)
[![Coverage Status](https://coveralls.io/repos/github/allenluce/node-autokey/badge.svg?branch=master)](https://coveralls.io/github/allenluce/node-autokey?branch=master)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

A Javascript implementation of the simple
[Autokey cipher](https://en.wikipedia.org/wiki/Autokey_cipher).
Autokey has some useful characteristics: the output is the same length
as the input and looks like the input was merely jumbled as it uses
the same alphabet as the input:

* Input: `all our words from loose using have lost their edge.`
* Output: `kbu cjd hprjy qmud ilujd xpxkq xxsw hvng zgksj nqwa.`

This is similar to and based on the stream cipher implementation at
[https://github.com/hex7c0/autokey](https://github.com/hex7c0/autokey)
but restricts the input and output to a given alphabet.  This means
you can let spaces, punctuation, and other characters go through the
algorithm with no change.

## How it works

To install:

    npm install node-autokey

## Example script

```javascript
var Autokey = require('node-autokey');
var assert = require('assert')

var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

// The key does not have to be chosen from the alphabet.
var akey = new Autokey("My Key Is This@)(#*$", alphabet);

var input = "Something very important!";
var ciphertext = akey.encode(input);
console.log(ciphertext);
var recoveredtext = akey.decode(ciphertext);
assert.equal(recoveredtext, input);
```

## Caveat

Autokey is a very old cipher with known vulnerabilities and is not as
secure as modern encryption systems.  You should consider this
algorithm as a slightly better alternative to
[ROT13](https://en.wikipedia.org/wiki/ROT13) or
[base64](https://en.wikipedia.org/wiki/Base64) for obfuscating text.
