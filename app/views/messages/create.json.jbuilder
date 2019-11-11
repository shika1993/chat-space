json.text @message.text
json.user @message.user
json.user_name @message.user.name
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.image  @message.image
json.id @message.id
