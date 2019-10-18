# chat-space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false, unique: true|
|password|string|null: false|
|name|string|null: false|
### Association
- has_many  :groups,  through:  :users_groupss
- has_many  :users_groups
- has_many  :messages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|title|text|null: false|
### Association
- has_many  :messages
- has_many  :users_groups
- has_many  :users,  through:  :users_groups

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|user_id|integer|null: fale, foreign_key: true|
|group_id|integer|null: fale, foreign_key: true|
### Association
- belongs_to :users
- belongs_to :groups

## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :users
- belongs_to :groups