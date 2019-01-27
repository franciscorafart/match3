
# Match 3 - React and Redux backend

- Intro
This is a match 3 style game built as two separate applications. A backend express application built with Redux and Redux saga to handle state on the backend and a front-end react application to display the game. They're both on a same repository but are totally separate.

- How to run
1. Pull the code.
2. Run $npm install in both the /express and /react folders
3. On the /express directory run $npm run dev . This will set up your server in localhost
4. On the /react directory run $npm run start

Backend:
All the game logic happens on the backend. Each Tile click or game play returns a new state of the board and an array with all the transition states that were needed to achieve a board without 3 (or more) tiles matching.
