echo "______________________________________________"
echo "Building the app"
rm -rf build
npm run build

echo "______________________________________________"
echo "updating constants.ts with the new version number"
node scripts/generate-version.js

echo "______________________________________________"
echo "Removing the [docs] folder"
rm -rf docs
echo "\t --> [docs] folder removed"
echo "Moving [build] folder to [docs] folder"
mv build docs
echo "\t --> [docs] folder re-created from build"

echo "Copying [e2e test reports] folder to [docs] folder"
cp -R cypress/reports docs/e2e-tests-report/
echo "\t --> [e2e test reports] copied"

echo "Copying [docs sections] folder to [docs] folder"
cp -R docs-sections docs/sections/
echo "\t --> [docs sections] copied"

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
