echo "______________________________________________"
echo "Building the app"
rm -rf build
npm run build

echo "______________________________________________"
echo "Removing the [docs] folder"
rm -rf docs
echo "\t --> [docs] folder removed"
echo "Moving [build] folder to [docs] folder"
mv build docs
echo "\t --> [docs] folder re-created from build"

echo "End of the Demo build. Content of the [docs] folder:"
ls -al docs/

echo "______________________________________________"
echo "adding new ./docs file changes to current branch"
git add .
git commit -m"docs: new online demo web release"

echo "______________________________________________"
echo "updating CHANGELOG.md, tagging this release, bumping version for next release"
yarn run release

echo "______________________________________________"
echo "Pushing to Github (including tags)"
git push --follow-tags
