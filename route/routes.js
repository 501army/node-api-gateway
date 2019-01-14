const middleware = require('../module/middleware/middleware')
const forwarder = require('../module/forwarder/forwarder')

module.exports = (app)=>{
    app.get('/',(req,res,next)=>{
        return res.status(200).send({status:'200',message:'success'})
    })
    app.get('/v1/*',[
        middleware.tokenValidation,
        forwarder.forward
    ])
}