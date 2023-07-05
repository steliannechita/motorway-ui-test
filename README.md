# Technical choices and mentions

- I've developed the app using Chrome as a browser
- I've used ProgressiveImage from "react-progressive-graceful-image" library (which loads lazy by default), to implement progressive image loading for vehicle/ profile images (i've used .jpg files as default, and .webp as part of scrSet due to better compression efficiency and smaller file sizes achieved by the WebP format). Sass for styling and react-router for navigation
- Made the gallery fully tabable (accessible) (can be navigated using keyboard tab, enter and escape keys); when modal is open, it sets initial focus on the close button and when the latter is actioned, it resets focus back to the element that initially triggered the modal.
- For improving the performance of the slow API, I've implemented caching in server.js, by caching the response using "node-cache" library. The improvement in performance can be tested with a tool like Postman (firing subsequent request to the API -> the first request will take anything between 500ms to 1500 ms, the subsequent ones will be a lot faster as it will hit the cache )
- For the form I have used react-hook-form which is a lightweight API, using hooks, so it integrates well with functional React.It's main advantage is that it utilizes uncontrolled components, which reduces the number of re-renders and improves performance(each input field is responsible for its own state).
- For form validation I have used Zod, as it's lightweight, comprehensive and extensible for custom validation (see validation for the date of birth input).

# TODOS and some potential further improvements

- the app is still very slow due to the API surfacing only urls for very large images; endpoint should return different size renditions of the images (thumbnail, small, medium , regular, etc.) + their dimensions, so we can properly take advantage of the "srcSet" and "media" properties (use small rendtitions for tiles and raw/large rendition for the image displayed within the modal --> for the latter, we could fire a preload of the large image when the user hovers over a specific tile wihtin the gallery -> optimistic load)
- improve placeholder for loading images ( could be a small blurred rendition of each image)
- improve form accesibility by providing accessible hints and instructions to users (ex: "Please enter the date in the format dd-mm-yyy)
- set a focus trap inside the modal
- improve loading and error display message within ImageGallery
- unit tests
- create css variables for spacing, breakpoints, mixins for media queries, etc
- convert project to TypeScript
- lazy load routes

=======================================================================================

# Motorway UI Test

Welcome to the Motorway UI technical test. This test focuses on user experience, and your skills with HTML, CSS, a11y and leveraging browser APIs.

## Set up

This repo is a slightly modified Create React App and an Express server which serves a JSON feed of images.

- Clone the repo and run `npm install`

- `npm run serve` will run the server

- in another terminal window `npm run start` will start CRA

After this, CRA will open a tab with the app running, usually `localhost:3000`. If you look in `src/App.js` you'll see the API call to the server is already made and will console log out the results.

#### Note

- The server and CRA are watching the relevant files and will hot reload if any changes are made.

- Feel free to modify or install whatever code you feel is necessary. If installing packages which are wrappers for native browsers APIs please leave a comment explaining why.

## Tasks

### 1. UI development

Create a responsive UI to display the images returned by the API.

The aim is to demonstrate your experience and knowledge of HTML, CSS, JS and React features; and demonstrate creative thinking in how images can be presented and manipulated.

Images aren't optimised and their dimensions are varied, there are .jpg and .webp versions on s3, so you will need to take this into account.

#### Inspiration:

https://twitter.com/andybarefoot/status/1251844621262602242

http://www.artist-developer.com/

#### Some ideas to get you started:

Resizable thumbnails

Modal to review full size images

Image effects or filters

### 2. Performance

The API that is returning images is rather slow. Show how it can be sped up, and show how you would measure the improvement in performance.

### 3. Forms

One of the oldest yet trickiest parts of web development is forms, so we’d like to see how you handle them.

Add a form to your app with the following fields. The form doesn't need to submit to anywhere, but must validate on the client.

- [ ] Name
- [ ] Email
- [ ] Date of birth
- [ ] Favourite colour
- [ ] Salary (using a range input)

## Time allowed

We appreciate that your time is valuable and recommend you not spend more than 2 hours on these tasks.

## Notes

The goal of the test is to prove your understanding of the concepts of modern HTML/CSS/JS, but not to produce something production ready or pixel perfect.
Your work will be tested in the browser of your choice, so please specify this when submitting. This can include pre-release browsers such as Chrome Canary or Safari Technology Preview if you want to work with experimental features.
