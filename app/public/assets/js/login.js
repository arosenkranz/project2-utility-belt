$(document).ready(function() {
  $('#login-form').on('submit', function(e) {
    e.preventDefault();

    const userInfo = {
      email: $('#email-input')
        .val()
        .trim(),
      password: $('#password-input')
        .val()
        .trim()
    };

    $.ajax({
      url: '/api/users/login',
      method: 'POST',
      data: userInfo
    })
      .then(userInfo => {
        console.log(userInfo);
        if (!userInfo.success) {
          $('#alert-area').html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${userInfo.message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`);
        } else {
          $('#alert-area').empty();
          location.replace(userInfo.url);
        }
      })
      .catch(err => console.log(err));
  });
});
