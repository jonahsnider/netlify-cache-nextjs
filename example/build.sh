now=$(date +"%T")
currentDate=$(date +"%a")
path=".next/cache/$currentDate.txt"

mkdir -p .next/cache

rm -f $path

echo $now >> $path
