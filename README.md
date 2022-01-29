<img src='logo.png' align='center'></img>
<h1 align='center'>Pageweaver</h1>
<p>

<h6 align='center'>Current Version: 0.0.3</h6>

Pageweaver is a node command-line application for generating and managing web sites and apps.

### Contents
- [Installation](#Installation)
- [Usage](#Usage)

--------------

## Installation
To get started, 
1. Download the latest version of Node for your system.
2. Open up the terminal or command line interface:
3. Type in the following command and press Enter:
```console
npm install -g pageweaver
```
This will install pageweaver globally on your system, so that it can be used from any project. To install it locally use:
```console
npm install pageweaver
```
-------------

## Usage

### Creation
To create a new app, use:
```console
pageweaver create-app app-name
```
#### Creation Arguments
Command line arguments allow you to generate different app templates. e.g.
```console
pageweaver create-page app-name --react-cli
```
The above command will generate a new react app, similar to what happens when you run create-react-app with npx. 
Learn more about the different creation arguments [here](http://pageweaver).</p>

Arguments and general info about a new web page or web app are stored in the pages.config.json file, which is located in the root directory of your project. 

###### Manually editing or deleting the config file can lead to malfunctions in the workings of Pageweaver. It is not advisable that you do so.

### Deletion
