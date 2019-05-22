from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client.eden

# get list of user IDs, i.e. unique email addresses
userIds = db.users.distinct("email")

# for each user, get recommendations and insert into DB
for uid in userIds:
  print(uid)