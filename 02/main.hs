parseCommand line = let [com, val] = words line in (com, read val :: Int)

processCommand (depth, horiz, aim) (com, val) = case com of
  "down" -> (depth, horiz, aim + val)
  "up" -> (depth, horiz, aim - val)
  "forward" -> (depth + (aim * val), horiz + val, aim)

main = interact $ \input ->
  let (depth, horiz, _) = foldl processCommand (0, 0, 0) $ map parseCommand $ lines input in show $ depth * horiz