require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const crypto = require('crypto')
const childproc = require('child_process')

app.get('/webhook', (req, res) => {
    var hash = "sha1=" + crypto.createHmac('sha1', secret).update(jsonString).digest('hex')
    if(hash != req.headers['x-hub-signature']){
        console.log('invalid key');
        res.end({error: 'invalid key'})
        return;
    }

    childproc.spawn('sh', ['script.sh'])
    res.end({success: 'success'})
})

app.listen(port, () => console.log(`app listening at http://localhost:${port}`))
