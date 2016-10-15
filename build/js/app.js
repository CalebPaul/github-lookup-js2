(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey =  "750272a02e5a4bbc131e56a790127a67311a1605"

},{}],2:[function(require,module,exports){
/*jshint esversion: 6 */ //to catch jshint error caused by using for-of loop
var apiKey = require('./../.env').apiKey;

function Lookup() {
}

Lookup.prototype.getRepos = function(repoUrl, apiKey){
  $.get(repoUrl+'?access_token'+apiKey).then(function(response){
    console.log(response);
    for (var project of response) {
      if (project.description === null) {
        project.description = "user did not describe project";
      }
      $('.repoInfo').append('<li class="text-center">' +
       '<label class = "page-header">'+project.name+'</label>' +
       '<h6>Project Description: '+project.description+'</h6>' +
       '<h6>Primary Language: '+project.language+'</h6>' +
       '</li>');
      }
    }
  );};

Lookup.prototype.getUser = function(user){
  var that = this;
  $.get('https://api.github.com/users/'+user+'?access_token=' + apiKey).then(function(response){
    console.log(response);
    var name = response.name;
    var location = response.location;
    var repos = response.public_repos;
    var githubUrl = response.url;
    var repoUrl = response.repos_url;
    if (name === null) {
      name = "user did not give name";
    }
    if (location === null) {
      location = "user did not give location";
    }
    $('.userInfo').empty();
    $('.userInfo').append('<div class="col-sm-4 text-center">' +
     '<label class = "page-header">User Info</label>' +
     '<h6>User Name: '+name+'</h6>' +
     '<h6>Location: '+location+'</h6>' +
     '<h6># of repositories: '+repos+'</h6>' +
     '</div>');
     $('.repoInfo').empty();

    that.getRepos(repoUrl, apiKey);

  }).fail(function(error){
    console.log(error.responseJSON.message);
    if (error.responseJSON.message === "Not Found") {
      alert(user + " not found.");
    }
  });
};

exports.lookupModule = Lookup;

},{"./../.env":1}],3:[function(require,module,exports){
var Lookup =  require('./../js/lookup.js').lookupModule;

$(document).ready(function() {
  var newLookup = new Lookup();

  $('#button').click(function(event) {
    event.preventDefault();
    var user = $('#user').val();
    newLookup.getUser(user);
    $('.repoInfo').slideDown();
  });
});

},{"./../js/lookup.js":2}]},{},[3]);
