{-# LANGUAGE OverloadedStrings #-}

module App.DbMySQL where

import Database.MySQL.Simple
import Database.MySQL.Simple.QueryParams
import GHC.Int (Int64)

dbGet  c  = query_ c

dbGetP c  = query  c

dbExec c q p = execute c q p

selectPosts :: Query
selectPosts = "\
\       select p.id, p.header, p.preview, p.content, p.url, u.name, DATE_FORMAT(p.date, '%d %m %Y') \ 
\           from posts p \
\           join users u \
\               on p.user = u.id \
\           where p.url != 'p' \
\           group by p.id \
\           order by p.date desc\
\           limit ?, 20"

selectPost :: Query
selectPost = "select posts.id,header,content,url,u.name, DATE_FORMAT(date, '%d %m %Y') from posts join users u on user = u.id where posts.url = ?"
