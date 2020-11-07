var _ = require('underscore')
// const {intent} = require('../intent.json')



function render(text='',props={}){

    var text = text;
    var props = props


    var re = /<% ([a-zA-Z0-9]+) %>/ig;


    var grp = text.match(re)

    if (grp) {
        var res = grp.map((e)=>{
            return e.replace(/[<%>]/ig,'').trim()
                    
        
            })
            for(var x in res) {
            text = text.replace(`<% ${res[x]} %>`, props[res[x]]?props[res[x]]:'unknown')
        
            }
    }

    




return text

}


// function to check is sentence have similar word
function getTextProbability(text='',preSentence=''){
    try{
        
        let textList = text.split(' ').filter((value)=>Boolean(value))
        
        let pattern = new RegExp('\\b(' + textList.join('|') + ")\\b", 'gi');
        let result = preSentence.match(pattern)
        
            return (result?result.length:0)/preSentence.split(' ').length
    }catch{
        
            return 0.0
    }
}

// return a list of id and their probability
function getIntentProbabiliesFromText(intent=[],text=''){
    if(text){

        // {id,questions,leastPercentage}
       var result =  intent.map((data)=>{
            var questionProbabilities =   data.questions.map(value=>{
                props = getTextProbability(text,value)
                return props>=data.leastPercentage?props:0
            })
            return {probability:Math.max(...questionProbabilities),...data}
        })

        const maxProbabilityIntent = _.max(result, function (value) {
          return value.probability
        })
        
        if(maxProbabilityIntent.probability){
            return maxProbabilityIntent
        }else{
            return false
        }

    }else{
        return false
    }

  }


  function getSuggestionFromIntent(intent=[],text='',number=10){
    
       var result =  intent.map((ele)=>{
            var questionProbabilities =   ele.questions.map(value=>{
                props = getTextProbability(text,value)
                return props
            })
            return {probability:Math.max(...questionProbabilities),...ele}
                          })

            
        
        const suggestedIntent = result.sort((a,b)=>b.probability-a.probability).filter((e)=>e.probability > 0).slice(0,number)
        if (suggestedIntent.length) {
            return suggestedIntent
            
        } else {
            return false
        }


  }



module.exports =  {
getTextProbability,
getIntentProbabiliesFromText,
getSuggestionFromIntent,
render
}


