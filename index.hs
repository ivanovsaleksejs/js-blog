module Main where

import Control.Monad (msum)
import Happstack.Server
import Database.MySQL.Simple (connect, close)

import App.Connect
import App.ORM
import App.Controller
 
routes conn = msum [
        dir "posts" $ fmap toResponse $ getJSONResponse getPosts conn,
        dir "post" $ path $ fmap toResponse . getJSONResponse (getPost conn),
        serveDirectory EnableBrowsing ["index.html"] "static" 
    ]

main = do
    conn <- connect dbConfig
    simpleHTTP nullConf {port = 80} $ routes conn
    close conn
