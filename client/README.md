# TU-Relay
Message broadcast system for Trinity University

## User Guide

## Send a New Message
1. Choose a type.
2. Fill out the fields for title and content. 
3. (Optional) Choose an image to attach to the message. 
4. Click submit. 
5. Click OK to send.

## Send a New Message With Template
1. Choose a template to auto-fill the form. 
2. Edit fields if desired. 
3. Click submit. 
4. Click OK to send.

## New Message Information
- **(Optional) Templates**: Selecting a template from the drop-down menu will auto-fill the message information. This information can be edited in the form before the user submits the message. 
- **Type**: Select a message type. Types are linked to a priority.
- **Title**: Choose a title for the message.
- **Content**: This is the message content itself. 
- **(Optional) Image**: If the user would like to add an image to the message they are sending, one can be uploaded from the computer. 

## Templates
- Select from the template drop-down to auto-fill the type, title, and content based on the message template. 
Afterwards, the user can edit the information and submit. 
- The plus button on the right allows for the user to add a new template to the drop down list, or edit/delete an existing template.

## Types
- Select from the type drop-down to choose a type for the new message. Each type is linked to a priority.
- The plus button on the right allows for the user to add a new type to the drop down list or edit/delete an existing type.

## Old messages
### Active Messages
- This list shows the previous messages that are still active.
- If the user would like to deactivate one or more messages, the user can click the box with each corresponding message, and choose ‘Delete Selected Messages’. 
### Inactive Messages
- This list shows the previous messages that are inactive.
- If the user would like to activate one or more messages, the user can click the box with each corresponding message, and choose ‘Re-Activate Selected Messages’. 

## Admin Installation

Within the admin folder, there is another folder called release-builds.

In this folder are three more zip folders, one for each operating system:
- Mac: TU-Relay-darwin-x64
- Windows: TU-Relay-win32-x64
- Linux: TU-Relay-linux-x64

Each of these folders contains the application for the corresponding operating system. 
After copying the zip file to your computer, you can unzip the folder, where the executable application will be. 

If you would like to edit the source code and rebuild the app, you run each of the following commands from the command line:

##### npm run build-osx
##### npm run build-winand navigate to the MySQL Server 
##### npm run build-linux 

## Server Set-up

To set up a version of the server on a Windows machine, you will first need to have MySQL Server installed. Then, follow these steps:

1. After cloning the repository, open the server folder and run the command npm i from the command line. This will install all dependencies.
2. Import the tu_relay.sql file into your instance of MySQL Server to get the tables used by the server.
3. In the server directory, add a databaseConfig.js file with the following structure:

```javascript
 const config = {
     host: "localhost",
     user: "root",
     password: "", //The root password for your MySQL instance
     database: "tu_relay",
     projectDir: "" //The full path of the server directory on your machine
 }
 
 module.exports = config
```
4. You can now run the server using the command npm start within the server directory. However, you will need to configure the server to allow the use of the MySQL LOAD_FILE function for image uploads to work. The full requirements for this function can be found at https://www.w3resource.com/mysql/string-functions/mysql-load_file-function.php. In particular:
    - Upon running the server, a tmp directory will be generated within the server directory. You will need to grant read and write permissions for this directory. To do so on Windows 10, navigate to the server directory using the file explorer. Right click on the tmp directory, and select "Properties". Click on the "Security" tab. You will see a list of users with permissions for this directory. Click the "Edit" button. In the new window that appears, click the "Add" button. Next, enter "NETWORK SERVICE" in the text box that appears. Click the "Check name" button and select "NETWORK SERVICE". This is the "user" that accesses folders for Windows network services like this server. In the Edit window, select this user and grant it full privileges. This will allow the server to read and write files to the tmp folder.
    - You will need to change a couple of system variables for the MySQL server. To do this in Windows, open the hidden ProgramData directory on the C drive. You may need to make hidden directories visible to do so. Next, open the MySQL Server directory and find the my.ini file. This file stores the system variables for the MySQL server. The two variables we are concerned with are max-allowed-packet and secure-file-priv. Find these variables within the my.ini file. The max-allowed-packet variable limits the size of file uploads to the server, so raise it to the largest file size you would like to use. The default is 4 Mb. The secure_file_priv prevents the LOAD_FILE function from accessing any folder other than the one specified. Change its value to an empty string to allow LOAD_FILE to access any folder.
5. The server should now be fully operational. Run the server using the command npm start within the server directory.
