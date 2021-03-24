# Footy Game Finder 
## La Liga and Premier League Edition

![alt text](https://github.com/DannyNagyAI/Code-Institute-Milestone-Project-02/blob/main/rm_teaser.jpg "Header of the One Page")

>This website was made for a fictive company named **(Footy Game Finder Co)** that needed a website to show all upcoming games for choosen top leagues in the world as La Liga and Premier League during the current season. 

The website displays information via a "radio button" about upcoming top league football matches in La Liga (Spain) and Premier League (England)
and also more info such as date, home team, away team, arena and witch city the games will be played. It also has some short information about the Footy Game Finder Co. in the footer, for the the users to contact or get a clearer picture of the company background.

My idea was to build the one page with a very simple usability and that also to make it easy for all football lovers to find their favorutie team's upcoming games. 

## User Experience (UX)
The idea for this project was to build a API front-end website for a fictive company that is showing the top leagues's upcoming games. 

Footy Game Finder Co. is interested in getting more people that likes football and the top leagues to find upcoming games easier and also through their own website.

The audience for this website are people that are nuts about both football and also like different leagues and to see when the next top league match will be played. 

**To be able to help the Footy Game Finder Co with their needs, I had to include:**

- A clean one page with focus on the matches/games. 

- Getting information about the upcoming games through an sport API.  

- Radio buttons to filter and get the infomation about the dates, home team, away team, arena and the location of the sport event. 

- Showcase reults of the API in a readable and userfriendly table.  

- A simple contact information in the footer. 

>I tried to stay on the same path during the entire project with both colors and pictures. 

 ### Mockup/Wireframe for the Project
 Link to the Footy Game Finder made in Figma: 
>https://www.figma.com/file/OxOnIsTdojWQ6fJbeNq0Ms/Real-Madrid-Game-Finder?node-id=0%3A1

## Features

### [One Page Website](https://github.com/DannyNagyAI/Code-Institute-Milestone-Project-01/blob/main/index.html)

- Logo - Just a big welcoming logo with Foot Game Finders colors to make the user feel like they are in the right place and that they can get familiar with the brand and company. 

- Information about the upcoming games with also some info and club logos in a simple table that makes it easy to overview for the users.

- Footer - Including some brief info about the website, contact and address.

- Resposive design sutiable for desktop, tablet and phone view. 


## Technologies used in the project
- **HTML5** 
- **CSS** 
- **[Bootstrap](https://getbootstrap.com/docs/4.5/getting-started/introduction/)** 
- **[JavaScript](https://www.javascript.com/)**
- **[API](https://sportdataapi.com/)**  I used the SportData  API to create the interactive part on the website.

- **[Gitpod](https://gitpod.com/)**
I relied on Gitpod's dev environment to write the code for my project.

- **[GitHub](https://github.com/)**
I hosted my deployed website to GitHub, with previous versions of my code stored through the commit history.

- **[Figma](https://www.figma.com/)** I used figma for creating the mockup and wireframe.

## Testing 

I have tested the Footy Game Finder website and was unable to find any error or bad links on the website. 

**Devices Used:**
-	iPhone x – iOS 11.4
-	iPad – iOS 11.2.2 & iOS 11.4.1
-	MacBook – iOS 11.4
-	PC – Windows 10

**Browsers Used:**
-	Chrome 
-	Safari
-   Mozilla 


### Navbar:

Click on each of the individual links within the menu (including the logo), and verify that each one is functioning correctly, and that they take the user to the correct place.

Scroll down and ensure the navbar moves smoothly out of view. In mobile, verify that if the menu is open and visible when the user starts to scroll, it collapses hides along with the rest of the menu.

Scroll back up and ensure the navbar reappears.

### Radio Buttons:

Click the 'Take me there' button, and verify it does in fact take the user to the weather section.
Travel Inspiration:

Click both the right and left arrows to ensure that the active photo in the carousel slides smoothly to the next photo.

Adjust size of browser window to various sizes, to ensure the carousel resizes well and is responsive.

Enter in a search location (such as 'Ireland'), click 'submit' and verify that the user is shown a carousel of photos matching their search term. (This was tested with multiple search terms, however it should be noted that the results do depend on how they were tagged when uploaded to the unsplash website, and so I cannot guarantee that all photos shown will be relevant).

Enter in a search term/ location, press 'enter' on the keyboard to ensure this also triggers a search and verify that the user is shown a carousel of photos relating to their search.

Enter in an invalid search term/ location, submit, and verify that a message appears advising the user that there are no results.

Click the left and right arrows to ensure that the photo changes as the user clicks.

Adjust size of browser window to various sizes, to ensure the unsplash carousel resizes well and is responsive.

Leave the input box blank and click submit, to verify that the input box border turns red to indicate to the user that the field is required.

### Leagues:

Enter locations in the 'From', 'To, 'Depart' and 'Return' fields, click 'search flights'.

Ensure results are shown in a new tab.

Leave the 'To' destination blank and search for flights. Verify that when no 'To' destination is entered, results are shown to 'everywhere'.

Leave the ''Depart' or 'Return' fields blank and search for flights. Verify that when no date is entered, results are shown based on the cheapest month.

Verify that when no 'To' destination is entered and no dates are chosen, results are shown to 'everywhere' based on the cheapest month.

### Dates:

Enter a city and country, click 'submit'. Verify the location name appears below the submit button, as well as 5 boxes displaying the forecast for the coming five days.

Select a date in the past to see additional information. Verify an information box containing the requested details appears.


### Footer:

Click the link in the footer and verify that user is brought to the github repo for this project.
API and Javascript testing:

Each feature which uses an API was tested manually, and while the code was being written, messages were logged to the console, to ensure the code was functioning as it should. Scripts were checked on https://jshint.com

The testing of my scripts was also automated as much as possible, with the use of Jasmine. I took a Behavior-Driven Development (BDD) approach towards writing my tests, focusing on the behaviours and possible actions of the users as they interact with the website. I then wrote a test for each of these behaviours, which failed. The tests were then edited until they passed.

### Page speed:

I also tested the site on Google Page Speed Insights. The size of my photos was impeding the loading time of the site. To combat this, I optimised the images and converted to webp format. If I had more time, I would have implemented lazy loading.

This project is fully responsive, and each section adjusts and resizes to fit every screen size. All features are available on all devices, with easy to use navigation, to help the user get around.

An interesting bug I came across, was that on my google map, there was an odd pattern of what appeared to be grey star-like shapes placed along the map. They appeared a regular width apart, and were always visible regardless of the zoom. I discussed it with my mentor and we agreed that it appeared as though there was a border radius set on the tiles in the map. However, the problem still persisted when the border radius was removed on the map div, and when another div was placed around the map div. The problem was found to be in the css I had written for the carousel, which was also unintentionally adding a border radius to the map through the code provided by the google maps api. The problem was then easily fixed by being more specific in which elements I was targeting by also specifying their parent elements.



### Issues/problems/improvements
No known bugs or bigger problems, however some minor things should be fixed: 

- The page could share more infromation about the games such as standings, players and social links to Footy Games Finder etc. 

- A place for banners to make Footy Game Finders Co. find an extra way to get income. 

- The design could improve such as colors, logo and more. 

- Add more leagues to the option.

-  Build a login function that allows user to share news and talk about upcoming games.

All this would be in the 2.0 version.

### Validation HTML
The files passed validation at https://validator.w3.org/nu/#textarea

## Deployment
The process used to deploy my code was:

On GitHub, I went to the repository for the project.

Then I clicked into 'Settings' for the repository.

I then scrolled down to the 'GitHub Pages' section of the settings.

I selected 'master branch' from the 'source' dropdown menu.

After that I clicked save.

Then I pushed to 'master', the live website would be updated.

My website can be found at the following URL:
>

## Credits

### Content
All of the content on the website is an example/fictive. 

### Mentor
Got a lot of help from a local Software developer in Sweden named Daniel Sweder with over 20 years of programming experience . 

### Media 
All of the photos used on this site were obtained (and bought) from Shutterstock [here](https://www.shutterstock.com/sv/home)

### Acknowledgements and References
- [Code Institute](https://www.codeinstitute.net/) - I used what I learned so far from Code Instiute (HTML/CSS/Boostrap/JavaScript/API). 
- [Sport Data API](https://www.https://app.sportdataapi.com/) - I used this website to learn more about API and to use their services.
- [w3Schools](https://www.w3schools.com/js/js_api_fetch.asp) - I used this to learn more about API.
- [YouTube](https://www.youtube.com/results?search_query=api) - I used this to learn more about API and to view parts of many different videos.
- [Bootstrap](https://mdbootstrap.com/docs/jquery/navigation/footer/) - I used this footer to able to shape the footer on all pages.
- [Mozilla Developer](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction) - I used this page to learn more about API.
