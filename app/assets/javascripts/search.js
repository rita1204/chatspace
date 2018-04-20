$(function(){
  var members = $("#user-search-result");

  function buildMembers(user){
    var usernames = $(".chat-group-user__name").text();
    // if not names already exists
    // (index0f returns -1 if it fails to find values)
    if(usernames.indexOf(`${user.name}`) < 0) {
      var html = `<div class = "chat-group-user clearfix">
                    <p class = "chat-group-user__name">${user.name}</p>
                    <a class = "user-search-add chat-group-user__btn chat-group-user__btn__add js-add-btn" data-user-id = ${user.id} data-user-name = ${user.name}>追加</a>
                  </div>`
      members.append(html);
    }
  }

  function addUsers(uid,username){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${uid}'>
                  <input name='group[user_ids][]' type='hidden' value= ${uid}>
                  <p class='chat-group-user__name'>${username}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    $("#chat-group-users").append(html);
  }

  //add event called
  members.on('click',".user-search-add",function(){
    var uid = $(this).attr("data-user-id");
    var username = $(this).attr("data-user-name");
    $(this).parent().remove();
    addUsers(uid,username);
  })

  //remove event
  $("#chat-group-users").on('click',".user-search-remove", function(){
    $(this).parent().remove();
  })

  //when search-field typed
  $("#user-search-field").on('keyup',function(){
    var input = $(this).val();
    var url = '/users'
    $.ajax({
      type: "GET",
      url: url,
      data: {
        keyword: input
      },
      dataType: 'json'
    })
    .done(function(users){
      $(members).empty();
      if(users.length !== 0){
      users.forEach(function(user){
        buildMembers(user);
      })
      }else{
        console.log('no user');
      }
    })
    .fail(function(){
      alert('error');
    })

  })
});
