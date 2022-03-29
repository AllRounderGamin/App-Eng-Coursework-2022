# App-Eng Coursework

For Jacek:

### To recreate issue:

    - Run Server.js manually
    - Go to localhost:8080
    - Select top left image, and any image on the next page
    - Change the "name" parameter in the url to something random
    - Hit enter to search
    - Page correctly navigates to the error page HOWEVER
    in the console it shows an error where it tried to connect an event
    to a no longer existing button
    - When using console.log it was shown it was loading the product page
    and then the error page immediately after
