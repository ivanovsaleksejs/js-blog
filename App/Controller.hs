module App.Controller where

import Control.Monad.Trans (liftIO)
import Text.JSON.Generic (encodeJSON)
import App.ORM

-- Helpers
resultToJSON obj = fmap encodeJSON obj

-- Actions
actionGetPosts conn = liftIO . getPosts conn
actionGetPost  conn = liftIO . getPost conn

actionPostComment conn comment = liftIO $ addComment conn (comment :: Comment) 
actionLoginUser   conn user    = liftIO $ checkUserLogin conn (user :: User)
