## Cell_Sequencer, a music generation environment

Project version : still under cnstruction.

### Requirements

Open on a desktop browser (no mobile support yet). Use chrome for a better experience.

### `Quick play`

There are two ways to create notes - By touching the grid and giving a direction to the created cell ; - By pressing "new random cell".

To quickly have some fun, just press play and see what happens.
Feel free to insert new cells and to change the different parameters.For instance you can change the grid size, the scale of the notes being played, ...

To change the tempo, you need to press on "Stop" and then on "Start" again to make it effective.

### `Basic concept`

This project is based on the concept of cellular automatons.
For more info about that :
https://en.wikipedia.org/wiki/Cellular_automaton ;
https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life.

### 'When two cells meet

When two cells meet:
They make a sound;
If they're not too young (blue), they get a child;
They get back some life points (with a limit of 10).
They get a new direction.

### 'Notes and sounds'

In synth mode, the X axis determines the note played (do, ré, mi, ...), and the Y axis the octave (based on the octave base and range).
In drum mode, the X axis determines the drum part being triggered, and the Y axis the drum kit (1 drum kit per octave range)."

### 'Directions and Chaos'

In determinist mode, when two cells meet, their direction is reversed.Let's bring some chaos : in chaos mode, when two cells meet, they get a random direction for the next step.

### `Life parameters`

Every cell has a direction and a life expetancy(blue, green, orange, red). The cells lose lifepoints when they hit the walls. When a cell no longer has life points, it dies.
