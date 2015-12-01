{-# LANGUAGE OverloadedStrings #-}

module App.Router where

import Control.Monad (msum, guard)
import Text.JSON.Generic (encodeJSON)

import Happstack.Server

import App.Connect
import App.Controller

-- Routing rules
routes conn = msum [
        isAjax >> msum [
            rPost >> msum [],
            dir "posts"     $ rGetPosts conn,
            dir "post"      $ rGetPost conn
        ],
        serveDirectory DisableBrowsing ["index.html"] "static",
        serveFile (asContentType "text/html") "static/index.html"
    ]

-- Routing items
rGetPosts   = parsePath actionGetPosts
rGetPost    = parsePath actionGetPost

-- Helpers
rPost = method POST >> decodeBody postBodyPolicy

isAjax :: ServerPart ()
isAjax = guard . (Just "XMLHttpRequest" ==) =<< getHeaderM "X-Requested-With"

fR m f = fmap (toResponse . encodeJSON) . m . f

parsePath f = fR path f

parsePost f = fR withData f 
