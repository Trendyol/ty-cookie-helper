# cookie-helper
simple cookie helper that provides functions to CRUD cookies

`npm i @trendyol-js/cookie-helper`

## create cookie
`createCookie` function will create cookie as specified.
```javascript
const key = 'userId';
const value = '1234';
createCookie(key, value);
```
to specify a expiration date,  you can pass number of days as last parameter.
```javascript
const key = 'userId';
const value = '1234';
const days = 3; // number of days that the cookie will be valid
createCookie(key, value, days);
```

## get cookies as object
`getCookiesObject` function will return object which contains cookies;
```javascript
const cookies = getCookiesObject();
```

## get cookie
`readCookie` function will return the value of a given cookie name
```javascript
const value = readCookie('useId');
```

## delete cookie
`deleteCookie` function will invalidate the cookie with given name as parameter
```javascript
deleteCookie('useId');
```
# How To Build

`npm install`

`npm run build`

# How To Test

`npm run test`
