from pymongo import MongoClient
from random import randint
from random import randrange

def main():
  client = MongoClient("mongodb://localhost:27017")
  db = client.eden

  itemUser(db)
  cart(db)
  item(db)

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
          'average_rating': randint(1,5)
        }

        result = db.items.insert_one(item)

  print('Finished inserting {0} items into Items collection.'.format(itemId))

if __name__ == "__main__":
  main()












