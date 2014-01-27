module App.Controller where

import Control.Monad.Trans (liftIO)
import Text.JSON.Generic (encodeJSON)

resultToJSON obj = fmap encodeJSON obj

getJSONResponse f conn = (liftIO . resultToJSON . f) conn
