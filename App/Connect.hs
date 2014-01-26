module App.Connect where

import Database.MySQL.Simple

dbConfig = defaultConnectInfo {
                connectHost = "localhost",
                connectDatabase = "blog",
                connectUser = "blog",
                connectPassword = "blog"
           }
