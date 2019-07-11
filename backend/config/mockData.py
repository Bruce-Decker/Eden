from pymongo import MongoClient
from bson import ObjectId
from random import randint
from random import randrange
from datetime import datetime
import random

def main():
  client = MongoClient("mongodb+srv://Eden:qwe123456@eden-cluster-nrey3.mongodb.net/test?retryWrites=true&w=majority")
  #client = MongoClient("mongodb://localhost:27017/eden")
  db = client.test

  #itemUser(db)
  #cart(db)
  #item(db)
  #properties(db)
  #itemRatings(db)
  #services(db)

# ItemUser
def itemUser(db):
  db.itemUsers.drop()

  adjectives = ['cool','new','stylish','fun','hip','amazing','awesome','trendy','designer','faux']
  colors = ['red','orange','yellow','green','blue','purple','pink','white','black','gray']
  items = ['blazer','sweater','jacket','hoodie','pants','shorts','sweatpants','cardigan','vest','jeans']
  users = [(0,'adam@gmail.com'),(1,'bob@gmail.com'),(2,'cindy@gmail.com'),(3,'david@gmail.com'),(4,'eric@gmail.com'),(5,'florence@gmail.com'),(6,'gary@gmail.com'),(7,'heather@gmail.com'),(8,'irene@gmail.com'),(9,'joe@gmail.com')]
  comment = 'I liked it'
  itemId = 0

  for a in adjectives:
    for c in colors:
      for i in items:
        itemId += 1
        user = users[randint(0,9)]
        itemUser = {
          'item_id': str(itemId),
          'item_name': '{0} {1} {2}'.format(a,c,i),
          'user_id': str(user[0]),
          'user_name': user[1],
          'comment': comment,
          'visited_count': randint(1,10),
          'purchased_count': randint(1,3),
          'rating': randint(1,5),
        }

        result = db.itemUsers.insert_one(itemUser)

  print('Finished inserting {0} items into ItemUsers collection.'.format(itemId))

# Cart
def cart(db):
  db.carts.drop()

  items = ['blazer','sweater','jacket','hoodie','pants','shorts','sweatpants','cardigan','vest','jeans']
  users = [(0,'adam@gmail.com'),(1,'bob@gmail.com'),(2,'cindy@gmail.com'),(3,'david@gmail.com'),(4,'eric@gmail.com'),(5,'florence@gmail.com'),(6,'gary@gmail.com'),(7,'heather@gmail.com'),(8,'irene@gmail.com'),(9,'joe@gmail.com')]

  for u in users:
    cart = {
      'cart_id': str(u[0]),
      'items': [{
        'item_id': str(u[0]+1),
        'quantity': randint(1,5)
      }],
      'email': u[1]
    }

    result = db.carts.insert_one(cart)

  print('Finished inserting 10 carts into Carts collection.')

# Item
def item(db):
  db.items.drop()

  categories = ['appliances', 'arts', 'books', 'clothing', 'computers', 'electronics', 'games', 'home']
  adjectives = ['cool','new','stylish','fun','hip','amazing','awesome','trendy','designer','faux']
  colors = ['red','orange','yellow','green','blue','purple','pink','white','black','gray']
  items = ['blazer','sweater','jacket','hoodie','pants','shorts','sweatpants','cardigan','vest','jeans']
  imgPath = 'clothing.jpg'

  itemId = 0
  for a in adjectives:
    for c in colors:
      for i in items:
        itemId += 1
        item = {
          'item_id': str(itemId),
          'item_name': '{0} {1} {2}'.format(a,c,i),
          'item_image': imgPath,
          'category': categories[int(randrange(0,len(categories)))],
          'description': '{0} {1} {2}'.format(a,c,i),
          'price': float(randrange(500,10000))/100,
          'average_rating': randint(1,5),
          'ar': 'ar_default.png' if randint(0,1) > 0.5 else None,
          'bid_price': float(randrange(1,100))/100,
          'bids': generateBids(randint(0,5))
        }

        result = db.items.insert_one(item)

  print('Finished inserting {0} items into Items collection.'.format(itemId))


  db.itemUsers.drop()

  adjectives = ['cool','new','stylish','fun','hip','amazing','awesome','trendy','designer','faux']
  colors = ['red','orange','yellow','green','blue','purple','pink','white','black','gray']
  items = ['blazer','sweater','jacket','hoodie','pants','shorts','sweatpants','cardigan','vest','jeans']
  users = [(0,'adam@gmail.com'),(1,'bob@gmail.com'),(2,'cindy@gmail.com'),(3,'david@gmail.com'),(4,'eric@gmail.com'),(5,'florence@gmail.com'),(6,'gary@gmail.com'),(7,'heather@gmail.com'),(8,'irene@gmail.com'),(9,'joe@gmail.com')]
  comment = 'I liked it'
  itemId = 0

  for a in adjectives:
    for c in colors:
      for i in items:
        itemId += 1
        user = users[randint(0,9)]
        itemUser = {
          'item_id': str(itemId),
          'item_name': '{0} {1} {2}'.format(a,c,i),
          'user_id': str(user[0]),
          'user_name': user[1],
          'comment': comment,
          'visited_count': randint(1,10),
          'purchased_count': randint(1,3),
          'rating': randint(1,5),
        }

        result = db.itemUsers.insert_one(itemUser)

  print('Finished inserting {0} items into ItemUsers collection.'.format(itemId))

