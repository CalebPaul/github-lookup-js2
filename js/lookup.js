/*jshint esversion: 6 */ //to catch jshint error caused by using for-of loop
var apiKey = require('./../.env').apiKey;

function Lookup() {
}

// https://api.github.com/users/daneden?access_token=750272a02e5a4bbc131e56a790127a67311a1605

Lookup.prototype.getUser = function(user){
  $.get('https://api.github.com/users/'+user+'?access_token=' + apiKey).then(function(response){
    console.log(response);
    //access object properties
    var name = response.name;
    var repos = response.public_repos;
    var url = response.url;
    //catch null
    if (name === null) {
      name = "user did not give name"
    }
    console.log(name);
    console.log(repos);
    console.log(url);
    $('.info').append('<div class="col-sm-5">'
    + '<h4>'+name+'</h4>'
    +objectproperty+
    '</div>');

  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

exports.lookupModule = Lookup;
