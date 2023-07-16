const router = require("express").Router();
const auth = require('../middleware/auth')
const admin = require('../middleware/adminCheck')

const { v4: uuidv4 } = require('uuid');
const Notice = require('../models/noticeModel')


router.post("/add",[auth,admin],async(req,res)=>{
    try{
        const {noticeBody,noticeType}=req.body
        if(req.user.role === 'department head'){
            req.user.role = `${req.user.role}:${req.user.dept}`
        }
        console.log(req.body)
        const noticeID=uuidv4().split('-')[0]
        // console.log(noticeID)
        const notice = new Notice({
            noticeID,
            issueDate:new Date().toLocaleDateString(),
            noticeBody,
            noticeType,
            issuedBy:req.user.name,
            issuerRole:req.user.role
        })
        await notice.save()
        res.status(200).send(notice)

    }catch(e){
        res.status(500).send({result:false})
    }
})

router.get("/view",auth,async(req,res)=>{
    try{
        const notices= await Notice.find()
        res.status(200).send(notices)

    }catch(e){
        res.status(500).send({result:false})
    }
})

router.get("/view/annoucement",auth,async(req,res)=>{
    try{
        const notices= await Notice.find()
        let annoucement=[];

        if(notices.length){
            for(let i=notices.length-1;i>=0;i--){
                if(notices[i].noticeType =="announcement")
                {
                    annoucement.push(notices[i]);
    
                }
            }

        }


        if(annoucement.length)
        {
            annoucement =[annoucement[0]]

            res.status(200).send(annoucement)
        }
       else  res.status(200).send(annoucement)

    }catch(e){
        res.status(500).send({result:false})
    }
})






module.exports=router