def generateBids(k):
  arr = []
  emails = ['adam@gmail.com','bob@gmail.com','cindy@gmail.com','david@gmail.com','eric@gmail.com']
  amounts = [2.00,2.50,3.00,3.50,4.00]
  dates = ['04/06/2019', '03/01/2019', '05/08/2018', '11/24/2017', '02/12/2019', '01/05/2019']

  if k == 0:
    return arr
  else:
    for i in range(k):
      date = datetime.strptime(dates[randint(0, len(dates) - 1)], '%m/%d/%Y')
      bid = {
        'email': emails[i],
        'amount': amounts[i],
        'time': date
      }
      arr.append(bid)
  
  return arr

# Properties
def properties(db):
  db.properties.drop()

  addresses = ['Apartment 9, 201 Cuesta Dr','Apartment 7, 521 E Taylor Ave','717 Ellsworth Pl','550 E Weddell Dr','580 Arastradero Rd','555 E El Camino Real,','Donohoe St','1363 Kingfisher Way','Apartment 105, 500 Fulton St','20875 Valley Green Dr']
  cities = ['Sunnyvale','San Jose','Mountain View','Palo Alto','Los Altos']
  zip_ = ['94022', '95112', '94312', '94821', '91242', '95213', '95563', '91823', '98721', '99874']
  users = [(0,'adam@gmail.com'),(1,'bob@gmail.com'),(2,'cindy@gmail.com'),(3,'david@gmail.com'),(4,'eric@gmail.com'),(5,'florence@gmail.com'),(6,'gary@gmail.com'),(7,'heather@gmail.com'),(8,'irene@gmail.com'),(9,'joe@gmail.com')]
  home_types = ['houses', 'apartments', 'townhomes']
  listing_types = ['sale', 'rent']
  propId = 0

  for i in range(5000):
    propId += 1
    user = users[randint(0,9)]
    ltype = randint(0,1)
    price = randint(500,5000) if ltype == 1 else randint(50000,1000000) 
    property_data = {
      'id': propId,
      'address': addresses[int(randrange(0,len(addresses)))],
      'state': 'CA',
      'user_id': str(user[0]),
      'user_name': user[1],
      'city': cities[int(randrange(0,len(cities)))],
      'zip': zip_[int(randrange(0,len(zip_)))],
      'desc': 'You will love living in this modern and spacious 1 bedroom apartment located in Sunnyvale with easy freeway access! Inside you will find, ample white kitchen cabinetry, black granite countertops, updated fixtures, plush carpeting and hard surface flooring! Wood beam ceilings add lots of architectural appeal! This downstairs unit also features an enclosed patio area.',
      'email': user[1],
      'phone': 6699990000,
      'lat': random.uniform(37.20838626323297,37.43254343446974),
      'lng': random.uniform(-122.15024233370286,-121.77773714571458),
      'home_type': home_types[randint(0,2)],
      'listing_type': listing_types[ltype],
      'num_bath': randint(1,10),
      'num_bed': randint(1,10),
      'space': randint(500,5000),
      'price': price,
      'images': ['home1.jpg', 'home2.jpg', 'home3.jpg']
    }
    result = db.properties.insert_one(property_data)

  print('Finished inserting {0} items into Property collection.'.format(propId))

