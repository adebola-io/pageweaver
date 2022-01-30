<p align='center' width='100%'>
 <img src='logo.png' height='100px'></img>
</p>

 <h1 align='center'>Pageweaver</h1>

 <p align='center' style='font-size: 10pt'> Current Version: 0.0.3 </p> 
  
 Pageweaver is a Node JS command-line application for generating and managing web sites and apps.

## Contents

- [Installation](#Installation)
- [Usage](#Usage)
  - [Creation](#Creation)
  - [Development](#Development)
  - [Production](#Production)
  - [Deletion](#Deletion)

---

## Installation

To get started,

1.  Download the latest version of Node for your system.
2.  Open up the terminal or command line interface:
3.  Type in the following command and press Enter:

```console
npm install -g pageweaver
```

This will install pageweaver globally on your system, so that it can be used from any project. To install it locally use:

```console
 npm install pageweaver
```

For more on local installation, see [here](LOCAL_USE.md).

---

## Usage

### Creation

To create a new app, use:

```console
pageweaver create-app app-name
```

##### Creation Arguments

Pageweaver allows you to generate complex apps by chaining arguments e.g.

```console
pageweaver create-app myapp --react-cli/17.0.6 --react-router --react-redux --typescript --scss
```

The above command will generate a new React v17.0.6 app called 'myapp' in the root folder, with SCSS, TSX, Redux and the React Router all pre-installed.

Learn more about the different creation arguments [here](CREATION.md).

Arguments and general data about a new web page or web app are stored in the `projects.config.json` file, which is also located in the root directory of your projects folder.

 <p style='font-size:10pt'> Manually editing or deleting the config file can lead to command malfunctions. It is not advisable to do so. </p>

### Development

To start a development server for your web app, use:

```console
pageweaver serve-app app-name
```

The above command will open a port on the localhost and serve your project in the browser.

### Production

Pageweaver also provides you the feature of readying a project for production/deployment (provided it is developed with a supported framework).

To build a developed web app, run:

```console
pageweaver build-app app-name
```

Pageweaver will simply run the corresponding build command for the framework.

### Deletion

To delete an existing project, run:

```console
pageweaver delete-app app-name
```

<p style='font-size:10pt'>Pageweaver-generated projects CANNOT be restored once they are deleted.</p>

### Complete Deletion

If you want to erase every web project in every sub-directory in a folder, run:

```console
pageweaver nuke-folder
```

The above command will delete all the pageweaver-generated projects in the specified folder. As with the delete-app command, it CANNOT be undone.
