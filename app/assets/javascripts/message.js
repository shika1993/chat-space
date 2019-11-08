$(function(){
  function buildHTML(message){
    var message_image = message.image.url ? message_image = `<img src = '${message.image.url}'></img>` : ``;
    var html = `
      <div class="contents__right__messages__message" data-id= ${message.id}>
        <div class="contents__right__messages__message__info">
          <div class="contents__right__messages__message__info__name">
            ${message.user_name}
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
      </div>
`
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

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/))
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.contents__right__messages__message:last').data("id");
    group_id = $('.contents__right__messages').data("id");
    console.log(group_id);
    $.ajax({
      url: `/groups/${group_id}/api/messages`,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
      
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function (message) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        insertHTML = buildHTML(message); //メッセージが入ったHTMLを取得
        $('.contents__right__messages').append(insertHTML);//メッセージを追加
      })
      $('.contents__right__messages').animate({scrollTop: $('.contents__right__messages')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
    })
    .fail(function () {
      alert('自動更新に失敗しました');//ダメだったらアラートを出す
    });
  };
  setInterval(reloadMessages, 5000);
});