# App-Eng Coursework

## Documentation

### Code

### Server-Side

* /productinfo/\<name>
     * This will return the information related to the product specified in "name"
* /products/singles/\<num>
    * Returns 4 single bricks for the user to select from, the "num" parameter specifies the page number to load, which offsets the query by ```num * 4```
* /products/kits/\<num>
    * Same as above except this queries the kit database
* /search/\<query>/\<num>
    * Displays all stock with the query term inside it, the num attribute determines what page is shown in case there are more than 4 options

