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
  users = [(0,'adam'),(1,'bob'),(2,'cindy'),(3,'david'),(4,'eric'),(5,'florence'),(6,'gary'),(7,'heather'),(8,'irene'),(9,'joe')]
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
  users = [(0,'adam'),(1,'bob'),(2,'cindy'),(3,'david'),(4,'eric'),(5,'florence'),(6,'gary'),(7,'heather'),(8,'irene'),(9,'joe')]

  for u in users:
    cart = {
      'item_id': str(u[0]+1),
      'item_name': 'cool red {0}'.format(items[u[0]]),
      'user_id': str(u[0]),
      'user_name': u[1],
      'quantity': randint(1,5)
    }

    result = db.carts.insert_one(cart)

  print('Finished inserting 10 carts into Carts collection.')

# Item
def item(db):
  db.items.drop()

  adjectives = ['cool','new','stylish','fun','hip','amazing','awesome','trendy','designer','faux']
  colors = ['red','orange','yellow','green','blue','purple','pink','white','black','gray']
  items = ['blazer','sweater','jacket','hoodie','pants','shorts','sweatpants','cardigan','vest','jeans']

  itemId = 0
  for a in adjectives:
    for c in colors:
      for i in items:
        itemId += 1
        item = {
          'item_id': str(itemId),
          'item_name': '{0} {1} {2}'.format(a,c,i),
          'category': 'apparel',
          'description': '{0} {1} {2}'.format(a,c,i),
          'price': float(randrange(500,10000))/100,
          'average_rating': randint(1,5)
        }

        result = db.items.insert_one(item)

  print('Finished inserting {0} carts into Carts collection.'.format(itemId))

if __name__ == "__main__":
  main()












