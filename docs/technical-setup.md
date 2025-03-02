# Radar Technologies

## Project

### Client App Setup

The Client project consists of the main View pages, and multiple shared Components.

The Views are divided in the Home page, and the Radar page. 

The Home page is where users initially land, and provides the navigation to the different Radars. Here users can choose to view an existing Radar, find a private Radar or create a new Radar.

The Radar page is where users see the actual Radar for a given Domain. 

## Coding Conventions

### Tools and Libraries
...

### Styling

#### CSS Naming Conventions

This project uses the BEM (Block, Element, Modifier) methodology (see [this article](https://css-tricks.com/bem-101/) as a reference). 

The Blocks are a top level abstraction of a new component, such as a Modal component. This block is the parent for the 
styling classes. Inside this block are the Elements, which will be denoted with 2 underscores following the name of the 
Block. Examples of Elements in the Modal component could be the header, close button or the body. Finally, the Modifiers 
can manipulate the Block, and are denoted with 2 hyphens. 

So a stylesheet for the Modal component will look like this:

    /* Block component */
    .modal {}
    
    /* Element of the Block */
    .modal__header {}
    .modal__close {}
    
    /* Modifiers that change the style of the Block */
    .modal--large {}
    .modal__close--disabled {}
