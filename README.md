# bspotify

Creating music playlists based on user preferences and choices.

App description:

- Data is retrieved from **Spotify API**. Frontend doesn't make requests directly to API, but first _delegates them to backend_ that is written by me too - [Link to repo](https://github.com/kamiloox/spotify-auth). Backend saves cookies with _httpOnly flag_ and frontend don't need to bother with auth. Backend refreshes auth token automatically if it can be done. Refresh auth token has an expiration date of 1 month. If the user doesn't do any action in this period then will be logged out.
- User can select up to 5 favorite artists and tracks in total. _Based on the choices app is suggesting new tracks that user can listen to and appropriately accept or reject (app makes a request to Spotify /recommendations route)._ Everything is shown in a very easy UI. If the user has done selecting songs then can save them to a new or existing playlist respectively.
- App is written in Typescript with of `create-react-app`. All requests to the backend are made with `react-query` and `window.fetch` browser built-in API. UI is invented by me with some inspirations that I saw on [dribbble.com](https://dribbble.com). It's written with mobile-first methodology. I didn't use any of the UI libraries. I did all components in styled-components. I did even some animations with react-spring. It's noticeable in the video below that shows the user's possible happy path.

https://user-images.githubusercontent.com/45523480/147373401-48129692-fd39-478c-a8a4-29912ff3cdb3.mov

What I have learned while I was building this app?:

- How to use typescript - I have a better understanding of typescript. This is the first project where I have used this tool.
- How to make simple SVG animation - I learned how to create small moves on SVG elements. Now I know how to make them in sync with react-spring.
- How to structure project - This is my first bigger project. I noticed how to structure files and components to don't get lost.

This app is not fully done. For now, the core is working. In the future time, I will develop this project to have more features!
