{-# LANGUAGE OverloadedStrings #-}

module App.DbMySQL where

import Database.MySQL.Simple
import Database.MySQL.Simple.QueryParams
import GHC.Int (Int64)

dbGet  c  = query_ c

dbGetP c  = query  c

dbAdd  c p = execute c insertComment p

selectPosts :: Query
selectPosts = "select header,content,u.name from posts join users u on user = u.id order by date desc"

selectPost :: Query
selectPost = "select header,content,u.name from posts join users u on user = u.id where posts.id = ?"

selectComments :: Query
selectComments = "select post,comment,user,u.name from comments join users u on user = u.id where comments.post = ? order by date"

insertComment :: Query
insertComment = "insert into comments (post, comment, user, date) values (?, ?, ?, now())"
