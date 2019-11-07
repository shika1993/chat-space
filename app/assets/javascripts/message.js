$(function(){
  function buildHTML(message){
    var message_image = message.image.url ? message_image = `<img src = '${message.image.url}'></img>` : ``;
    var html = `
    <div class="contents__right__messages__message">
    <div class="contents__right__messages__message__info">
    <div class="contents__right__messages__message__info__name">
      ${message.user.name}
    </div>
    <div class="contents__right__messages__message__info__date">
      ${message.created_at}
    </div>
    </div>
    <div class="contents__right__messages__message__text">
      ${message.text}
      <br>
      ${message_image}
    </div>
    </div>`
    return html;
    
  }
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: (url),  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: (formData),  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.contents__right__messages').append(html);
      $('form')[0].reset();
      $('.contents__right__footer__message__sendbtn input').prop('disabled', false);
      $('.contents__right__messages').animate({ scrollTop: $('.contents__right__messages')[0].scrollHeight });
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  })
});