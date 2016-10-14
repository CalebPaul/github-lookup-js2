/*jshint esversion: 6 */ //to catch jshint error caused by using for-of loop
var apiKey = require('./../.env').apiKey;

function Lookup() {
}

// https://api.github.com/users/daneden?access_token=750272a02e5a4bbc131e56a790127a67311a1605

Lookup.prototype.getUser = function(){
  $.get('https://api.github.com/users/daneden?access_token=' + apiKey).then(function(response){
    console.log(response);
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

exports.lookupModule = Lookup;
