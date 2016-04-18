Welcome to the README file of Roomies: An app for roommates to turn their weekly "to-do" lists into a game!

## This app was created as part of General Assembly's Web Development Immersive course by:
* @kaushalpatel922 (focus: points algorithm, add/edit form and css styling)
* @kristynlyncheski (focus: react bootstrap, design, css styling and responsiveness, visual effects)
* @yoogol (focus: user interaction functionality)


## Core Technology Used
* React for frontend
* Node/Express/Mongo for backend
* Trello, Google Drive, Slack for team coordination

## Additional Packages Used
* CSS loader and Style loader (for external stylesheet)
* React Bootstrap (for modals, tooltips, buttons and dropdowns)
* React Scrollbar (for adding scrollbars to components)
* Moment and React Datetime (for calendar on "Add a Task" menu)
* React FontAwesome (for using FontAwesome within React)

## Accomplished App Features
* **Multi-user registration** via a pop-up box on window load. Users can:
  * register a new account by creating a new group
  * register a new account and join an existing group (by providing group password)
  * login to an existing account and see their and their roommate tasks and scores
  * "peek in" without registering to play around with dummy data
  * up to 2 users are currently supported
* **App info/instructions** via a pop-up box on click of an icon in the upper left corner
* **Group/users scoreboard** via a pop-up box on click of an icon in the upper right corner
  * scores are updated every time users complete (or uncomplete) a task
  * scoreboard displays scores for this week and last week
  * winner is determined based on last week's scores
  * a punishment is displayed that the user who lost has to do
* **Title reflects current group name and user names** for the user currently logged in
* **Tasks are generated for appropriate user/group and appear in appropriate boxes:**
  * To Do List: if a task is not claimed by any of the roomies
  * Roomie 1 or 2 List: if a task is claimed by Roomie 1 or 2 correspondingly
  * Completed List: after a task has been marked as complete
* Each unclaimed task can be:
  * claimed via a drop-down box (the task will move to the appropriate roomie box)
  * edited via a pop-up edit form (the form is pre-filled with task info to edit)
  * deleted
* Each claimed task can be:
  * completed (the task will move to the completed list)
  * unclaimed (the task will move back to the todo list)
* Each completed task can be:
  * unchecked/uncompleted (will move back to the appropriate claimed box)
* **Adding new task** happens on click on a "+" button on top of the to do list. Inputs requested from user include:
  * task title
  * task deadline
    * a dropdown calendar will appear to receive data and time input from user
    * only a date/time in the future can be selected
  * estimated time to complete the task (in minutes provided via dropdown)
  * "yuckiness" level (from 1 to 5 via dropdown box)
* **Points the newly added task is worth** are automatically calculated based on user's input of deadline, time and yuckiness
* **For each completed task points are added** to appropriate user's score. Un-completing the task will revert this.

## Major Attempted But Unsolved Challenges
* Drag and drop capability in React

## Additional features planned
* Deploy app online
* Ability for more than two users in a group
* Secure user login
* Users can input a punishment or choose a random one that changes weekly
* Connect with social media (Facebook, Twitter, Snapchat)
* More improvement on score algorithm
