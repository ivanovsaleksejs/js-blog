{-# LANGUAGE DeriveDataTypeable #-}
{-# LANGUAGE OverloadedStrings #-}

module App.ORM 

where

import Data.Typeable
import Data.Data
import Database.MySQL.Simple
import qualified Data.Text as T

data Post = Post {
        header :: String,
        content :: String,
        user :: String
    }
    deriving (Data, Typeable)

qall :: Query
qall = "select header,content,u.name from posts join users u on user = u.id"

getPosts conn = do
    posts <- query_ conn qall
    return [Post header content user | (h,c,u) <- posts, let [header, content, user] = map T.unpack [h,c,u]]
