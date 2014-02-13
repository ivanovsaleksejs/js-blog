{-# LANGUAGE OverloadedStrings #-}

module App.Router where

import Control.Monad (msum, guard)
import Control.Monad.Trans (liftIO)

import qualified Data.ByteString.Lazy.Char8 as L (pack)
import Data.Digest.Pure.MD5

import Happstack.Server

import App.ORM
import App.Connect
import App.Controller

-- Routing rules
routes conn = msum [
        isAjax >> msum [
            dir "login"     $ rLogin conn, 
            dir "comment"   $ rAddComment conn, 
            dir "posts"     $ rGetPosts conn,
            dir "post"      $ rgetPost conn
        ],
        serveDirectory DisableBrowsing ["index.html"] "static",
        serveFile (asContentType "text/html") "static/index.html"
    ]

-- Routing items
rAddComment conn = rPost $ parsePost postComment conn
rLogin      conn = rPost $ parsePost loginUser conn
rGetPosts   conn = fR $ getJSONResponse getPosts conn
rgetPost    conn = path $ fR . getJSONResponse (getPost conn)

-- Helpers
isAjax :: ServerPart ()
isAjax = do
    h <- getHeaderM "X-Requested-With"
    guard (h == Just "XMLHttpRequest")

fR f = fmap toResponse f

rPost f = method POST >> decodeBody postBodyPolicy >> f

parsePost f conn = fR . resultToJSON . withData $ f conn 

postComment conn comment = liftIO $ addComment conn (comment :: Comment) 

loginUser conn user = liftIO $ checkUserLogin conn (user :: User)
