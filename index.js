const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const morgan = require('morgan')
const moment = require('moment-timezone')
const config = require('./config/config')
const routes = require('./route/routes.js')

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DEconstE')
    res.header('Access-Control-Expose-Headers', 'Content-Length')
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range')
    if (req.method === 'OPTIONS') {
        return res.send(200)
    } else {
        return next()
    }
})

morgan.token('date', (req, res, tz) => {
    return moment().tz(tz).format('DD MMMM YYYY hh:mm:ss');
})
morgan.format('myformat', ':remote-addr [:date[Asia/Jakarta]] ":method :url :http-version" :status :res[content-length] - :response-time ms ":user-agent"');

app.use(bodyParser.json())
app.use(morgan('myformat'))
routes(app)
app.listen(config.port, ()=>{
    console.log('app listening at port %s', config.port)
})