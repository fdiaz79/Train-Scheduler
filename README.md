# Train-Scheduler

This App will manage the schedule of the train routes. The App has 2 tabs; one is designed to display the routes in the database. The second tab is designed to add more routes, and in the future (once I get the gist of editing and deleting data in firebase) it will allow to modify existing routes and delete them by clicking in the already displayed icons.

All the input fields are required; the input field for the name of the train and the destination are text inputs. The input for the hour, minutes and frequency are numbers. The hour input is limited to the range between 00 and 23 and the minutes input is limited to the range between 00 and 59 to ensure a corret time format for moment.js. The input field frequency is limited to minimum 1, to avoid and infinite loop whne calculating the next train.

Once the page is loaded, all the data is loaded into their correspondent fields in the displaying table in the display tab and in the edit tab.

When the user click submit, the validation is perform and if the returned value is true, it proceeds to capture the information into local variables and then it is pushed into the firebase database.

Everytime the page is loaded or a new train information is entered, the information is rendered. The data is captured from the database into local variables, converted to milisecs applying moment.js. to make the necessary math and after that, the data is rendered with the adequate format by using moment.js again.

Like I said before, in the future the option of editing and deleting will be added, also the display refresh every minute.

Hop on here... https://fdiaz79.github.io/Train-Scheduler/
