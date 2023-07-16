const router = require("express").Router();
const auth = require('../middleware/auth')
const { v4: uuidv4 } = require('uuid');
const Application = require("../models/applicationModel")
const upload = require('../utils/imageUploader');
const User = require("../models/userModel");
const {mailSender} = require('../utils/mail')

const letterGradeGenerator = (cgpa)=>{
    cgpa=parseFloat(cgpa)
    let lg;
    switch(true){
        case cgpa>=4.00:
            lg='A+'
            break
        case cgpa >=3.75:
            lg='A'
            break
        case cgpa >= 3.5:
            lg='A-'
            break
        case cgpa >=3.25:
            lg='B+'
            break
        case cgpa >=3:
            lg='B'
            break
        case cgpa >=2.75:
            lg='B-'
            break
        case cgpa >=2.5:
            lg='C+'
            break
        case cgpa >=2.25:
            lg='C'
            break
        case cgpa >=2:
            lg='C-'
            break
        default:
            lg='F'
    }
    return lg
}


router.post("/submit",[auth,upload.any()], async (req, res) => {
    try {
        // const user=req.user
        const files=req.files
        const {discipline,school,nameExam,nameExamYear,recipientAddress,currentAddress,mobile,applicationType,cgpa,degree,semester}=req.body

        const applicationID=uuidv4().split('-')[0]
        const application= new Application({
            applicationID,
            name:req.user.name,
            regNo:req.user.regNo,
            dept:req.user.dept,
            applicationType:applicationType,
            email:req.user.email
        })
        if(applicationType==='clearance'){
            application.degree=degree

        }else{
            application.fatherName=req.user.fatherName,
            application.session=req.user.session,
            application.discipline=discipline,
            application.school=school,
            application.nameExam=nameExam,
            application.nameExamYear=nameExamYear,
            application.recipientAddress=recipientAddress,
            application.currentAddress= currentAddress ,
            application.permanentAddress=req.user.permanentAddress
            application.mobile= mobile | req.user.mobile,
            application.cgpa=cgpa,
            application.letterGrade=letterGradeGenerator(cgpa),
            application.nationality=req.user.nationality,
            application.semester=semester
            application.degree=degree
        }
        application.signatureImageUrl=req.user.signatureImage.url
        application.date=new Date().toLocaleDateString()
        application.saveImages(files)
        
        const [departmentHead,controller,librarian,proctor,studentAdvisor,register,medicalOfficer,provost] = await Promise.all([
            User.findOne({role:"department head"}),
            User.findOne({role:"controller"}),
            User.findOne({role:"librarian"}),
            User.findOne({role:"proctor"}),
            User.findOne({role:"student advisor"}),
            User.findOne({role:"register"}),
            User.findOne({role:"medical officer"}),
            User.findOne({role:"provost"}),

        ]) 
        if (applicationType==='clearance'){
            await Promise.all([
                mailSender(departmentHead.name,departmentHead.email,applicationType,applicationID),
                mailSender(controller.name,controller.email,applicationType,applicationID),
                mailSender(librarian.name,librarian.email,applicationType,applicationID),
                mailSender(proctor.name,proctor.email,applicationType,applicationID),
                mailSender(studentAdvisor.name,studentAdvisor.email,applicationType,applicationID),
                mailSender(register.name,register.email,applicationType,applicationID),
                mailSender(medicalOfficer.name,medicalOfficer.email,applicationType,applicationID),
                mailSender(provost.name,provost.email,applicationType,applicationID),
                
            ])
        }else{
            await Promise.all([
                mailSender(departmentHead.name,departmentHead.email,applicationType,applicationID),
                mailSender(controller.name,controller.email,applicationType,applicationID)
            ])

        }

        res.status(200).send(application);
    } catch (e) {
        error = e.message;
        res.send({ error });
    }
});


router.post("/find/:applicationID", auth, async (req, res) => {
    try {
        const applicationID=req.params.applicationID
        console.log(applicationID)
        const application = await Application.findOne({applicationID})
        res.send(application);
    } catch (e) {
        error = e.message;
        res.send({ error });
    }
});

router.post("/findall",auth, async (req, res) => {
    try {
        const application = await Application.find({regNo:req.user.regNo})
        res.send(application);
    } catch (e) {
        error = e.message;
        res.send({ error });
    }
});

module.exports = router;
