# Psalted 2 Repo

A repo built on ExpressJS and React with TypeScript

## Installation

1. Clone the repo
2. Run `yarn install`
3. Run `cd server && yarn install`
4. Run `cd ui && yarn install`

## Usage

1. Open your choice of Terminal/cmd/PowerShell
2. Run `cd server && yarn dev`

### Branch Prefix Definitions

`main` - Our Production branch. This is what our production server will always be hosting

`release` - This is the branch that our local development will rebase off and merge into. Every end of sprint, this branch will be merged into master

`feature` - This is a branch for our own personal features/task that we will be working on

`hotfix` - This is a branch for hotfixes that will directly be merged into `main` regardless of release/sprint cycle

#### Branch Best Practices

1. Branch naming convention: `(issueNumber)-(branchName)-description-of-task` (e.g `4-feature-chords-ui-improvement`)
   - issueNumber: this can be found beside the issue title when you click into an issue, or the number at the end of the issue link (eg. https://github.com/hmcc-global/psalted-2/issues/1 <--- #1)
     - This is helpful so that we can keep track of what issue a branch is working on without having to look up list of issues etc.
   - branchName: refer to Branch Prefix Definitions
2. When working on your own `feature` branch, do not forget to periodically update your local branch with the `release` branch to reduce likelikehood/size of merge conflicts
   - Instead of `git pull` we use `git pull --rebase` to pull changes from remote branch to our local branch. Rebasing helps to keep our Gitflow neat and linear which makes it easy to keep track of and trace
3. When all code changes have been finished in your `feature` branch, create a Pull Request and your peers review it before merging.
4. Branch merge flow should be: `feature`->`release`->`main` - i.e `feature` branches should always Pull Request and merge into `release`

## Commit Practices

1. Use the _command line_ for commits
   - e.g. `git commit -m "GH-8: Some commit message"`
   - doing so will run the git hooks that we have set-up (i.e. pre-commit formatting & linting, commit message format validation)
   - remember to use `git add` to stage your changes
2. Attach Issue number to the commit message
   - e.g. Issue number = #8
   - commit message: "GH-8: Some commit message"
   - note that issue number must be prefixed with 'GH-' in order to properly connect commit messages with issues

### Contributors

Jesus' disciples

---

_Engage people who were, are, and will be a part of HMCC-HK, in order to Equip them with resources and Enable the church vision to be lived out._
