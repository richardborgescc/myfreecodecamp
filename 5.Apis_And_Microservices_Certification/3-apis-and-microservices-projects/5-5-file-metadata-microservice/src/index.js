/*
  test: https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/file-metadata-microservice
*/

var http = require("http");
const formidable = require("formidable");

/** CORS */
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
  "Access-Control-Max-Age": 2592000 // 30 days
  /** add other headers as per requirement */
};

const buildResponse = (response, body) => {
  console.log("buildResponse", JSON.stringify(body));
  response.writeHead(200, {
    ...headers,
    ...{ "Content-Type": "application/json" }
  });
  response.end(JSON.stringify(body));
};

const buildHTMLResponse = (response, body) => {
  console.log("buildHTMLResponse", body);
  response.writeHead(200, {
    ...headers,
    ...{ "Content-Type": "text/html" }
  });
  response.end(body);
};

const routes = {
  "/:get": (request, response) => {
    /*
      You can submit a form that includes a file upload.

      The form file input field has the name attribute set to upfile.
    */
    buildHTMLResponse(
      response,
      '<form method="POST"><input type="file" name="upfile"/><input type="submit" value="upload"></form>'
    );
  },
  "/:post": (request, response) => {
    /*
      When you submit a file, you receive the file name, type,
      and size in bytes within the JSON response.
    */
    new formidable.IncomingForm().parse(request, (err, fields, files) => {
      if (err) {
        console.error("Error", err);
        buildResponse(response, "Error");
        throw err;
      }
      console.log("Fields", fields);
      console.log("Files", Object.entries(files)[0][1]);

      buildResponse(response, {
        size: Object.entries(files)[0][1].size,
        name: Object.entries(files)[0][1].name,
        type: Object.entries(files)[0][1].type
      });
    });
  },
  default: (request, response) => {
    buildResponse(response, "hello!");
  }
};

const handler = (request, response) => {
  console.log("============================");
  const { url, method } = request;
  const [, , , route] = url.split("/");
  const routeWithoutParam = route ? route.split("?")[0] : "";
  const key = `/${routeWithoutParam}:${method.toLowerCase()}`;
  console.log("key", key);

  const chosen = routes[key] || routes.default;

  if (["GET", "POST"].indexOf(request.method) > -1) {
    return chosen(request, response);
  }

  response.writeHead(405, headers);
  response.end(`${request.method} is not allowed for the request.`);
  /** */
};

//create a server object:
http.createServer(handler).listen(8080); //the server object listens on port 8080
