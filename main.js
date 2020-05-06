const exp=require('express');const app=exp();
const bodyParser=require('body-parser')
app.use(bodyParser.json())

const {google}=require('googleapis');

const keys=require('./keys.json');

const client=new google.auth.JWT(
    keys.client_email, 
    null,
     keys.private_key,
     ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function(error,tokens){

    if(error){
         console.log(error);
         return;
    }else
    {
        console.log('connected...');
     
    }
 });  

app.get('/response',async function(req,res){
    
  var dataRecieved=  await gsrun(client);
   res.send(dataRecieved);
}) 
app.listen(3000); 

async function gsrun(cl){ //cl for client

 const gsapi=google.sheets({version:'v4', auth:cl });
const opt={
         spreadsheetId: '1KUeIDm-lfw9jLT5jP0vURJNjOKeUiNqVtpj5_bJLvBE',
         range:'Sheet1!A2:B5'
     };
let dataObtained= await gsapi.spreadsheets.values.get(opt);
 let dataArray=dataObtained.data.values;
    console.log(dataArray); //to see data on console 
    return dataArray;
  
} 
