const {intent} = require('./intent.json')
const actions = require('./utilities/actions')
const _ = require('underscore')
const {logic} = require('./utilities/logic')
const {
    getTextProbability,
    getIntentProbabiliesFromText,
    getSuggestionFromIntent,
    render
} = require('./utilities/index')

const func = new logic()

class Api{
    constructor(){
        // console.log(actions)
    }


    // test(data,socket){
    //     console.log("this is a test")
    // }
    chat(data,socket){
        // console.log(data)
        
        const {query,args,kwargs,link,propsName,tag,user} = data


        if(propsName){
            socket.emit('action',{type:actions.ADD_KWARGS,payload:{[propsName]:query}})
        }


        var response
        if(link){
            response = intent.find(e=>e.id==link)
            socket.emit('action',{type:actions.REMOVE_PROPS_NAME})
            socket.emit('action',{type:actions.REMOVE_LINK})
            
        }else{
            response = getIntentProbabiliesFromText(intent,query)
            
            
        }
        
        
        // const response = getIntentProbabiliesFromText(intent,query)
        // console.log("query",query)
        // socket.emit('action',{type:actions.ADD_KWARGS,payload:{tag:'test',props:{name:'thats a test'}}})
        // console.log("response",response)
        
        if(response){
            if(response.props){
                socket.emit('action',{type:actions.ADD_PROPS_NAME,payload:{propsName:response.props,tag:response.tag}})
            }
            if(response.link){
                socket.emit('action',{type:actions.ADD_LINK,payload:response.link})
            }
            

            const {
                id,
                tag,
                questions,
                answer,
                link,
                mimeType,
                props,
                leastPercentage,
                functionName
            } = response
            
            // socket.emit('action',{type:actions.ADD_KWARGS,payload:propsName?{...kwargs,[propsName]:query}:kwargs})
            // socket.emit('action',{type:actions.ADD_KWARGS,payload:{tag:'test',props:'thats a test'}})
            try {

                // functionName?func[functionName]({...kwargs,...user}):''
                if (functionName) {
                    func[functionName]({...kwargs,...user})
                    .then((result)=>{
                        socket.emit('action',{type:actions.ADD_CHAT,payload:{
                            user:false,
                            pubDate:new Date(),
                            mimeType:mimeType,
                            body:render(answer[_.random(answer.length-1)],{...user}),
                            props:result
                        }})
                    })
                    .catch(e=>console.log(e))
                } else {
                    socket.emit('action',{type:actions.ADD_CHAT,payload:{
                        user:false,
                        pubDate:new Date(),
                        mimeType:mimeType,
                        body:render(answer[_.random(answer.length-1)],{...user}),
                        props:''
                    }})
                }
                
                
            } catch (e) {
                console.log(e)
            }
            
        }else{
            socket.emit('action',{type:actions.ADD_CHAT,payload:{
                user:false,
                pubDate:new Date(),
                mimeType:'text/plain',
                body:"we didn't get you",
                props:''
            }})

        }
        

    }

    query({data},socket){
        
        var obj = getSuggestionFromIntent(intent,data)
        if(obj){
            socket.emit('action',{type:actions.ADD_SUGGESTIONS,payload:obj})
        }
        
    }

    // message(){
    //     try {

    //         if(message||store.getState().chatQuery.query){
    //             if(store.getState().chatQuery.propsName){
    //                 const chatQuery = store.getState().chatQuery
    //                 store.dispatch({type:actions.ADD_KWARGS,payload:{tag:chatQuery.tag,props:{[chatQuery.propsName]:chatQuery.query}}})
    //                 store.dispatch({type:actions.REMOVE_PROPS_NAME})
    //             }
    //             store.dispatch({type:actions.ADD_CHAT,payload:{
    //                 user:true,
    //                 pubDate:new Date(),
    //                 body:message||store.getState().chatQuery.query,
    //                 mimeType:'text/plain',
    //                 link:0,
    //                 props:"name",
    //                 leastPercentage:0.3
    //             }})

    //             this.scrollToButtom()


    //             var respond;

    //             if(store.getState().chatQuery.link){
    //                  respond = store.getState().QA.filter((e)=>store.getState().chatQuery.link===e.id)
    //                 store.dispatch({type:actions.REMOVE_LINK})
    //             }else{
    //                 const maxPropabilityIntent = _.max(getIntentProbabiliesFromText(store.getState().QA,message||store.getState().chatQuery.query),(value)=>value.probability)
    //                  respond = store.getState().QA.filter((e)=> maxPropabilityIntent.probability>this.clientProbabilityLimit?maxPropabilityIntent.id === e.id:false)
    //             }
    //             const respondRandomIndex = _.random(respond.length-1)
                
    //             this.scrollToButtom()

    //             const body = respond[0]?this.render(respond[respondRandomIndex].answer[_.random(respond[respondRandomIndex].answer.length-1)]):'not getting you qestion please try again...'
    //             const mimeType = respond[0]?respond[respondRandomIndex].mimeType:'text/plain'
    //             const props = respond[0]?respond[respondRandomIndex].props:''
    //             const tag = respond[0]?respond[respondRandomIndex].tag:''


    //             if(respond[0]&&respond[respondRandomIndex].link){

    //                 store.dispatch({type:actions.ADD_LINK,payload:respond[respondRandomIndex].link})


    //             }

    //             setTimeout(() => {
                    
    //                 store.dispatch({type:actions.ADD_PROPS_NAME,payload:{propsName:props,tag}})
    //                 store.dispatch({type:actions.ADD_CHAT,payload:{
    //                     user:false,
    //                     pubDate:new Date(),
    //                     body,
    //                     mimeType

    //                 }})
    //                 this.scrollToButtom()
    //             }, _.random(1,3)*1000);

    //         }
    //         store.dispatch({type:actions.CLEAR_QUERY})

    //         this.chatInput.value=''
    //     } catch (e) {
    //         console.error(e)
    //     }
    // }


}






module.exports = new Api()