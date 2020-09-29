# GreenPlus Web Application (Front-end)
This repository is created for the development of the front-end of a web-based application called GreenPlus.

## Getting Started

### Prerequisites
* Install a web browser and a text editor (Recommend: Google Chrome and VS Code).
* Install Node.js (Recommend: 14.4.0).

### Installing
1. Clone the respository:
    ```
   git clone https://github.com/Hasitha-Lakshan/GreenPlus-Front-end.git
    ```
2. Install node package manager:
   ```
   npm install
   ```
3. Run the server:
   ```
   ng serve
    ```
4. Install other packages:

   * Installing Bootstrap:
   ```
   npm i --save bootstrap
   ```
   * Add Bootstrap into the styles of angular.json file:
   ```
   "./node_modules/bootstrap/dist/css/bootstrap.min.css"
   ```
   * Installing popper.js:
   ```
   npm install popper.js --save
   ```
   * Installing jQuery:
   ```
   npm install jquery --save
   ```
   * Add jQuery and JS into the scripts of angular.json file:
   ```
   "./node_modules/jquery/dist/jquery.min.js",
   "./node_modules/popper.js/dist/umd/popper.min.js",
   "./node_modules/bootstrap/dist/js/bootstrap.min.js"
   ```
   * Installing ngx-webstorage:
   ```
   npm install --save ngx-webstorage
   ```
   * Installing JwtHelperService:
   ```
   npm install --save @auth0/angular-jwt
   ```
   * Fix the bad dependencies:
   ```
   npm audit fix --force
   ```
   Note: Access to the "App" folder using cmd before installing the packages.

## Built With
* Angular
* HTML
* CSS
* JavaScript
* Bootstrap

## Authors
See the detailed list of [contributors](https://github.com/Hasitha-Lakshan/GreenPlus-Front-end/graphs/contributors) who contributed to this project.
