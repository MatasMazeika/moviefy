## Moviefy!

Movie rating list made by Matas Mažeika \
React x Mobx \
Demo can be found here: https://moviefy-mazeika.herokuapp.com/ \
Data is loaded from my hosted api, repo: https://github.com/MatasMazeika/moviefy-api

# Local setup

* Clone repo
* `cd` into the cloned foled and `npm install`. (you can use `yarn install` aswell)
* Then simply run `npm start` and the application will start. (If you use yarn use `yarn start`)

# Features: 

* Paginated movie list
* Infinite list
* Clicking on a movie displays the information in a modal
* Clicking on table header sorts the list 

# Main technologies: 

* React 16.13.1 ( /w hooks )
* Mobx 5.15.4 - For state management
* Axios - HTTP client for communication with the API
* Sass - For application styling and modular use of styles
* react-app-rewired - Enables to edit babel or webpack configs without ejecting create-react-app ( used to enable decorator use)
* classnames - utility for conditionally joining classNames together

# P.S. Movies in the list are doubled for the sole purpose to have 5k+ records
