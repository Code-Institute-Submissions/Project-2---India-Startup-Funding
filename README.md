LIVE DEMO LINK
==============
https://vfs.cloud9.us-east-2.amazonaws.com/vfs/8e1fb160a19943e4a179f2634afd724a/preview/startup/index.html


BACKGROUND:
==========
* This dataset was taken from https://www.kaggle.com/.  It provides funding information on the India startups from Janaury 2016 to August 2017.  It includes information on the date funded, the state the startups are based out of, the names of the startups, the names of the funders, the industry of these startups and the amount invested (in USD).

* There are 1433 startups that get funding during this period.  Total amount funded is about USD 9.65 billion, of which 98.28% is from Private Equity and 1.72% is from Seed Funding. In total 801 new startups received USD 165 million. Each new startup received average USD 205,000 in seed Funding. For the same period, Equity Funding of USD 9.5 billion was invested in 632 existing startups. Each exisitng startup received average USD 15 million in funding.   

* Top 3 state in India with the most startup are Bangalore, Mumbai and New Delhi.

* Top 3 sector that received the most funding are eCommerce, Consumer Internet and Technology.

* Top 5 startup that received the most funding are :
     1) Flipkart  - An eCommerce shopping platform founded in year 2007.
     2) Paytm - A digital payment and eCommerce platform founded in year 2010.
     3) Ola Cabs - A transportation platform founded in year 2010 (similar to Uber).
     4) Oyo Rooms - A Hotel Chain founded in year 2013.  It is the world third latest Hotel Chain.
     5) Snapdeal - An eCommerce shopping platform founded in year 2007.


 
UX DESIGN:
==========
* The data was presented in charts and graphs using D3, DC and Crossfilter for user to have a quick understanding of the Indian startup landscape. 

* The 1st row give a quick breakdown on total number of startup based on state as well as the size and type of funding. 

* On 2nd row, 3 different charts are shown side by side for user to have a quick understanding on which state; industy as well as startup that received the most funding.

* The charts and graphs on the dashboard are easy to navigate.  For example, when user click on Bangalore under that chart "India State With The Most Startup", other charts and graphs, with information related to Bangalore state will change according.

* On the right side of the heading, a "report" onclick button is provided for user who prefer to view a written summary on this report. 



USER STORIES:
============
The dashboard is an efficent and effective way for user to understand the India Startup Funding landscape.  Complicated data on thousands of startup, can be understood in a couple of minutes. The charts/ graphs provide details for the following questions
* How does the funding ecosystem change with time?
* Which state has the most startup as well as received the most funding?
* Which industries are favored by investors for funding?
* What type of funding is availbale to startups. How much fund does startups gnerally get in India?



FEATURES 
========
* This project make use of D3, DC and Crossfilter to slice complex data with maximum speed and effectiveness.
* Charts and graphs are self explanatory. They help user to understand complex data within minutes.
* To know more on funding in Bangalore, user just need to click on Bangalore bar in the 1st chart (India State With The Most Startup). The rest of the chart will show all the relevant information on Bangalore.
* Website is design using mobile-first approach.





TECHNOLOGIES 
=============
The following languages, frameworks, libraries, and tools were used to construct this project. 
* HTML
* CSS
* Bootstrap (https://getbootstrap.com/) : This project uses Bootstrap to simplify the development of the webpage
* JavaScript
* D3.js (https://cdnjs.com/libraries/d3)
* DC.js (https://cdnjs.com/libraries/dc)
* crossfilter.js (https://cdnjs.com/libraries/crossfilter)
* queue.js (https://cdnjs.com/libraries/queue-async)
* lodash.js (https://cdnjs.com/libraries/lodash.js/)



TESTING
=======
* Testing was done across multiple viewports sizes to ensure responsiveness. HTMLHint were used to check the HTML code and CSSLint were also used to check the CSS code. JSHint was used to check the Javascript code.

* Manual testing was employed to check charts and graphs to make sure crossfilter was working well on multiple charts and graphs.

 

DEPLOYMENT
==========
* This site is hosted using GitHub pages, deployed directly from the master branch. The deployed site will update automatically upon new commits to the master branch. 


Credit
======
The data was take from https://www.kaggle.com


