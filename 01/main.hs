import Data.List (tails);

windows n xs = map (take n) (tails xs)

doubleGreater :: [Int] -> Int
doubleGreater [a, b] = if b > a then 1 else 0
doubleGreater _ = 0

main = interact $ \input ->
  -- show . sum . map doubleGreater . windows 2 . map read $ lines input
  show . sum . map doubleGreater . windows 2 . map sum . windows 3 . map read $ lines input
