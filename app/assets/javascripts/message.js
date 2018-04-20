$(function(){
  function buildHTML(message){
    var image = `${message.image.url}` != "null" ? `<img src = "${message.image.url}">` : ``
    var html = `<div class="comment" data-id="${message.id}">
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
                    + image +
                  `</div>
                </div>`
    return html;
  }

  function autoScroll (){
    var messageContainer = $('.comment')[0];
    messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight
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

  var interval = setInterval(function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/) || (/localhost:3000/)){
      var id = $('.comment').last().data('id');
    $.ajax({
      url: location.href.json,
      type: 'GET',
      data: { id: id },
      dataType: 'json'
    })
    .done(function(json){
      var insertHTML = "";
      json.forEach(function(message){
        if(message.id > id){
          insertHTML += buildHTML(message);
          $(".comment-container").append(insertHTML);
          $('.comment-container').animate({scrollTop:$('.comment').last().offset().top});
        }
      })
    })
    .fail(function(data){
      alert('error:auto update');
    });
  } else {
    clearInterval(interval);
  }},5000);







});
