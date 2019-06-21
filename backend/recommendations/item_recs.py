from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from collections import defaultdict
from datetime import datetime
import numpy as np
import pandas as pd

def main():
  client = MongoClient("mongodb+srv://Eden:qwe123456@eden-cluster-nrey3.mongodb.net/test?retryWrites=true&w=majority")
  #client = MongoClient("mongodb://localhost:27017")
  db = client.test

  cursor = db.items.find({},{
    '_id': 0,
    'item_id': 1,
    'item_name': 1,
    'category': 1,
    'description': 1
  })
  df = pd.DataFrame(list(cursor))
  df['txt'] = df['category'] + ' ' + df['item_name'] + ' ' + df['description']
  df['item_id'].apply(str)
  #print(df.head())

  item_based(df, db)

def item_based(df, db):
  # content-based recommendations: recommend the
  # top n items similar to the current item

  db.itemRecs.drop()
  tfidf = TfidfVectorizer().fit_transform(df['txt'])

  for i in range(df.shape[0]):
    # calculate cosine similarity between each pair of items
    cosine_similarities = linear_kernel(tfidf[i:i+1], tfidf).flatten()

    # get the top 10
    rdi = cosine_similarities.argsort()[:-12:-1][1:]

    # insert into database
    iid = df.iloc[[i]]['item_id'].to_string(index=False)[1:]
    recs = [df.iloc[[x]]['item_id'].to_string(index=False)[1:] for x in rdi]
    
    rec = {
      'item_id': iid,
      'recs': recs,
      'timestamp': datetime.utcnow()
    }
    result = db.itemRecs.insert_one(rec)

  print('done')

def get_top_n(predictions, n=10):
  '''Return the top-N recommendation for each user from a set of predictions.

  Args:
      predictions(list of Prediction objects): The list of predictions, as
          returned by the test method of an algorithm.
      n(int): The number of recommendation to output for each user. Default
          is 10.

  Returns:
  A dict where keys are user (raw) ids and values are lists of tuples:
      [(raw item id, rating estimation), ...] of size n.
  '''

  # First map the predictions to each user.
  top_n = defaultdict(list)
  for uid, iid, true_r, est, _ in predictions:
    top_n[uid].append((iid, est))

  # Then sort the predictions for each user and retrieve the k highest ones.
  for uid, user_ratings in top_n.items():
    user_ratings.sort(key=lambda x: x[1], reverse=True)
    top_n[uid] = user_ratings[:n]

  return top_n

if __name__ == "__main__":
  main()