# ItemRating
def itemRatings(db):
  db.itemRatings.drop()
  users = [
    (0,'adam@gmail.com'),(1,'bob@gmail.com'),(2,'cindy@gmail.com'),
    (3,'david@gmail.com'),(4,'eric@gmail.com'),(5,'florence@gmail.com'),
    (6,'gary@gmail.com'),(7,'heather@gmail.com'),(8,'irene@gmail.com'),
    (9,'joe@gmail.com'),(10,'hoxodo@atech5.com'),(11,'kuracichub@memeil.top'),
    (12,'rexuxus@atnextmail.com'),(13,'x13@x.com'),(14,'x14@x.com'),
    (15,'x15@x.com'),(16,'x16@x.com'),(17,'x17@x.com'),(18,'x18@x.com'),
    (19,'x19@x.com'),(20,'x20@x.com'),(21,'x21@x.com'),(22,'x22@x.com'),
    (23,'x23@x.com'),(24,'x24@x.com'),(25,'x25@x.com'),(26,'x26@x.com'),
    (27,'x27@x.com'),(28,'x28@x.com'),(29,'x29@x.com'),(30,'x30@x.com'),
    (31,'x31@x.com'),(32,'x32@x.com'),(33,'x33@x.com'),(34,'x34@x.com'),
    (35,'x35@x.com'),(36,'x36@x.com'),(37,'x37@x.com'),(38,'x38@x.com'),
    (39,'x39@x.com'),(40,'x40@x.com'),(41,'x41@x.com'),(42,'x42@x.com'),
    (43,'x43@x.com'),(44,'x44@x.com'),(45,'x45@x.com'),(46,'x46@x.com'),
    (47,'x47@x.com'),(48,'x48@x.com'),(49,'x49@x.com'),(50,'x50@x.com')
  ]

  c = 0
  for u in users:
    for i in range(1,1001):
      # skip with 30% probability for some sparsity
      p = randint(1,10)
      if p > 3:
        c += 1
        r = {
          'email': u[1],
          'item_id': str(i),
          'item_rating': randint(1,5)
        }
        result = db.itemRatings.insert_one(r)
  
  print('Finished inserting {0} items into ItemRatings collection.'.format(c))

def services(db):
  db.services.drop()

  addresses = ['Apartment 9, 201 Cuesta Dr','Apartment 7, 521 E Taylor Ave','717 Ellsworth Pl','550 E Weddell Dr','580 Arastradero Rd','555 E El Camino Real,','Donohoe St','1363 Kingfisher Way','Apartment 105, 500 Fulton St','20875 Valley Green Dr']
  cities = ['Sunnyvale','San Jose','Mountain View','Palo Alto','Los Altos']
  zip_ = ['94022', '95112', '94312', '94821', '91242', '95213', '95563', '91823', '98721', '99874']
  users = [(0,'adam@gmail.com'),(1,'bob@gmail.com'),(2,'cindy@gmail.com'),(3,'david@gmail.com'),(4,'eric@gmail.com'),(5,'florence@gmail.com'),(6,'gary@gmail.com'),(7,'heather@gmail.com'),(8,'irene@gmail.com'),(9,'joe@gmail.com'),(10,'A')]
  names = ['CostLess Heating & Cooling Services', 'Hewlett Electric', 'Willow Glen Electric', 'Absolute Power', 'BDS Locksmith', 'Modern Lock & Security', 'San Jose Safe & Lock', 'Sonic Locksmith', 'Trusted Movers', 'Spartan Moving Systems', 'A2B Movers', 'American HVAC', 'Global Heating & Cooling Services', 'Frank\'s Yard Clean-Up', 'All Green Scape']
  desc = 'We take pride in our business by providing you 5 star service. What makes us different from other companies is that we make sure we show up on time, provide affordable pricing, and honest work. We are here for you to make sure we take care of your heating and cooling systems.'
  services = ['A/C Installation', 'A/C Repair', 'Air Duct Cleaning', 'Electric Furnace Installation', 'Electric Furnace Repair', 'Emergency Services', 'Flame Sensor Repair', 'Gas Furnace Installation', 'Gas Furnace Repair', 'Heater Installation', 'Heater Repair', 'Thermostat Repair']
  categories = ['contractors', 'landscaping', 'electricians', 'locksmiths', 'cleaners', 'movers', 'hvac', 'plumbers']
  servId = 0

  for _ in range(1000):
    servId += 1
    user = users[randint(0,10)]
    comments, sum_rating = generate_comments()
    reviews = {
      'rating': sum_rating,
      'count': len(comments),
      'comments': comments
    }
    rating = round((sum_rating / len(comments)), 1)
    name = names[randint(0, len(names) - 1)]
    category = categories[randint(0, len(categories) - 1)]
    service_data = {
      '_id': ObjectId(),
      'address': addresses[int(randrange(0,len(addresses)))],
      'state': 'CA',
      'user_id': str(user[0]),
      'user_name': user[1],
      'city': cities[int(randrange(0,len(cities)))],
      'zip': zip_[int(randrange(0,len(zip_)))],
      'category': category,
      'name': name,
      'desc': desc,
      'email': user[1],
      'phone': 6699990000,
      'lat': random.uniform(37.20838626323297,37.43254343446974),
      'lng': random.uniform(-122.15024233370286,-121.77773714571458),
      'services': services,
      'rating': rating,
      'reviews': reviews,
      'logo': 'home1.jpg',
      'images': ['home1.jpg', 'home2.jpg', 'home3.jpg']
    }
    result = db.services.insert_one(service_data)

  print('Finished inserting {0} items into Service collection.'.format(servId))

