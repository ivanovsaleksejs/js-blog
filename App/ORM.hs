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
        url  :: String,
        user :: String,
        date :: String
    }
    deriving (Data, Typeable)

getPosts conn offset = do
    posts <- dbGetP conn selectPosts [(offset*20)::Int]
    return [Post id header preview content url user date | 
                (id,h,p,c,ur,u,d) <- posts,
                let [header, preview, content, url, user, date] = map T.unpack [h,p,c,ur,u,d]]

getPost conn url = do
    post <- dbGetP conn selectPost $ map (map escape) [url::String]
    if length post > 0
        then return $ head [Post id header "" content url user date | 
                        (id,h,c,ur,u,d) <- post,
                        let [header, content, url, user, date] = map T.unpack [h,c,ur,u,d]]
    else
        return $ Post 0 "" "" "" "" "" ""
        where
            escape '\'' = ' '
            escape c    = c
