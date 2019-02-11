$(document).ready(function() {


  $.ajax({
    url: '/api/users/status',
    method: 'GET'
  }).then(function(userInfo) {
    console.log(userInfo);
  })
  .catch(err => console.log(err));

});