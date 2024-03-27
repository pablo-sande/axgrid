# Welcome to AxGrid
AxGrid is a platform where clients and vendors can trade several type of Energy sources.
Vendors will upload their trade offers using a dynamic Form for the corresponding Energy source.

Then, customers can see the list of all the available trades, filter and sort them in many ways, check the details and, if desired, purchase them.

For the sake of this exercise, I made some restrictions to the system, such as:
- There is no Login system, so we can't differentiate between Users or Vendors. The app user will be able to do everything.
- For the same reason, there is no list of created/purchased trades.
- Some trade status are automatically sent from the server in order to visualize them, since there is no other way to force them otherwise. In a real world scenario, those status updates would come from real status validation.
  
These are things I would implement in further iterations.

For more information, please check the [ADR](./ADR.md) file.

## Basic structure

This app consists of two main parts.
First, we have a server who is going to act both as a REST API and as a Websocket server.
On the other hand, we have a Vite React SPA which is going to communicate with the server for:
- Fetching data related to the Trades
- Receiving real-time updates on the Trades status

For more information, please check the [ADR](./ADR.md) file.

## Setup
I used pnpm as the package manager for this project. You can install it by running the following command:
```js
npm i pnpm -g
```
Install dependencies and run the server and the client.

```js
// From the root folder
cd server
npm i ts-node -g
pnpm i
pnpm start

// From the root folder
cd client
pnpm i
pnpm run dev
```

Running the Unit Tests
```js
pnpm run test
```

Generating the coverage report
```js
pnpm run test:cov
```

## Usage
Navigate to `http://localhost:5173` to see the running. The API is running on `http://localhost:4000` and the websocket server is running on `http://localhost:3000`.

First, you will land on the Vendors page which is hosted in the root route.

In order to verify the real-time updates, you can open a new tab and navigate to `http://localhost:5173/customer` to see the Customer page.

Then you can start creating trades using the Form from the Vendors page and see them being updated in real-time in the Customer page.

You will see that the status of the trades will change automatically after a few seconds, simulating a real-world scenario. The updated rows will be highlighted with a small animation.

You can also filter and sort the trades using the filters and the sorting options available in the Customer page.

Finally, you can click on any row to see the details of the trade. The overview system is very simple, I definitely would implement something more user-friendly in a real-world scenario.

In the preview dialog, you can also purchase the trade, which will update the status of the trade and the row will be highlighted with a different color. I also added an option to cancel the trade, which I think it doesn't make sense in a real-world scenario, but it's there for the sake of the exercise. Clicking it will change the status of the trade to "Cancelled" and after a few seconds, it will be removed from the list.



