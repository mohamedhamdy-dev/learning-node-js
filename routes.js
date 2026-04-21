import fs from "fs";

export function requestHandler(req, res) {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head></head>");
    res.write(
      "<body> <form action='/message' method='POST'> <input type='text' name='message' /> <button type='submit' >Submit</button> </form></body>",
    );
    res.write("</html>");
    return res.end(); // now end the response and send it to the client
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head></head>");
  res.write("<body><p>hello world</p></body>");
  res.write("</html>");
  res.end();
}
