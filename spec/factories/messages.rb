FactoryGirl.define do
  factory :message do
    body    Faker::Lorem.sentence
    image   Faker::File.file_name('path/to')
    user
    group
  end
end