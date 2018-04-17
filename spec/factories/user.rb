FactoryGirl.define do
  factory :user do
    password = Faker::Internet.password(8)
    email                 Faker::Internet.free_email
    name                  Faker::Internet.user_name(8)
    password              password
    password_confirmation password
  end
end