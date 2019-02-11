$(document).ready(function() {

  $("#login-form").on("submit", function(e) {
    e.preventDefault();

    const userInfo = {
      email: $("#email-input").val().trim(),
      password: $("#password-input").val().trim()
    };

    $.ajax({
      url: '/api/users/login',
      method: 'POST',
      data: userInfo
    })
    .then((userInfo) => {
      console.log(userInfo);
    })
    .catch(err => console.log(err));
  });

});