from pymongo import MongoClient
from random import randint
from random import randrange
import random

def main():
  #client = MongoClient("mongodb+srv://Eden:qwe123456@eden-cluster-nrey3.mongodb.net/test?retryWrites=true&w=majority")
  client = MongoClient("mongodb://localhost:27017/eden")
  db = client.eden

  #itemUser(db)
  #cart(db)
  #item(db)
  #properties(db)
  itemRatings(db)

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
          'ar': 'ar_default.png' if randint(0,1) > 0.5 else None
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

if __name__ == "__main__":
  main()












