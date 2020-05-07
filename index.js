require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const crypto = require('crypto')
const childproc = require('child_process')

app.use(express.json())

app.post('/webhook', (req, res) => {
    var hash = "sha1=" + crypto.createHmac('sha1', process.env.SECRET_KEY).update(JSON.stringify(req.body)).digest('hex')
    if(hash != req.headers['x-hub-signature']){
        console.log('invalid key');
        res.end({error: 'invalid key'})
        return;
    }

    childproc.spawn('sh', ['script.sh'])
    res.end({success: 'success'})
})

app.listen(port, () => console.log(`app listening at http://localhost:${port}`))
