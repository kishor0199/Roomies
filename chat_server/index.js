const app=require('express')()

const http=require('http').createServer(app)

const io=require('socket.io')(http,{
    cors:{
        origin:'http://localhost:3000'
    }
})


io.on('connection',(socket)=>{
   console.log('connected')

   socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
   })
})


http.listen(4000,function(){
    console.log("listening on port number 4000")
})