var Benchmark = require('benchmark');
var autokey = require('./autokey');
var chao = require('../node-chao/chao');
var suite = new Benchmark.Suite;

var akey = new autokey("LSKDJFLKSDFLKJ", "ABCDEFGHIJKLMNOPQRSTUVWXYZ");

var ciphertext_alphabet = "HXUCZVAMDSLKPEFJRIGTWOBNYQ";
var plaintext_alphabet = "PTLNBQDEOYSFAVZKGJRIHWXUMC";
var ckey = new chao(ciphertext_alphabet, plaintext_alphabet);

suite.add('chao', function() {
  ckey.decode(ckey.encode("SLDKFSSDFKSDJF"));
}).add('autokey', function() {
  akey.decode(akey.encode("SLDKFSSDFKSDJF"));
}).on('cycle', function(event) {
  console.log(String(event.target));
}).on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
}).run({ 'async': true });
