verticalSum [x] = x
verticalSum (x:xs) = zipWith (+) x (verticalSum xs)

parseBin = map (\char -> if char == '1' then 1 else 0)
binToInt = foldl (\acc x -> acc * 2 + x) 0
binFreqs nums = (verticalSum nums, verticalSum $ map (map (1 -)) nums)

compBin comp ([one], [zero]) = [ if one `comp` zero then 1 else 0 ]
compBin comp (one:ones, zero:zeroes) = (if one `comp` zero then 1 else 0) : compBin comp (ones, zeroes)

calcRatingHelper comp [num] i = num
calcRatingHelper comp nums i =
  calcRatingHelper comp remaining (i + 1)
  where req = compBin comp (binFreqs nums) !! i
        remaining = filter (\num -> num !! i == req) nums
calcRating comp nums = calcRatingHelper comp nums 0

main = interact $ \input -> do
  let nums = map parseBin $ lines input
      freqs = binFreqs nums
      (gamma, epsilon) = (binToInt $ compBin (>) freqs, binToInt $ compBin (<) freqs)
      (oxygen, co2) = (binToInt $ calcRating (>=) nums, binToInt $ calcRating (<) nums)
  show (gamma * epsilon, oxygen * co2)