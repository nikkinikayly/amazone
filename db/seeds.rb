# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
3.times do
  department = Department.create(title: Faker::Commerce.department)
  2.times do
    product = Product.create(
        department_id: department.id,
        name: Faker::Commerce.product_name,
        description: Faker::Lorem.sentence,
        price: Faker::Commerce.price.to_f,
        stock: 1 + rand(100)
    )
    5.times do
      Review.create(
       product_id: product.id,
        subject: Faker::Commerce.material,
        body: Faker::Lorem.sentence,
        stars: 1 + rand(5),
        date: Time.at(rand * Time.now.to_i)
      )
    end
  end
end