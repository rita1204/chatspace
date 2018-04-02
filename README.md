# DB設計
## users_table

|Column    |Type       |Options                          |
|----------|-----------|---------------------------------|
|id        |integer    |                                 |
|name      |string     |null:false,unique:true,index:true|
|email     |string     |null:false,unique:true           |
|password  |string     |null:false                       |

###Asociation
- has_many :messages
- has_many :groups, through: :group_users
- has_many :group_users


##groups_table

|Column       |Type       |Options               |
|-------------|-----------|----------------------|
|id           |integer    |                      |
|name         |string     |null:false,unique:true|



###Asociation
- has_many :users,through: :group_users
- has_many :group_users
- has_many :messages



##group_user_table

|Column       |Type       |Options                    |
|-------------|-----------|---------------------------|
|id           |integer    |                           |
|group_id     |reference  |null:false,foreign_key:true|
|user_id      |reference  |null:false,foreign_key:true|


###Asociation
- belongs_to :user
- belongs_to :group






##messages_table

|Column       |Type       |Options    |
|-------------|-----------|-----------|
|id           |integer    |           |
|body         |text       |null:false |
|image        |string     |           |
|user_id      |integer    |null:false |
|groups_id    |integer    |null:false |


###Asociation
- belongs_to :user
- belongs_to :group



