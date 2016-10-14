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
