from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client.eden

# get list of item IDs
itemIds = db.items.distinct("item_id")

# for each item, get recommendations and insert into DB
for iid in itemIds:
  print(iid)