# Radar Technologies

## Project

### Client App Setup

The Client project consists of the main View pages, and multiple shared Components.

The Views are divided in the Home page, and the Radar page. 

The Home page is where users initially land, and provides the navigation to the different Radars. Here users can choose 
to view an existing Radar, find a private Radar or create a new Radar.

The Radar page is where users see the actual Radar for a given Domain. 

### Server App Setup

#### Voting Session

In the Votes Controller, a list of Sessions is stored. Each Session has a URL, a BlipId, and a list of Connections. A
Connection consists of the WebSocket object (i.e. the User connection), and possibly a vote made by that User. 
- The URL is used to group connections from the same Radar. All Users from the same Radar are stored under the same URL 
(which is the same as the Radar name)
- The BlipId is used to identify which Blip the Users are voting for, and indicates that a Session is active (i.e. Users 
are currently voting for the position of this Blip).
- Each Connection consists of a WebSocket object which is unique for each User
- Each Connection also stores the Vote made by that User. So all votes can be counted by collecting all the votes stored 
under the Connection of a Session.

When a User *connects* to the Session of a Radar, that Connection is stored to a Session with a specific URL (the URL of
the Radar which the User is looking at). 

When a User *starts* a voting session for a given Blip, that BlipId is stored under that Session. Therefore, when a 
BlipId is defined, this means that a Voting Session is active. 

When a User *votes* for a specific Blip, that vote is stored under the Connection of that User. All voting events are
send to all Connections for that Session (i.e. all connections under the same URL). 

When a User *stops* a Voting Session, the BlipId is removed from the Session (thereby indicating that there is no
current active session), and all votes from all Connections to that Session are reset. 

When a User *closes* a connection to a Session (e.g. when they close the front-end application), that Connection and the 
vote from that User are removed from the Session. A new event is sent to all Connections. 

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
