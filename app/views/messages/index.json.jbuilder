json.array! @messages.each do |message|
  json.id message.id
  json.body message.body
  json.created_at message.created_at
  json.username message.user.username
  json.image message.image
end
