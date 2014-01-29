module App.Router where

import Control.Monad (msum)
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

        serveDirectory DisableBrowsing ["index.html"] "static" 
    ]

-- Routing items
rAddComment conn = method POST >> decodeBody postBodyPolicy >> parseComment conn
rGetPosts   conn = fR $ getJSONResponse getPosts conn
rgetPost    conn = path $ fR . getJSONResponse (getPost conn)

-- Helpers
fR f = fmap toResponse f

postComment conn comment = liftIO $ addComment conn (comment :: Comment) 

parseComment conn = fR . resultToJSON . withData $ postComment conn 
