{-# LANGUAGE DeriveDataTypeable #-}

module App.ORM 

where

import Data.Typeable (Typeable)
import Data.Data (Data)
import qualified Data.Text as T (unpack)

import Happstack.Server
import App.DbMySQL


-- Posts
data Post = Post {
        header :: String,
        content :: String,
        user :: String,
        comments :: [Comment]
    }
    deriving (Data, Typeable)

getPosts conn = do
    posts <- dbGet conn selectPosts
    return [Post header content user [] | (h,c,u) <- posts, let [header, content, user] = map T.unpack [h,c,u]]

getPost conn id = do
    post <- dbGetP conn selectPost [id::Int]
    comments <- getComments conn id
    return $ head [Post header content user comments | (h,c,u) <- post, let [header, content, user] = map T.unpack [h,c,u]]

getComments conn id = do
    comments <- dbGetP conn selectComments [id::Int]
    return [Comment post text user_id user_name | (post,t,user_id,un) <- comments, let [text,user_name] = map T.unpack [t,un]]

-- Comments
data Comment = Comment {
        post :: Int,
        text :: String,
        user_id :: Int,
        user_name :: String
    }
    deriving (Data, Typeable)

nullComment :: Comment
nullComment = Comment {
        post = undefined,
        text = "",
        user_id = undefined,
        user_name = ""
    }

instance FromData Comment where
    fromData = do
        p <- lookRead "post"
        c <- look "text"
        return nullComment {
                post = p,
                text = c,
                user_id = 0
            } 

addComment conn comment = do
    res <- dbAdd conn (post comment, text comment, user_id comment)
    return res
