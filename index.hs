module Main where

import Control.Monad.Reader
import Happstack.Lite
import Database.MySQL.Simple

import App.Connect
import App.ORM
import App.Controller
 
routes conn = msum [
        getResponse getPosts conn 
    ]

main = do
    conn <- connect dbConfig
    (routes conn) >>= serve Nothing 
