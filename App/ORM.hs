{-# LANGUAGE DeriveDataTypeable #-}

module App.ORM where

import Data.Typeable (Typeable)
import Data.Data (Data)
import qualified Data.Text as T (unpack)
import qualified Data.ByteString.Lazy.Char8 as L (pack)
import Data.Digest.Pure.MD5

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

getPosts conn offset = do
    posts <- dbGetP conn selectPosts [(offset*20)::Int]
    return [Post id header preview content user date cc [] | 
                (id,h,p,c,u,d,cc) <- posts,
                let [header, preview, content, user, date] = map T.unpack [h,p,c,u,d]]

getPost conn id = do
    post <- dbGetP conn selectPost [id::Int]
    comments <- getComments conn id
    return $ head [Post id header "" content user date (length comments) comments | 
                        (h,c,u,d) <- post,
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
    res <- dbExec conn insertComment (post comment, text comment, user_id comment)
    return res

getComments conn id = do
    comments <- dbGetP conn selectComments [id::Int]
    return [Comment post text user_id user_name date | 
                (post,t,user_id,un, d) <- comments,
                let [text, user_name, date] = map T.unpack [t,un,d]]

data User = User {
        u_id :: Int,
        display_name :: String,
        login :: String,
        password :: String
    }
    deriving (Data, Typeable)

nullUser :: User
nullUser = User {
        u_id = undefined,
        display_name = "",
        login = "",
        password = ""
    }

instance FromData User where
    fromData = do
        l <- look "login"
        p <- look "password"
        return nullUser {
                login = l,
                password = show . md5 $ L.pack p
            }

checkUserLogin conn user = do
    res <- dbGetP conn checkUser (login user, password user)
    return $ head [User id name (login user) "" | (id,n) <- res, let name = T.unpack n]
