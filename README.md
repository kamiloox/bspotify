# bspotify

Creating playlists based on user preferences and choices.

App description:

- Data is retrieved from **Spotify API**. Frontend doesn't make requests directly to API, but first _delegates them to backend_ that is written by me too - [Link to repo](https://github.com/kamiloox/spotify-auth). Backend saves cookies with _httpOnly flag_ and frontend don't need to bother with auth. Backend refreshes auth token too automatically if it can be done. Refresh auth token has expiration date of 1 month. If user doesn't do any action in this period then will be logged out.
- User can select up to 5 to favorite artists and tracks in total. _Based on the choices app is suggesting new tracks that user can listen to and appropriately accept them or reject (app makes request to spotify /recommendations route)._ Everything is shown in very easy UI. If user has done selecting songs then can save them to new or existing playlist respectively.
- App is written in Typescript with of `create-react-app`. All requests to backend are made with `react-query` and `window.fetch` browser builtin API. UI is invented by me with some inspirations that I saw on [dribbble.com](https://dribbble.com). It's written with mobile-first methodology. I didn't use any of UI library. I did all components in styled-components. I did even some animations with react-spring. It's noticable in the video below that shows same user possible happy path.

https://user-images.githubusercontent.com/45523480/147373401-48129692-fd39-478c-a8a4-29912ff3cdb3.mov

What i learned while i was building this app?:

- How to use typescript - I have better understanding of typescript. This is first project where I have used this tool.
- How to make simple SVG animation - I learned how to create small moves on svg elements. Now i know how to make them in sync with react-spring.
- How to structure project - This is my first bigger project. I noticed how to structure files and components to don't get lost.

This app is not fully done. For now the core is working. In future time i will develop this project to have more features!


