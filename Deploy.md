## Steps to deploy Angular app to Github pages:

1. Create branch `gh-pages`
2. Add package `npm i angular-cli-ghpages --save-dev`
3. Push branch and setup repo settings (Repo --> Settings --> Pages)
3. Run build `ng build --configuration production --base-href "https://[github-username].github.io/[repo-name]/"`
4. Deploy app `npx angular-cli-ghpages --dir=dist/[project-name]`


ng build --configuration production --base-href "https://annamelnyk.github.io/star-wars/"
npx angular-cli-ghpages --dir=dist/star-wars