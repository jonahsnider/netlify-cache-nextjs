now=$(date +"%T")
currentDate=$(date +"%a")
path="./.next/cache/$currentDate.txt"

rm $path

echo $now >> $path
