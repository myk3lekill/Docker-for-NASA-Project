<-- create a repository for a project and upload initial commit-->
git init
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/myk3lekill/smartbrain.git
git push -u origin main

<-- upload files to an existing repository -->
git remote add origin https://github.com/myk3lekill/Picture-In_Picture.git
git branch -M main
git push -u origin main

<-- upload files -->
git add .
git commit -m 'second commit'
git push origin main

<-- remove git url orign (in case of changing repository) -->
git remote show origin
git remote remove origin

<-- change git url (in case of changing repository) -->
git remote set-url origin https://github.com/myk3lekill/template.git

<-- remove git inizializing (after removing git init you need to init repository again otherwise you will have too many files to git) -->
rm -rf .git*

<-- ignore node_modules files when using git -->
from Vs code create a .gitignore file and inside of it add the folder and filne name to ingore from git (es. node_modues)
when we clone repository we have to npm init folder again from terminal to add the node_modules folder

<-- remove .env file from history in repo -->
echo '.env' >> .gitignore
git rm -r --cached .env
git add .gitignore
git commit -m 'untracking .env'
git push origin master