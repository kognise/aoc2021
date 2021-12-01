import Data.List (tails);

windows n xs = take (length xs - n + 1) $ map (take n) (tails xs)

main = interact $ \input ->
  -- show . length . filter (\[a, b] -> b > a) . windows 2 . map (\i -> read i :: Int) $ lines input
  show . length . filter (\[a, b] -> b > a) . windows 2 . map sum . windows 3 . map read $ lines input
