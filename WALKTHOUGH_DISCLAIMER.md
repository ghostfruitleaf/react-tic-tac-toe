# REGARDING THIS SOLUTION WALKTHROUGH

## Disclaimer for the Purpose of the Walkthrough
My personal opinion is that I should be able to distribute a resource such as 
this walkthrough openly, as understanding WHY a particular solution works is not
the same as "copying" or "using" someone else's solution.

That said, I'm aware this has been a point of contention in various coding 
programs and classes, so unfortunately out of an abundance of caution I have 
felt the need to write this disclaimer as follows: 

I wrote up this walkthrough upon interest expressed by current Ada students at the 
time of writing this seeking additional resources to understand the concepts 
used in this project and to walk though an example of a working solution. 

The comments and this page I have added as part of the walkthrough were done on 
my own time, NOT on behalf of Ada. 

The code was written as part of a pair project while I was a student at Ada. 

I started and completed this walkthrough AFTER this assignment was due for the 
current cohort, and purely for purpose of review and learning. To this end, I 
did NOT write this walkthough in an attempt to encourage or allow current Ada 
students to violate Ada's academic integrity policies, nor is it my intent to 
do so. 

## Disclaimer for Code Explained in the Walkthrough
While there are areas of this code that we attempted to optimize this is NOT an
optimal solution nor is it the only solution. 

It is, however, a working solution that I hope alongside commentary I have added 
throughout the code highlights the following: 

* HOW and WHY this solution works; 
* A deep-dive into any techniques used that are not covered in depth in the Ada curriculum;
* Key concepts introduced and used in this project that are emphasized in Ada's curriculum.

The intent is that the information provided is sufficient for one to be able to 
develop an independent solution that may even optimize some of the code in this
current solution. 

As one example, there are many opportunities where Javascript's
`map()` and `concat()` functionalities could be utilized that weren't. 

Another example is that this solution is not easily expandable to accommodate 
scenarios such as multiple Tic-Tac-Toe boards, Tic-Tac-Toe boards larger than 
3x3, or allowing a player to start as either 'x' or 'o' instead of only 'x', 
as an example. 

## Navigation

Refer to the [README](https://github.com/ghostfruitleaf/react-tic-tac-toe/tree/solution-walkthrough) on the instructions given to us for this iteration of the 
project (C14). 

I don't believe we were required to write additional tests, and they were 
provided to us. We needed to change the following files: 

* **Recommended to start here:** [src/App.js](https://github.com/ghostfruitleaf/react-tic-tac-toe/blob/solution-walkthrough/src/App.js)
* [src/components/Board.js](https://github.com/ghostfruitleaf/react-tic-tac-toe/blob/solution-walkthrough/src/components/Board.js)
* [src/components/Square.js](https://github.com/ghostfruitleaf/react-tic-tac-toe/blob/solution-walkthrough/src/components/Square.js)

As such, these contain the contents of this walkthough. Hopefully this helps!