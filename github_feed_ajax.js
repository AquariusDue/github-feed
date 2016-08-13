$( document ).on( 'click', '.github-update-button', function() {
  $.ajax({
    url: github_object.ajax_url,
    type: 'post',
    data: {
      action: 'github_feed'
    },
    success: function( response ) {
      $('.github-update-button').css('background-color', 'green');
    }
  })
})
