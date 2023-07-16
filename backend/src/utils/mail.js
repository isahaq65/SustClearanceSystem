const {createTransport} = require('nodemailer')

const mailHandler= async(receiverMail,applicantName,applicationType,controllerName,applicationID,issueDate)=>{
    const transport =createTransport({
        service:'gmail',
        auth:{
            user:process.env.mail,
            pass:process.env.pass
        }
    })
    console.log(receiverMail,applicantName,applicationType,controllerName,applicationID,issueDate)
    const mailOptions={
        from:'Controller SUST  <web.devmail.00@gmail.com>',
        to:`${receiverMail}`,
        subject:'Application Issue',
        text:`Dear ${applicantName}, Your ${applicationType} (Application ID:${applicationID}) will be issued on ${issueDate}. Please collect it from controller building, SUST.`,
        html:`<h3>Dear ${applicantName},</h3><br><p>Your ${applicationType} (Application ID:${applicationID}) will be issued on ${issueDate}. Please collect it from controller building, SUST.</p> <br> Regards,<br>${controllerName}<br>Controller, SUST.`
    }
    await transport.sendMail(mailOptions);
}



const mailSender= async(name,receiverMail,applicationType,applicationID)=>{
    const transport =createTransport({
        service:'gmail',
        auth:{
            user:process.env.mail,
            pass:process.env.pass
        }
    })
    // console.log(receiverMail,applicantName,applicationType,controllerName,applicationID,issueDate)
    const mailOptions={
        from:'SUST  <web.devmail.00@gmail.com>',
        to:`${receiverMail}`,
        subject:'New Application Submitted',
        text:`Dear ${name}, A new application for ${applicationType} (${applicationID}) has been submitted.  `,
        html:`<h3>Dear ${name},</h3><br><p>A new application for ${applicationType} (${applicationID}) has been submitted.  <br> Regards,<br>SUST.`
    }
    await transport.sendMail(mailOptions);
}


module.exports={mailHandler,mailSender}