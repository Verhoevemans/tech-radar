# Radar Domain

This document describes the Domain Design, and provides a guideline from a user perspective. 
Therefore the setup explained here will explain all the names and the different domains used throughout the application.


## User Roles

Visistors of the Radar application can have one of three roles, with different possibilities available.
- View
- Analyze
- Assess

### View

### Analyze

Users with role Analyze can select Technologies to be assessed. Analyze users can also delete Technologies which have been added to the list, but not yet assessed. 

### Assess

Users with role Assess can add new Technologies to the list of Technologies on the Radar page. This means that a Radar is accessible at any time to suggest new Technologies that might be interesting.
Technologies that have been added to a Radar but have not been assessed yet (i.e. opened up to the voting procedure, by a user with role Analyze, to determine the position of the Technology on the Radar), are listed separately from other Technologies, and only appear in the Technologies list, not on the Radar.


## Lexicon

**Radar**: a grouping of Technologies. A Radar can be created for an expertise (e.g. Java, Microsoft or Front-end), a discipline (e.g. Agile or AI) or even a specific company.

**Private Radars**: these Radars are not listed on the Home page of the application, and can only be accessed through the 'Find Radar' section on the Home page. 

**Public Radars**: can be viewed by anyone, and are displayed on the Home page of the application.

**Technology**: the topics which are mapped on a Radar. Technologies are divided into four quadrants, typically being Frameworks, Tools, Technologies and Platforms. But other distinctions can also be made, depending on the subject of the Radar.
