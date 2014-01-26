module App.Controller where

import Happstack.Lite
import Text.JSON.Generic

resultToJSON obj = fmap encodeJSON obj

getResponse f conn = fmap (ok . toResponse) $ (resultToJSON . f) conn
