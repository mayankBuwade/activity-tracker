
# Activity Tracker

The project is made for the users who want to keep track of their daily excercie activities.
* Custom login
* Date wise data tracking
* Editing modifying existing data
#

## Installation
Download the project, go the the frontend directory and open terminal and write

```bash
  npm install
  npm start
```
Go to the backend directory, create a .env (dot env) file and write the following configuration in it
```editor
    PORT=4000
    MONG_URI=use your mongo uri
    SECRET=put any sequence of characters
```
save the file and open the terminal in in the backend directory and write
```bash
  npm install
  node server.js
```
## Acknowledgements
This project was made by following the MERN stack course by The Net Ninja. I have modified features after completing the project.
<br />
Following are the features added by me:- 
- User can add activities based on date
- User can see activites based on date
- User can edit past activities
