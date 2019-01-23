var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
    var parsedUrl = url.parse(request.url);

    if (parsedUrl.pathname === '/listings'){

        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(listingData);

    } else {

        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("Bad gateway error");
        response.end();

    }

    //create a request handler with the URL module to send the listing data on a GET request to localhost:8080/listings
    /*
      Your request handler should send listingData in the JSON format if a GET request
      is sent to the '/listings' path. Otherwise, it should send a 404 error.

      HINT: explore the request object and its properties
      http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
     */

};

fs.readFile('listings.json', 'utf8', function(err, data) {

    listingData = JSON.stringify(JSON.parse(data), null, 2);

    server = http.createServer(requestHandler);
    server.listen(port, function(){

        console.log('server listening on: http://localhost:8080');

    });

    /*
      This callback function should save the data in the listingData variable,
      then start the server.
     */

});