def generate_comments():
  result = []
  sum_rating = 0
  users = ['adam', 'bob', 'cindy', 'david','eric','florence', 'gary','heather','irene','joe', 'A']
  comments = ['I really appreciate Richard and Nick works for us today. They are very professional and efficiently helped us clean air conditioner tunnel dust accumulated for years. They even helped me clean up my refrigirater top dust that I did not see for years and provided me good opinions on how to maintain the system for future. Their service is far beyond good service and I highly recommended.',
             'A real pro, found the problem with my AC within minutes and took 10 min to replace the part. price was very reasonable and all in all experience was very good',
             'Awesome service!  We called our go-to HVAC company when our AC went out and they told us they wouldn\'t be able to come out for almost a month.',
             'The best. On time. The technician was great. Repaired our air conditioner in a short amount of time at a reasonable rate. Thanks. Would highly recommend and would call them again',
             'We got extremely lucky! I called and Henry was literally at our house within 5 minutes. He came in diagnosed the problem, had the part in his van, replaced it and off he went. Great service friendly technician. Made some recommendations for upgrades but didn\'t do a hard sell. Will recommend. 5 stars all the way!',
             'Awesome!',
             'Do not use this service!',
             'I cannot say enough about Henry and the ThermaTech team and will certainly use them for any future HVAC needs! Honest and fast help.',
             'Phenomenal customer service!! We will be working with Therma Tech when we need to get a new AC unit.',
             'There were too many problems to write about in detail, so I\'ll just list some of them. The workmen were nice but changed form day to day. After explaining what was to be done on one day, another plumber, installer, etc, would come in the following day and we\'d have to try to explain what was to be done all over again. Job took 4 times as along as expected. Several times parts of the job was done and then undone and then redone, due to a variety of issues.'
            ]
  dates = ['04/06/2019', '03/01/2019', '05/08/2018', '11/24/2017', '02/12/2019', '01/05/2019']
  for _ in range(1, randint(5,500)):
    rating = randint(1,5)
    date = datetime.strptime(dates[randint(0, len(dates) - 1)], '%m/%d/%Y')
    sum_rating += rating
    user = users[randint(0,10)]
    data = {
      '_id': ObjectId(),
      'rating': rating,
      'date': date,
      'user_name': user,
      'user_id': randint(0,10),
      'comment': comments[randint(0, len(comments) - 1)],
      'upvote': [],
      'downvote': []
    }
    result.append(data)
  return result, sum_rating

if __name__ == "__main__":
  main()












