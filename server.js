const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({extended: true, limit: '100MB'}));
app.use(express.json({limit: '100MB'}));

app.get('/', (req, res)=>{
    res.sendFile(__dirname +"/Public/index.html");
})

app.post('/post', async (req, res)=>{
    var dataurl = decodeURIComponent(req.body.data);
    var buffer = Buffer.from(dataurl.split(',')[1], "base64");
    await fs.writeFileSync('./Uploads/'+req.body.fileName, buffer);
})

app.listen(3000, ()=>{
    console.log('We are listening to port 3000');
})