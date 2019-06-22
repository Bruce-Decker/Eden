from pymongo import MongoClient
from surprise import Dataset
from surprise import Reader
from surprise import SVD
from surprise.model_selection import GridSearchCV
from surprise.model_selection.split import train_test_split
from surprise.prediction_algorithms.knns import KNNWithMeans
from collections import defaultdict
from datetime import datetime
import pandas as pd

def main():
  #client = MongoClient("mongodb+srv://Eden:qwe123456@eden-cluster-nrey3.mongodb.net/test?retryWrites=true&w=majority")
  client = MongoClient("mongodb://localhost:27017")
  db = client.test

  cursor = db.itemRatings.find()
  df = pd.DataFrame(list(cursor))
  del df['_id']
  #print(df.head())

  reader = Reader(rating_scale=(1, 5))
  data = Dataset.load_from_df(df[['email', 'item_id', 'item_rating']], reader)

  user_based(data, db)
  #item_based(data, db)

def user_based(data, db):
  # user-based collaborative filtering: recommend the
  # top n items based on similar users
  param_grid = {'k': [20,25,30,35,40],
                'min_k': [1],
                'sim_options': {'name': ['msd'],
                                'user_based': [True],
                                'min_support': [1]}
               }
  gs = GridSearchCV(KNNWithMeans, param_grid, measures=['rmse'], cv=4)
  gs.fit(data)
  best_rmse = gs.best_score['rmse']
  best_params = gs.best_params['rmse']
  print(best_rmse)
  print(best_params)
  
  k = best_params['k']
  m = best_params['min_k']
  n = best_params['sim_options']['name']
  u = best_params['sim_options']['user_based']
  s = best_params['sim_options']['min_support']
  so = {'name':n,'user_based':u,'min_support':s}

  trainset = data.build_full_trainset()
  algo = KNNWithMeans(k=k,min_k=m,sim_options=so)
  algo.fit(trainset)
  testset = trainset.build_anti_testset()
  predictions = algo.test(testset)

  # get top n predictions, in order
  top_n = get_top_n(predictions, n=10)

  # insert into database
  db.userRecs.drop()
  for uid, user_ratings in top_n.items():
    recs = [iid for (iid, _) in user_ratings]
    rec = {
      'user_id': uid,
      'recs': recs,
      'timestamp': datetime.utcnow()
    }
    result = db.userRecs.insert_one(rec)

  print('done')

def item_based(data, db):
  # content-based recommendations: recommend the
  # top n items similar to the current item
  param_grid = {'k': [20,30,40,50],
                'min_k': [1,5,10],
                'sim_options': {'name': ['msd'],
                                'user_based': [False],
                                'min_support': [1]}
               }
  gs = GridSearchCV(KNNWithMeans, param_grid, measures=['rmse'], cv=4)
  gs.fit(data)
  best_rmse = gs.best_score['rmse']
  best_params = gs.best_params['rmse']
  print(best_rmse)
  print(best_params)
  
  k = best_params['k']
  m = best_params['min_k']
  n = best_params['sim_options']['name']
  u = best_params['sim_options']['user_based']
  s = best_params['sim_options']['min_support']
  so = {'name':n,'user_based':u,'min_support':s}

  trainset = data.build_full_trainset()
  algo = KNNWithMeans(k=k,min_k=m,sim_options=so)
  algo.fit(trainset)
  testset = trainset.build_anti_testset()
  predictions = algo.test(testset)

  # get top n predictions, in order
  top_n = get_top_n(predictions, n=10)

  # insert into database
  for uid, user_ratings in top_n.items():
    print(uid, [iid for (iid, _) in user_ratings])

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













