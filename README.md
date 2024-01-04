# TakeOver
A simple conquer the map game for North Carolina State Software Development Bootcamp course.

Using HTML, CSS and JavaScript create a web based game for milestone 1.

# Game Play
The game is a turned based for 1 or 2 players. Player 1 is you and Player 2 is either another person or an AI opponet. You each take turns attacking new territories and fortifying your territories. Unoccupied territories have barbarians in them. The goal is to defeat the opponet base territory marked by the troop total in a yellow box.

# Game Mechanics
You receive new troops each turn based on the total number of territories you control. The more territoies you control the more troops you get at the start of each turn. You click on the territory you want to attack from and then the territory you want to attack. You get feed back as to the results of each attack. You can fortify your teritories by clicking on the source (from) and the desistination (to) territory. You can attack/fortify ajacent territoies only. You can end your turn anytime by clicking on 'End Turn' button.

You must have at least 4 troops in the attacking from territory to attack a territory. 
You must have at least 2 troops in the territory you want to fortify from.
A popup message will show if you try to attack or fortify non-ajacent territories or try to attack with less than 4 troops or move with only 1 troop.


# Features
The game includes sounds and uses HTML tag blocks as territories. These are customized using CSS. JavaScript controls the flow of the turn, by click function. The game supports basic AI at this time. You are prohibitted from 'wrapping' the map area. 

Sound from: https://freesfx.co.uk/


# Future enhancements
* random number of barbarains in unoccupied territories for greater challenge
* configure AI opponenet to make more than one attack and one foritify move on it's turn
* add terrain to each territory to support modifiers in attacks and defense
* improve graphics
* improve AI determination sequence for attacks and fortifing
