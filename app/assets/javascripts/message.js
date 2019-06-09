$(function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";

    var html = `<div class="message" data-id="${message.id}">
                 <div class="upper-message">
                   <div class="upper-message__user-name">
                     ${message.user_name}
                   </div>
                   <div class="upper-message__date">
                   ${message.date}
                   </div>
                 </div>
                <div class="lower-message__content">
                  <div>
                   ${content}
                  </div>
                  <div>
                  ${img}
                  </div>
                </div>`
    return html;
  } 
  
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

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
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    }) 

    .fail(function(){
      alert('error');
      $('.form__submit').prop('disabled', false);
    }) 
  }) 
 
 

 var reloadMessages = function() {
  if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var last_message_id = $('.message:last').data("id");
    
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id} 
    })
    
    .done(function(messages) {
       var insertHTML = '';
       messages.forEach(function (message) {
       insertHTML = buildHTML(message);
       $('.messages').append(insertHTML); 
       $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })    
    })

    .fail(function() {
      alert('更新に失敗しました');
    });
   }
  };
  setInterval(reloadMessages, 5000); 
}); 

