# App-Eng Coursework

## Documentation / Code

### Server Routes

* /productinfo/\<name>
     * This will return the information related to the product specified in "name", used when loading the page of an induvidual product.
* /products/singles/\<num>
    * Returns 4 single bricks for the user to select from, the "num" parameter specifies the page number to load, which offsets the query by ```num * 4```, used when the user navigates to the single bricks section.
* /products/kits/\<num>
    * Same as above except this queries the kit database, used when the user navigates to the kits section.
* /search/\<query>/\<num>
    * Displays all stock with the query term inside it, the num attribute determines what page is shown in case there are more than 4 options, used whenever the user uses the store search bar.
* /stock/\<item>/\<amount>
    * Url used to remove the amount specified from the item specified, used after a user checks out.
* /restock
    * Url that restores all products stock to their initial values, called manually to restock the store.
* /auth_config.json
    * Url to fetch information relating to auth0 configuration, called by the auth.js script.

### Scripts Overview

* server.js
    * Creates a basic express server and handles get requests to above urls.
* database.js
    * Contains all SQL queries used by the server on the database.
* auth.js
    * Scripts related to logging a user in or out.
* checkout.js
    * Scripts to allow the user to checkout, including verifying card input and removing stock upon purchase.
* list_scripts.js
    * Scripts concerning the loading and manipulation of lists, typically in LocalStorage. This is mostly used by the "your lists" page.
* pageLoading.js
    * Scripts to load page templates and page specific event listeners when a user navigates to a new page, as well as updating the history to allow the user to navigate using the back arrows if necessary.
* product_scripts.js
    * Scripts used to fetch product information from the server and display it to the user.

## Justifications / What I Would Continute Working On

### Database Choice

The project runs on an sqlite database for storing brick information, as the website was initially made to use LocalStorage for the user's information it made more sense to use a more lightweight software to handle the database.
Although not as powerful as other alternatives such as PostgreSQL, SQLite would be able to handle more than the expected connections a small independant lego store could expect.

### Single Page Application

Initially the website was going to use multiple html pages and the user would navigate between them all, however this would result in many more connections to the server than necessary and an overall slower experience,
as such the loading and deloading templates was used to make the user talk to the server only when absolutely necessary, such as during checkout or when loading information about products.
This also made loading product information easier and more streamlined as to ensure a unique url for each item very similar code was incorporated and was easier for me to manage.

### Black-Box Checkout

The checkout system was going to be a black box system for the website demo, as such there is no code to confirm that the user has filled in all necessary boxes as this was deemed unecessary for the specific situation.
If the website was developed further there would be measures in place client and server side to ensure that the user inputs valid data before storing their information to send out their order when prepared, as well as a pop up or template to inform the user they have indeed completed an order.
Furthermore functionality for saving checkout information for faster checkouts would've been useful as well, with a basic measure already implemented in the "Same as Delivery Address" button

### Kit Stock

In the spec it is referenced that kits should affect the overall stock of bricks in the shop, in the kits migration there is an column for how many bricks are used by each kit, however in practice kits are usually sold pre packaged, and in the real world bundles are often set aside ahead of time (with the single item going out of stock but the bundle still being avaliable).
As such it was deemed easier and more realistic that instead of a complex system to remove the induvidual bricks each kit would have its own lower stock that would be managed independantly. However, the brick counts are still included for future development where this information may be necessary.

### Auth0

The website does have capability to log in and out using the users at the end of this document, however as the project currently stands this changes nothing on the actual website.
With more tme the administrator account would have access to a store overview page which would be where restocks could be properly called (instead of just typing the url, this would also allow for some authorisation so random users cannot affect stock level), as well as an overview of the current state of the site.
With a regular user account the database could be changed to include the data currently stored in LocalStorage into their own tables with a user_id that would allow only the logged in user to see their history / cart instead of anyone on that browser.

### Tags

A feature that was implemented into the html early before the database was initialised and was not properly accounted for when creating the database, as such this sadly does not do anything, other than give the user the option to tick some boxes for fun.

## Novelty / Invention

### Luhn's Algorithm

Although the checkout is a blackbox I decided to implement Luhn's Algorithm to allow the program to verify card numbers entered were in fact possible card numbers instead of a random set of numbers, for testing purposes any actual debit card will obviously work as well as any number from the following link: http://support.worldpay.com/support/kb/bg/testandgolive/tgl5103.html will work.

### Your Lists

Something not specified in the specification was the ability to view past purchases as well as have a wishlist to add desired products to a cart at a later date. This feature was added using local storage to store arrays containing the cart and other related information at time of purchase.
The website is only a demo as such it was not considered to include a cap for the total amount of orders that can be saved to ensure LocalStorage does not easily run out, however this change would be implemented if a user would be expected to reach that naturally, such as if the website was deployed online.
This also worked as an answer to allowing the user to store the information of bricks that were currently out of stock, the wishlist system could be easily upgraded to incorporate an email system for when out of stock bricks came back in stock for users who had them in their wishlist. However that was out of the scope of this project.

## References / Citations

### GeeksForGeeks
    Although coded myself, their code was used heavily as a guideline for how to implement the algorithm and as such has been referenced here for fairness.
    Luhn algorithm - GeeksforGeeks. (2017, September 28). GeeksforGeeks. https://www.geeksforgeeks.org/luhn-algorithm/

### KindPNG
    Although some have been modified, all images that can be seen on the website were downloaded from the KindPNG website
    Millions Of High Quality PNG Images For Free Download - kindpng. (n.d.). Www.kindpng.com. https://www.kindpng.com/
