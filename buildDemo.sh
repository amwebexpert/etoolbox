echo "Building the app"
rm -rf build
npm run build

echo "Removing the [docs] folder"
rm -rf docs
echo "\t --> [docs] folder removed"

echo "Moving [build] folder to [docs] folder"
mv build docs
echo "\t --> [docs] folder re-created from build"

echo "End of the build. Content of the [docs] folder:"
echo "______________________________________________"
ls -al docs/
