# Data Visualization

![Data Visualization Screenshot]([images/Project2.png](https://media.discordapp.net/attachments/969352530658230302/1084019466460995685/image.png?width=2244&height=1160))

## Project Goal

Take a data file in .csv file and display it in a creative way that represents the data in a unique, interesting way

## Personal Goal

Using a .csv file on video game development issues, display each issue on a square grid of colours, with the option of being able to highlight a color and get more insight into the game

## How to operate program
Each square represents a single issue encountered within that video game genre. The similar colours represent an umbrella grouping. Red represents production, blue represents management and green represents buisness. By holding space you will be able to get text displayed over each square for the specific issue, making it easier to parse the data. Further shades represent specific issues. To learn more, hover the mouse over a square and summary will be presented on the right hand side of the window. By pressing the numbers displayed on-screen you can cycle through genres

## How the code works

- Take data from csv file put it into an array
- Display a user guide for the program by displaying simple text blocks
- Update the current array used depending on what genre is currently selected
- Take the length of the array, round up to the nearest perfect square, and draw each square going down each column and then across each row, up until the length of the array is met
- If cursor is hovered over a square, display a block on the right hand side that displays specific information of the game and it's issues, including a developer quote
- If space bar is held, display each game's development issue in the middle of the square
- Take the array and split it into further arrays depending on each game genre


## Issues encountered

The biggest issue by far was drawing a grid that could contain non perfect-square numbers. The nature of a nested for loop for a grid is only to draw the grid as a perfect square. My first idea was to draw a perfect square and then draw the leftover squares beside it. This proved difficult to display the extra squares, due to the fact that the grid dynamically scaled, updated itself, and more. My second idea was to make an intentionally bigger grid, rounding *up* to the nearest perfect square and make a grid out of that. I would then only have to draw the squares up to a certain point. While this generally worked, the main issue was that the squares would repeat themselves once they reached the end of the array due to the fact that there was no way to make sure that the squares were only being drawn as long as they didn't hit the max array length. After spending days making complicated work arounds, I found the simple solution was to make an if statement, only drawing the squares if the afformentioned condition was true, and that the squares weren't being drawn if the array length was already hit. From there it was relatively smooth sailing, aside from some unfinished lines of code that caused some bugs I had to clean up.
