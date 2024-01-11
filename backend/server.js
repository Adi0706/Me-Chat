const PORT = 8000 
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())


const APIKEY = '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'

app.post('/messages',async (req,res)=>{

const options = {
    method:"POST",
    headers:{
        "Authorization" :`Bearer ${APIKEY}` ,
        "Content-Type" : "application/json"
},
body: JSON.stringify({
    model : "gpt-3.5-turbo-0613",
    messages : [{role: "user", content:req.body.message}],
    max_tokens:100


})
}

    try{
        const response  = await fetch('https://api.openai.com/v1/chat/completions',options)
      const data =   await response.json()
      console.log(data);
      res.send(data)

    }catch (error){
        console.log(error)
    }

})


app.listen(PORT,()=>console.log('SERVER RUNNING AT PORT ' + PORT))