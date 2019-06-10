from pymongo import MongoClient
from random import randint
from random import randrange
import random

def main():
  client = MongoClient("mongodb://localhost:27017")
  db = client.eden

  itemUser(db)
  cart(db)
  item(db)
  properties(db)

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

  for i in range(10000):
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



if __name__ == "__main__":
  main()












