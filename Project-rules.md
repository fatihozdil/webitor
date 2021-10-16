# Perfect Commit
Don't commit all changes in one message, seperate them by choosing the files are changed.

- Add specific file 
```git add css/general.css```

- Look the changes
```git diff index.html```

- If you want to add only some changes in index.html
```git add -p index.html``` Then git will ask you the parts you want to add

## Perfect commit message
Type ```git commit``` then git will open editor for commit message.
The commit message consists of 2 parts;  

- Subject
- Body

Left one line space after subject, then git will know that you are typing body now.

* Subject: concise summary of what happened
* Body: more detailed explanation
	* What is now different than before?
	* What's the reason for change?
	* Is there anytingh to watch out for / anything particularly remarkable?

```git log``` to check what happens

# Branching Strategies
Always integrate your own work with the work of the team.

#### Best practice
* Few branches
* Relatively small commits
* High quality tesing & QA standards

## Long running and short living branches
### Long running branches (master, main)
Theese are the branches will stay from the start to the end of the project.
Do not  commit changes to the long running branche(master, main) directly. First, commit them to the testing branches!

### Short living branches (feature, bug fix, refactoring...)
Theese branches should be deleted after integration (merge/rebase)

# Two most popular branching strategies
* Github Flow
* Gitflow 

## Github Flow
* Very simple, very lean.
* Only one long-running branche (main)
* +feature branches (feature, bug fix ....)

## GitFlow
* More structure, more rule
* 2 long running branches: 'main' and 'develop'
* Short-live branches are: 'features', 'releases', 'hotfixes'..

# Pull Requests
We might want to have some other eyes check on our code. This is what pull requests stands for.  
Pull request invites reviewers to provide feedback before merging.   

## Fork
Fork is your personal copy of a git repository. You can fork the original repository, make changes in your forked version and ***open a pull request to include those changes into the original repository.***

Clone the forked repostiory from your github, create new branche by ```git branche myNewBranche``` then ```git chekout myNewBranche```  
Make some changes and commit, then push it to your own fork repository by ```git push --set-upstream origin test```   
Then open the your fork repository on github web, github will notice the change you've made, and there will be a button called ```Compare & Pull Request```if ypu continue with this, the request will appear on the repository's original owner's screen.

# Merge Conflicts

# Merge vs Rebase





