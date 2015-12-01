module App.Controller where

import Control.Monad.Trans (liftIO)
import App.ORM

actionGetPosts conn = liftIO . getPosts conn
actionGetPost  conn = liftIO . getPost conn
