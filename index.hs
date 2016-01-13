module Main where

import Happstack.Server (simpleHTTP, nullConf, port)

import App.Connect
import App.Router

main = do
    conn <- dbConnect
    simpleHTTP nullConf {port = 3000} $ routes conn
    dbClose conn
