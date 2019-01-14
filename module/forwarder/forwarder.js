const request = require('request')
const config = require('../../config/config')

exports.forward = (req,res,next)=>{
    let url_split = req.url.split('/')
    if(typeof url_split[2] != 'undefined'){
        for (let i = 0; i < config.services.length; i++) {
            if( config.services[i].name == url_split[2]){
                req.pipe(request('http://'+config.services[i].host+':'+config.services[i].port+req.url)).pipe(res)
            }else{
                res.status(404).send({status:'404',message:'service not found'})
            }
        }
    }
}