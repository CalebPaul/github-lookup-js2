(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "750272a02e5a4bbc131e56a790127a67311a1605";

},{}],2:[function(require,module,exports){
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
    var location = response.location;
    var repos = response.public_repos;
    var githubUrl = response.url;
    var repoUrl = response.repos_url;
    //append repos after url value? could use for of loop?
    //catch null
    if (name === null) {
      name = "user did not give name"
    }
    if (location === null) {
      location = "user did not give location"
    }
    console.log(name);
    console.log(location);
    console.log(repos);
    console.log(githubUrl);
    console.log(repoUrl);
    $('.info').append('<div class="col-sm-5 text-center">'
    + '<label class = "page-header">User Info</label>'
    + '<h6>User Name: '+name+'</h6>'
    +'<h6>Location: '+location+'</h6>'
    +'<h6># of projects: '+repos+'</h6>'
    +'</div>');

  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

exports.lookupModule = Lookup;

},{"./../.env":1}],3:[function(require,module,exports){
var Lookup =  require('./../js/lookup.js').lookupModule;

$(document).ready(function() {
  var newLookup = new Lookup();

  $('#button').click(function(event) {
    event.preventDefault();
    //$('.showThumb').children().remove();
    var user = $('#user').val();

    newLookup.getUser(user);
  });
});

},{"./../js/lookup.js":2}]},{},[3]);
