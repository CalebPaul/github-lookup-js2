/*jshint esversion: 6 */ //to catch jshint error caused by using for-of loop
var apiKey = require('./../.env').apiKey;

function Lookup() {
}

Lookup.prototype.getRepos = function(repoUrl, apiKey){
  $.get(repoUrl+'?access_token'+apiKey).then(function(response){
    console.log(response);
    for (var project of response) {
      if (project.description === null) {
        project.description = "user did not describe project"
      }
      $('.repoInfo').append('<li class="text-center">'
      + '<label class = "page-header">'+project.name+'</label>'
      +'<h6>Project Description: '+project.description+'</h6>'
      +'<h6>Primary Language: '+project.language+'</h6>'
      +'</li>');
      }
    }
  )};

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
      name = "user did not give name"
    }
    if (location === null) {
      location = "user did not give location"
    }
    $('.userInfo').empty();
    $('.userInfo').append('<div class="col-sm-4 text-center">'
    + '<label class = "page-header">User Info</label>'
    + '<h6>User Name: '+name+'</h6>'
    +'<h6>Location: '+location+'</h6>'
    +'<h6># of repositories: '+repos+'</h6>'
    +'</div>');

    that.getRepos(repoUrl);

  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

exports.lookupModule = Lookup;
