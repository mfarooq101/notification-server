# notification-server

This is Node.js application. Just clone this on your computer from github
and run:

cd notification-server
npm install
node index.js

This will start the Node.js server which will bind to port 3000. You can
change PORT environment variable to your desire TCP port.

This server only supports two routes: /api/supervisors and /api/submit
In Get request, it gets the supervisors data from:
https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers

Note: It is assumed that you have already installed Node.js on your computer.
