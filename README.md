formAt.js Readme.md 
====================
A form validator that provides live validation. 
This is a project made by Daniel Johnsson as part of a Javascript course in Blekinge Tekniska Högskola. 

For full demo and instructions on how to use please visist 
http://www.student.bth.se/~dajj12/javascript/lekplats/formAt.js/demo.php 


How to install Frost MVC
---------------------
### Step 1 - Download from Github

Download the plugin from the top of this page or clone it from git hub.
https://github.com/Trobiz/formAt.js

### Step 2 - Install formAt.js

formAt.js requires jQuery to function. Include the jQuery library, formAt.js and the formstyle.css to your site. 

<head>
<link rel="stylesheet" type="text/css" href="formstyle.css">
</head>

<body>
<form id="formAt">
<input data-number>
</form> 

<script src="jquery-1.9.1.js"></script>
<script src="formAt.js"></script>
<script>
$('#formAt').format('validateForm');
</script>
</body>

This is all you need to do to get formAt.js up and running!

### Step 3 - Usage

formAt.js commes with some predefined validation rules and a regex rule where you may specify your own rules.

The basic functions are displayed in the Simple Demonstration above. All you need to to is to copy the input string and paste it to your form. The magic word to make the form validate according to a rule lies within the data-attribute. If you type data-name formAt.js will validate the field as a name. If you type data-email it will be validated as an e-mail. It's that simple.

The Credit Card rule supports some major credit cards such as. Visa, Master Card, Diners, Amex, Discover or JCB. If no creditcard is supplied in the data-creditcard attribute, formAt.js will check for them all!

