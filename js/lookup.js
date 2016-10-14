/*jshint esversion: 6 */ //to catch jshint error caused by using for-of loop
var apiKey = require('./../.env').apiKey;

function Lookup() {
}
// https://api.github.com/users/daneden?access_token=750272a02e5a4bbc131e56a790127a67311a1605

Lookup.prototype.getRepos = function(repoUrl){
  $.get(repoUrl).then(function(response){
    console.log(response);

  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

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
    console.log(name);
    console.log(location);
    console.log(repos);
    console.log(githubUrl);
    console.log(repoUrl);
    that.getRepos(repoUrl);
    $('.info').append('<div class="col-sm-4 text-center">'
    + '<label class = "page-header">User Info</label>'
    + '<h6>User Name: '+name+'</h6>'
    +'<h6>Location: '+location+'</h6>'
    +'<h6># of repositories: '+repos+'</h6>'
    +'</div>');

  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

exports.lookupModule = Lookup;
