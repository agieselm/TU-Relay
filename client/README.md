# TU-Relay
Message broadcast system for Trinity University

# Quick Start Guide

## Send a New Message
Choose a type.
Fill out the fields for title and content. 
(Optional) Choose an image to attach to the message. 
Click submit. 
Click OK to send.

## Send a New Message With Template
Choose a template to auto-fill the form. 
Edit fields if desired. 
Click submit. 
Click OK to send.

# New Message Information
(Optional) Templates: Selecting a template from the drop-down menu will auto-fill the message information. This information can be edited in the form before the user submits the message. 
Type: Select a message type. Types are linked to a priority.
Title: Choose a title for the message.
Content: This is the message content itself. 
(Optional) Image: If the user would like to add an image to the message they are sending, one can be uploaded from the computer. 

# Templates
Select from the template drop-down to auto-fill the type, title, and content based on the message template. 
Afterwards, the user can edit the information and submit. 
The plus button on the right allows for the user to add a new template to the drop down list, or edit/delete an existing template.

# Types
Select from the type drop-down to choose a type for the new message. Each type is linked to a priority.
The plus button on the right allows for the user to add a new type to the drop down list or edit/delete an existing type.

# Old messages
## Active Messages
This list shows the previous messages that are still active.
If the user would like to deactivate one or more messages, the user can click the box with each corresponding message, and choose ‘Delete Selected Messages’. 
## Inactive Messages
This list shows the previous messages that are inactive.
If the user would like to activate one or more messages, the user can click the box with each corresponding message, and choose ‘Re-Activate Selected Messages’. 

# Admin Installation

Within the admin folder, there is another folder called release-builds.

In this folder are three more zip folders, one for each operating system:
- Mac: TU-Relay-darwin-x64
- Windows: TU-Relay-win32-x64
- Linux: TU-Relay-linux-x64

Each of these folders contains the application for the corresponding operating system. 
After copying the zip file to your computer, you can unzip the folder, where the executable application will be. 

If you would like to edit the source code and rebuild the app, you run each of the following commands from the command line:

npm run build-osx
npm run build-win
npm run build-linux 
