
# Architecture Decision Record

## Context
The instructions specify that *React* and *ContextAPI* need to be used. On top of that, I need to chose the right tools in order to develop the most complete and efficient solution given the time constraints.

## Technologies Decision
- **Bundler**: I decided to use *Vite* as the bundler for the *React* app, since it is the most modern and efficient bundler for *React* apps. 
  
- **Styling**: For styling, I decided to use *TailwindCSS*, since it is a very powerful and easy to use CSS framework. 
  
- **API**: For the API, I decided to use *Express*, since it is a very simple and efficient server framework for *NodeJS*. I did not do proper error handling or validation because of time constraints.
  
- **Framework**: I did not use any framework like *NextJS* or *Astro*, since it would be overkill for this project. If I had to continue working on this project, I would probably use *NextJS* for the server-side rendering and the API routes.
  
- **Database**: I did not use a database, since the instructions did not specify the need for one and it would take long to set it up. Instead, I used a simple in-memory array to store the trades.
Given more time, I would have used a database to store the trades and I would have used a proper ORM like *Prisma*.

- **Websockets**: I decided to use *Socket.io* for the real-time updates, since it is super easy to set up and use. I did not do proper error handling or validation because of time constraints.
  
- **Testing**: I used Vitest since it has very good synergy with Vite and because it is really fast. Additionally, I used react-testing-library to simulate the components rendering as it's the de-facto standard for testing React components. 
I took many different approaches for testing just to showcase that I know many different ways to test a React app. I did not create end-to-end because this is a very simple app running in localhost, but my Tests perform some of the actions that an end-to-end test would do like simulating user interactions and checking the final state of the app.

- **State Management**: I used the *ContextAPI* for state management, since it is the most popular tool for that. I did not use *Redux* since it would be overkill for this project. If I had to continue working on this project, I would probably use *Redux Toolkit* for state management.
  
- **Forms**: I used *React Hook Form* for form handling, since it is the most popular tool for that. I did not implement Form validation since it was specified that it was not necessary, but I set up the form to be easily validated with little effort.
  
- **UI**: I used *Material UI* specially because of the DataGrid component, which was very useful to render the trades table with built-in sorting and filtering.
  
- **Typing**: I used *TypeScript* for typing, since it is the most popular tool for that. With more time, I would have used it more extensively, such as doing more type narrowing and type guards.


## Implementation Decisions
- **Hooks**: I didn't use many useEffect hooks, since I didn't have many side effects to handle. I used the *useEffect* hook to fetch the trades and to set up the websocket connection.
As a rule of thumb, I try to avoid using *useEffect* for state management, since it can lead to unintentional re-renders and side effects.

- **Context**: I used the *ContextAPI* to manage the state of the app as required. I could have used something like useQuery from *React Query* but I decided to stick with the ContextAPI as required. I created two contexts, one specifically to wrap up the trades state and a GlobalContext wrapping the hole app, which handles the websocket connection and the error handling. This context would handle other global states if the app were to grow.
  
- **Components**: I created a lot of components to make the app more modular and easier to maintain. I could have created more components, but I decided to keep it simple since the app is small.
  
- **Error Handling**: I opted for a simple but reusable and customizable component to handle errors related with the Form and the API. I could have created a more complex error handling system, but this at least gives the user some feedback when something goes wrong.
  
- **Performance**: I didn't take many performance considerations given the time constraints. I could have used useMemo and useContext to avoid some unnecesary re-renders, but I decided to keep it simple. Also from React 19 onwards, they are going to make those optimizations automatically, so I didn't feel the need to showcase that.

- **Custom Hooks**: I only created a custom hook to handle the API POST, PUT and DELETE fetching, which was probably the most delicate part of the app. Since the app is pretty simple and it's not using many hooks, I didn't feel the need to create more custom hooks, although I could have added a few more, for example, to handle the websocket connection and some error handling.


## Consequences
- **Pros**: The chosen technologies are very popular and well supported, so it is easy to find help and documentation. The app is very simple and easy to maintain, since it is modular and well organized. I decided to create a simple server instead of mocking everything because it would be easier to scale the app in the future. The trades can be updated in real-time thanks to the websocket connection and the proper usage of the ContextAPI. The app is almost fully typed and the tests cover most of the components and hooks.

- **Cons**: The app is very simple and lacks many features that would be necessary in a real-world scenario. The error handling is very basic and I didn't fully optimize performance.  
The server is very simple, whith almost non-existent error handling and it's not tested. There is no authentication system and the fetches don't have authorization token. I didn't use a proper caching system or make use of LocalStorage or SessionStorage. The form fields are not very useful since I don't have the domain knowledge, so I went for random options just to showcase different types of fields.
