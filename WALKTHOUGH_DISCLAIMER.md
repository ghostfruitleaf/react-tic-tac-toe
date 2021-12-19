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

That said, please feel free to use this resource<sup>1</sup> as part of a curriculum or 
learning module. Just note that it's also subject to the open source MIT license
that defines usage rights for the rest of the repo. 

*<sup>1</sup> Resources include all content added by me (ghostfruitleaf@GitHub) 
to this particular branch of the original repo, such as this file, comments I 
added to the source code, and a picture of a batch of cookies.*

## Disclaimer for Code Explained in the Walkthrough
While there are areas of this code that we attempted to optimize, this is NOT an
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
`map()` and `concat()` functionalities could have been utilized that weren't. 

Another example is that this solution is not easily expandable to accommodate 
scenarios such as multiple Tic-Tac-Toe boards, Tic-Tac-Toe boards larger than 
3x3, or allowing a player to start as either 'x' or 'o' instead of only 'x', 
to name a few. 

## Navigation

Refer to the [README](https://github.com/ghostfruitleaf/react-tic-tac-toe/tree/solution-walkthrough) on the instructions given to us for this iteration of the 
project (C14). 

I don't believe we were required to write additional tests, and they were 
provided to us. We needed to change the following files: 

* **Recommended to start here:** [src/App.js](https://github.com/ghostfruitleaf/react-tic-tac-toe/blob/solution-walkthrough/src/App.js), which controls the state of the entire app and to render a board, renders one of:
* [src/components/Board.js](https://github.com/ghostfruitleaf/react-tic-tac-toe/blob/solution-walkthrough/src/components/Board.js), which, to render the squares of a board, renders many of:
* [src/components/Square.js](https://github.com/ghostfruitleaf/react-tic-tac-toe/blob/solution-walkthrough/src/components/Square.js)

As such, these contain the contents of this walkthough. Hopefully this helps!

## The React/Recipe Analogy, but Actually Readable (and with a Postscript)
This analogy is also found in [src/App.js](https://github.com/ghostfruitleaf/react-tic-tac-toe/blob/solution-walkthrough/src/App.js), but I'm including it 
here for readability. This is what personally helped React state vs. props make
sense for me -- I've expanded the analogy outside of making cookies (the original 
analogy) to cooking in general. 

So that this entire file isn't just a lot of text, I've also included an image of 
some cookies I tried making a few years ago. 

![Cookies I baked a few years ago that ended in miscalculated disaster, but looked cute before going into the oven](/walkthrough_cookie_image.jpeg)

They looked fine until they went into the oven... but they did taste good. 

### And Now... That Analogy
Think of your favorite recipe -- it has ingredients you have to put together to 
make the dish, right? 

In React, the app is your final dish.

As such, the components are the ingredients (or, they are recipes for an 
ingredient you need for the overall dish). 

Just like each ingredient has its own variant (ex) using elbow pasta or 
spiral pasta for a mac and cheese recipe), each component has their own 
"props" (aka properties), whose values are stored in the app state. 

Think of rendering your app like cooking your dish. You may follow the 
recipe to the tee, you may swap an ingredient or two, you may add some more 
of an ingredient or take something out. but more or less it will 
hopefully come out as the final dish.

In React, this would be the same as re-rendering your app to reflect the 
app's current state. what the user sees on the screen as a result of the 
app's state is equivalent to the "final dish"

When you re-render in React, you are "re-cooking the dish," and that is 
essentially what useState () is helping you control. 

If you use an egg to make a cheese omelette, for instance, you can't use 
that egg again to make a spinach omelette, because you already used it -- 
so you still need to use an egg, but you have to grab a new egg for the
spinach omelette. It might be a brown egg, a duck egg, or an animal-free
egg substitute, but it will still be serve the purpose of the egg or 
egg substitute in your omelette.

Similarly, when you update React's app state, you have to re-render ALL the 
components along with the information you updated. 

So in the line: 
 
```const [squares, setSquares] = useState(generateSquares());```

`useState(generateSquares)` informs your app that the first time you render/
cook your dish, the `squares` from `const [squares, setSquares]` will come 
from the output of `generateSquares()`.

In turn, `squares` will tell your App what "kind" of `squares` you will send 
into your `Board` component: 

```<Board squares={squares} onClickCallback={checkForWinner() ? () => {} : updateSquare}/>```

`setSquares` from `const[squares, setSquares]` is the function you use to 
tell your app to re-render (cook a new batch of your recipe), and it updates
your app to re-render with the new squares in your Board component (aka 
cook a new batch of your recipe with a variation). 

This is why `setSquares` has to regenerate the ENTIRE `Board`, instead of just 
needing to update the square that changed.

### Postscript 
Unfortunately, since I refer to line numbers throughout the walkthrough, it is 
a little hard to include this in the code files after I wrote it out, so I'd 
like to note here that the recipe analogy was very useful in helping me 
understand and communicate why we must try to manage state as much as possible 
in App.js with this scenario (or the way I view it):  

Imagine you have a very complicated recipe for dish A, which requires you to 
make B, C, and D in order to make A. 

However, to make B, you need a recipe for E and F. To make C, you need a recipe 
for G and H. and for D, you need a recipe for Z. 

Now, imagine that the recipes to make A, B, C, D, E, F, G, H, and Z are all in 
completely separate locations around the internet (or your recipe card holder). 

To me, if you don't have all of recipe A memorized, or you just send recipe A to 
someone else asking them to make it, whoever's making this recipe is going to 
have a hard time organizing all that information in one place, ESPECIALLY if 
they're trying to calculate all the ingredients and amounts that they need, and 
are trying to follow the recipe as they go (especially if subrecipes of a 
recipe needs an ingredient that other subrecipes of subrecipes of a subrecipes
need). 

So personally speaking, I would find it much more convenient to be able to 
see ALL the ingredients and amounts I need for A, B, C, D, E, F, G, H, AND Z in 
one place ready to go to actually make the recipe, so I don't have to worry
about finding the ingredients everytime I start a subrecipe under
A, B, C, or D, and can just focus on making the recipe instead of needing to 
prepare for it.

[As an example, here is a recipe from the Great British Bake Off that is very 
complicated](https://thegreatbritishbakeoff.co.uk/recipes/all/prue-leith-sable-breton/). Note that in the "Ingredients" column, it lists all the ingredients
and amounts you need, but separates them by each subcomponent of the overall
recipe, instead of solely putting the ingredients for a subcomponent on a 
completely separate page. 

Similarly, it is MUCH more convenient for App.js to manage the entire app state, 
and let components focus more on how they USE the values in the app state. This 
also makes it easier to add new components to your app that may need the same 
state properties as another component. 
