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

echo "adding (and pushing) new ./docs file changes to current branch"
git add .
git commit -m"docs: new online demo web release"
git push
