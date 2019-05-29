# README

This README would normally document whatever steps are necessary to get the
application up and running.

## usersテーブル 

|Column|Type|Options|
|------|----|-------| 
|name|string|null: false, unique: true, index: true|


### Assocition  
- has_many :groups, through::group_users 
- has_many :group_users
- has_many :massages

## groupsテーブル 

|Column|Type|Options|
|------|----|-------| 
|name|string|null: false, unique:true|

### Assocition 
- has_many :users, through::group_users
- has_many :group_users 
- has_many :messages

## messagesテーブル  

|Column|Type|Options|
|------|----|-------| 
|body|text|
|image|string|
|group|references|foreign_key:true|
|user|references|foreign_key:true|

### Assocition 
- belongs_to :group
- belongs_to :user

## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


