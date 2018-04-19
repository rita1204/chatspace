//form => new_message
//input => footer-text__field

$(function(){
  function buildHTML(message){
    if (`${message.image.url}` != "null") {
      var contents = `
                  <img src = "${message.image.url}">`
    }
    else {
      var contents = ``
    }
    var html = `<div class="comment">
                  <div class="comment__header clearfix">
                    <div class="comment__header__title">
                      <p>
                        ${message.username}
                      </p>
                    </div>
                    <div class="comment__header__date">
                      <p>
                        ${message.created_at}
                      </p>
                    </div>
                  </div>
                  <div class="comment__content">
                    <div class="contents">
                        ${message.body}
                    </div>`
                    + contents +
                  `</div>
                </div>`
    return html;
  }

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.comment-container').append(html)
      $('.footer-text__field').val('')
      $('.hidden').val('')
      $('.footer-btn__send').prop("disabled",false);
      $('.comment-container').animate({scrollTop:$('.comment').last().offset().top});
    })
    .fail(function(){
      alert('error');
    })
  })


})