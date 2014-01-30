{-# LANGUAGE DeriveDataTypeable #-}

module App.ORM where

import Data.Typeable (Typeable)
import Data.Data (Data)
import qualified Data.Text as T (unpack)

import Happstack.Server
import App.DbMySQL


-- Posts
data Post = Post {
        id :: Int,
        header :: String,
        preview :: String,
        content :: String,
        user :: String,
        date :: String,
        comment_count :: Int,
        comments :: [Comment]
    }
    deriving (Data, Typeable)

getPosts conn = do
    posts <- dbGet conn selectPosts
    return [Post id header preview content user date cc [] | (id,h,p,c,u,d,cc) <- posts,
                                                             let [header, preview, content, user, date] = map T.unpack [h,p,c,u,d]]

getPost conn id = do
    post <- dbGetP conn selectPost [id::Int]
    comments <- getComments conn id
    return $ head [Post id header "" content user date (length comments) comments | (h,c,u,d) <- post,
                                                                                    let [header, content, user, date] = map T.unpack [h,c,u,d]]

-- Comments
data Comment = Comment {
        post :: Int,
        text :: String,
        user_id :: Int,
        user_name :: String,
        comment_date :: String
    }
    deriving (Data, Typeable)

nullComment :: Comment
nullComment = Comment {
        post = undefined,
        text = "",
        user_id = undefined,
        user_name = "",
        comment_date = ""
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

getComments conn id = do
    comments <- dbGetP conn selectComments [id::Int]
    return [Comment post text user_id user_name date | (post,t,user_id,un, d) <- comments,
                                                       let [text, user_name, date] = map T.unpack [t,un,d]]
