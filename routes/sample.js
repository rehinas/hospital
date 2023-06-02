const express=require('express');
const app=new express();
app.use(express.json())
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}))
var fs=require('fs');
var ans;


fs.readFile('./hospital.json',(error,result)=>{
if(error){ ans=error;}
else{ ans=result}

})

router.get('/',(req,res)=>{
    
    res.send(ans);
})

var data={"name":"fathima hospital","patients":200,"location":"kalpetta"}

router.post('/add',(req,res)=>{
   var hosparr=JSON.parse(ans);
   hosparr.push(data)
   console.log(hosparr)
   var data2=JSON.stringify(hosparr)
   fs.writeFile(`./hospital.json`,data2,(err)=>{ if (err) throw err;
   console.log(`The ${data["name"]} hospital details has been saved!`);})
   res.send(`given data of ${data["name"]}  hospital is added, use GET command in postman to see it `)      
 })
 
 router.put('/update', (req, res) => {
  const index = req.params.ind;

  fs.readFile(`./hospital.json`, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      let hosparr = JSON.parse(result);
      console.log(hosparr);
      
      if (hosparr[index]) {
        hosparr[index].patients = 335;
        console.log(hosparr[index].patients);
        
        const data2 = JSON.stringify(hosparr);
        fs.writeFile(`./hospital.json`, data2, (err) => {
          if (err) throw err;
          console.log(`The number of patients for hospital ${hosparr[index].name} has been updated.`);
        });

        res.send(`Updated patients' number for hospital ${hosparr[index].name}. Use the GET command to see it.`);
      } else {
        res.status(404).json({ error: 'Hospital not found' });
      }
    }
  });
});




 router.delete('/delete/:ind', (req, res) => {
  const index = req.params.ind;
  let hosparr;

  fs.readFile('./hospital.json', (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      hosparr = JSON.parse(result);

      if (hosparr[index]) {
        const hosname = hosparr[index].name;
        delete hosparr[index];

        const newhosparr = hosparr.filter((element) => element !== null);

        const data2 = JSON.stringify(newhosparr);
        fs.writeFile('./hospital.json', data2, (err) => {
          if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
          } else {
            console.log(`The ${hosname} hospital details have been removed.`);
            res.send(`Deleted ${hosname} details. Use the GET command to see the updated list.`);
          }
        });
      } else {
        res.status(404).json({ error: 'Hospital not found' });
      }
    }
  });
});

   
module.exports=router;


