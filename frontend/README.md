# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Using the app on a phone

For local phone testing, connect the phone and computer to the same Wi-Fi network,
start the backend and frontend on the computer, and open `http://<computer-ip>:3000`
on the phone. Find the computer's IPv4 address by running `ipconfig` in Windows
and using the address listed under its active Wi-Fi adapter. The frontend uses
the hostname in that URL to reach the backend on port `5000`; allow Node.js
through Windows Firewall on a private network if prompted.

If the API is hosted at a different address, set `REACT_APP_API_BASE` in
`frontend/.env` (for example, `REACT_APP_API_BASE=https://api.example.com`) and
restart the frontend. Do not use `localhost` for a backend hosted on another
device, since it refers to the device opening the page.

For a Render backend, set `MONGO_URI` in the Render service's environment
variables to your MongoDB Atlas connection string. The backend reads this value
when connecting to the database; keep the URI private and never commit it.
Set `REACT_APP_API_BASE` to the Render service URL in the frontend host's
environment variables, then redeploy the frontend.

## Trip planner

Open **Trip planner** to chat with the local trip assistant or enter a budget,
trip length, group size, starting point, and travel preference. The chat matches
your message to destinations returned by the backend and can update the suggested
itinerary, budget breakdown, stay, and Google Maps directions as you refine your
request. It uses local destination data and simple matching—not a generative AI
service. Cost and transport details are estimates, not live prices or bookings.
Seed the backend database with `node seed.js` from the `backend` folder to load
the sample Southern Leyte destinations.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
