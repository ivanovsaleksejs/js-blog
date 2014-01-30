{-# LANGUAGE OverloadedStrings #-}

module App.DbMySQL where

import Database.MySQL.Simple
import Database.MySQL.Simple.QueryParams
import GHC.Int (Int64)

dbGet  c  = query_ c

dbGetP c  = query  c

dbAdd  c p = execute c insertComment p

selectPosts :: Query
selectPosts = "\
\       select p.id, p.header, p.preview, p.content, u.name, DATE_FORMAT(p.date, '%d %m %Y'), count(c.id) \ 
\           from posts p \
\           join users u \
\               on p.user = u.id \
\           join comments c \
\               on p.id = c.post \
\           group by p.id \
\           order by p.date desc"

selectPost :: Query
selectPost = "select header,content,u.name, DATE_FORMAT(date, '%d %m %Y') from posts join users u on user = u.id where posts.id = ?"

selectComments :: Query
selectComments = "select post,comment,user,u.name, DATE_FORMAT(date, '%d %m %Y') from comments join users u on user = u.id where comments.post = ? order by date"

insertComment :: Query
insertComment = "insert into comments (post, comment, user, DATE_FORMAT(date, '%d %m %Y')) values (?, ?, ?, now())"
