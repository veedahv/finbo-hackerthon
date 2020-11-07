var {logic} = require('./utilities/logic')



const func = new logic()


var res = func.credit()
res.then((result)=>{
  console.log(result)
})

