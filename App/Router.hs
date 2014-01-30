{-# LANGUAGE OverloadedStrings #-}

module App.Router where

import Control.Monad (msum, guard)
import Control.Monad.Trans (liftIO)

import Happstack.Server

import App.ORM
import App.Connect
import App.Controller

-- Routing rules
routes conn = msum [
        dir "comment"   $ rAddComment conn, 
        dir "posts"     $ rGetPosts conn,
        dir "post"      $ rgetPost conn,
        serveDirectory DisableBrowsing ["index.html"] "static",
        serveFile (asContentType "text/html") "static/index.html"
    ]

-- Routing items
rAddComment conn = requireAjax $ (rPost $ parseComment conn)
rGetPosts   conn = requireAjax $ (fR $ getJSONResponse getPosts conn)
rgetPost    conn = requireAjax $ (path $ fR . getJSONResponse (getPost conn))

-- Helpers
isAjax :: ServerPart ()
isAjax = do
    h <- getHeaderM "X-Requested-With"
    guard (h == Just "XMLHttpRequest")

requireAjax f = isAjax >> f

fR f = fmap toResponse f

rPost f = method POST >> decodeBody postBodyPolicy >> f

postComment conn comment = liftIO $ addComment conn (comment :: Comment) 

parseComment conn = fR . resultToJSON . withData $ postComment conn 
