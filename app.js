const http = require('http')
const fs = require('fs')


//createServer returns a server
const server = http.createServer((req,res)=>{
    //first param is data abt req and sec res
    const url = req.url;
    const method = req.method;
    if (url === '/'){
        res.write('<html>');
        res.write('<head><title>Form</title></head>');
        res.write('<body>');
        res.write('<form action="/message" method="POST"><input type="text" name="message" placeholder="enter text"><button type="submit">submit</button></form>');
        res.write('</body>');    
        res.write('</html>');
        return res.end()
    }

    if (url === '/message' && method === 'POST'){
        const body = []
        //.on() method is used to register the event listnr and pass it the func to be 
        // executed for evey data event, it will the func until it gets all data out of the reqst
        req.on('data', (chunk)=>{
            // on data,the listnr recieves a chunk of data
            console.log(chunk);
            body.push(chunk);
        })

        return req.on('end', ()=>{
            //this will run ones it is done parsing the incoming reqst
            // to work with the chunk we have to buffer them
            const parsedBody = Buffer.concat(body).toString();
            // console.log(parsedBody);
            const message = parsedBody.split('=')[1]
            fs.writeFile('message.txt', message, err=>{
                //it will run when it is done working on the file
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            })
        })

    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Node server response</title></head>');
    res.write('<body>');
    res.write('<p>responded from my node server</p>');
    res.write('</body>');    
    res.write('</html>');
    res.end();

})
// createServer takes a function "request listnr6" as an arg that will be run on every incoming request

server.listen(3000)