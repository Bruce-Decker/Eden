from pymongo import MongoClient
from surprise import Dataset
from surprise import Reader
import pandas as pd

def main():
  #client = MongoClient("mongodb+srv://Eden:qwe123456@eden-cluster-nrey3.mongodb.net/test?retryWrites=true&w=majority")
  client = MongoClient("mongodb://localhost:27017")
  db = client.eden

  cursor = db.itemRatings.find()
  df = pd.DataFrame(list(cursor))
  del df['_id']

  print(df.shape)

if __name__ == "__main__":
  main()