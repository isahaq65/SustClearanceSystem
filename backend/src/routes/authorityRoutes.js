const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/adminCheck");
const Application = require("../models/applicationModel");
const {mailHandler} = require("../utils/mail");

router.post("/pending-approval", [auth, admin], async (req, res) => {
    try {
        // const applicationID=req.params.applicationID
        const role = req.user.role
        let certificates=[], gradesheets=[], clearance=[], equivalentCertificate=[], transcript=[];
        switch (role) {
            case 'department head':
                [certificates, gradesheets, clearance, equivalentCertificate, transcript] = await Promise.all(
                    [
                        Application.find({ applicationType: 'certificate', dept: req.user.dept, 'type1Approval.departmentHead.approval': false, rejectionStatus: false }),
                        Application.find({ applicationType: 'gradesheet', dept: req.user.dept, 'type1Approval.departmentHead.approval': false, rejectionStatus: false }),
                        Application.find({ applicationType: 'equivalent-certificate', dept: req.user.dept, 'type1Approval.departmentHead.approval': false, rejectionStatus: false }),
                        Application.find({ applicationType: 'transcript', dept: req.user.dept, 'type1Approval.departmentHead.approval': false, rejectionStatus: false }),
                        Application.find({ applicationType: 'clearance', dept: req.user.dept, 'type2Approval.departmentHead.approval': false, rejectionStatus: false, 'type2Approval.librarian.approval': true,'type2Approval.proctor.approval': true,'type2Approval.studentAdvisor.approval': true,'type2Approval.register.approval': true,'type2Approval.medicalOfficer.approval': true,'type2Approval.provost.approval': true }),

                    ]
                )
                break
            case 'controller':
                [certificates, gradesheets, equivalentCertificate, transcript] = await Promise.all(
                    [
                        Application.find({ applicationType: 'certificate', 'type1Approval.controller.approval': false, rejectionStatus: false, 'type1Approval.departmentHead.approval': true }),
                        Application.find({ applicationType: 'gradesheet', 'type1Approval.controller.approval': false, rejectionStatus: false, 'type1Approval.departmentHead.approval': true }),
                        Application.find({ applicationType: 'equivalent-certificate', 'type1Approval.controller.approval': false, rejectionStatus: false, 'type1Approval.departmentHead.approval': true }),
                        Application.find({ applicationType: 'transcript', 'type1Approval.controller.approval': false, rejectionStatus: false, 'type1Approval.departmentHead.approval': true }),

                    ]
                )
                // clearance=[]
                break
            case 'librarian':
                clearance = await Application.find({ applicationType: 'clearance', 'type2Approval.librarian.approval': false, rejectionStatus: false })
                // certificates=[]
                // gradesheets=[]
                // equivalentCertificate=[]
                // transcript=[]
                break

            case 'proctor':
                clearance = await Application.find({ applicationType: 'clearance', 'type2Approval.proctor.approval': false, rejectionStatus: false })
                // certificates=[]
                // gradesheets=[]
                // equivalentCertificate=[]
                // transcript=[]
                break
            case 'student advisor':
                clearance = await Application.find({ applicationType: 'clearance', 'type2Approval.studentAdvisor.approval': false, rejectionStatus: false })
                // certificates=[]
                // gradesheets=[]
                // equivalentCertificate=[]
                // transcript=[]
                break
            case 'register':
                clearance = await Application.find({ applicationType: 'clearance', 'type2Approval.register.approval': false, rejectionStatus: false })
                // certificates=[]
                // gradesheets=[]
                // equivalentCertificate=[]
                // transcript=[]
                break
            case 'medical officer':
                clearance = await Application.find({ applicationType: 'clearance', 'type2Approval.medicalOfficer.approval': false, rejectionStatus: false })
                // certificates=[]
                // gradesheets=[]
                // equivalentCertificate=[]
                // transcript=[]
                break
            case 'provost':
                clearance = await Application.find({ applicationType: 'clearance', 'type2Approval.provost.approval': false, rejectionStatus: false })
                // certificates=[]
                // gradesheets=[]
                // equivalentCertificate=[]
                // transcript=[]
                break
        }
        
        res.send({ certificates, gradesheets, clearance, equivalentCertificate, transcript });

    } catch (e) {
        error = e.message;
        res.send({ error });
    }
});

router.post("/approval/:applicationID", [auth, admin], async (req, res) => {
  try {
    const applicationID = req.params.applicationID;
    const role = req.user.role;
    const { issueDate } = req.body;
    const application = await Application.findOne({ applicationID });
    const { applicationType } = application;

    switch (role) {
      case "department head":
        if (applicationType !== "clearance") {
          application.type1Approval.departmentHead.approval = true;
          application.type1Approval.departmentHead.signature =
            req.user.signatureImage.url;
          // application.completeStatus = true
        } else {
          application.type2Approval.departmentHead.approval = true;
          application.type2Approval.departmentHead.signature =
            req.user.signatureImage.url;
          application.completeStatus = true;
        }
        break;
      case "controller":
        if (applicationType !== "clearance") {
        // console.log(issueDate)
          application.type1Approval.controller.approval = true;
          application.type1Approval.controller.signature = req.user.signatureImage.url;
          application.completeStatus = true;
          application.issueDate = issueDate;
        }
        break;
      case "librarian":
        application.type2Approval.librarian.approval = true;
        application.type2Approval.librarian.signature =
          req.user.signatureImage.url;

        break;

      case "proctor":
        application.type2Approval.proctor.approval = true;
        application.type2Approval.proctor.signature =
          req.user.signatureImage.url;

        break;
      case "student advisor":
        application.type2Approval.studentAdvisor.approval = true;
        application.type2Approval.studentAdvisor.signature =
          req.user.signatureImage.url;

        break;
      case "register":
        application.type2Approval.register.approval = true;
        application.type2Approval.register.signature =
          req.user.signatureImage.url;

        break;
      case "medical officer":
        application.type2Approval.medicalOfficer.approval = true;
        application.type2Approval.medicalOfficer.signature =
          req.user.signatureImage.url;

        break;
      case "provost":
        application.type2Approval.provost.approval = true;
        application.type2Approval.provost.signature =
          req.user.signatureImage.url;

        break;
    }


    await application.save();


    if (role === "controller") {
      await mailHandler(
        application.email,
        application.name,
        application.applicationType,
        req.user.name,
        applicationID,
        application.issueDate
      );
    }
    res.send(application);
    
  } catch (e) {
    error = e.message;
    res.send({ error });
  }
});

router.post("/reject/:applicationID", [auth, admin], async (req, res) => {
  try {
    const applicationID = req.params.applicationID;
    const role = req.user.role;
    const { comment } = req.body;
    const application = await Application.findOne({ applicationID });
    const { applicationType } = application;

    switch (role) {
      case "department head":
        if (applicationType !== "clearance") {
          application.type1Approval.departmentHead.comment = comment;
        } else {
          application.type2Approval.departmentHead.comment = comment;
        }
        break;
      case "controller":
        if (applicationType !== "clearance") {
          application.type1Approval.controller.comment = comment;
        }
        break;
      case "librarian":
        application.type2Approval.librarian.comment = comment;

        break;

      case "proctor":
        application.type2Approval.proctor.comment = comment;
        break;
      case "student advisor":
        application.type2Approval.studentAdvisor.comment = comment;
        break;
      case "register":
        application.type2Approval.register.comment = comment;

        break;
      case "medical officer":
        application.type2Approval.medicalOfficer.comment = comment;

        break;
      case "provost":
        application.type2Approval.provost.comment = comment;

        break;
    }

    application.rejectionStatus = true;
    // console.log(application)
    await application.save();
    res.send(application);
  } catch (e) {
    error = e.message;
    res.send({ error });
  }
});

router.get("/clearance-check/:regNo", auth, async (req, res) => {
  try {
    const application = await Application.find({
      regNo: req.params.regNo,
      applicationType: "clearance",
      completeStatus: true,
    });
    if (application.length) {
      res.status(200).send({ result: true, application });
    } else {
      res.status(200).send({ result: false });
    }
  } catch (e) {
    res.status(500).send({ result: false });
  }
});

router.post("/send-mail", [auth, admin], async (req, res) => {
  try {
    const { applicationID } = req.body;
    const [application] = await Application.find({ applicationID });
    await mailHandler(
      application.email,
      application.name,
      application.applicationType,
      req.user.name,
      applicationID,
      application.issueDate
    );
    res.status(200).send({ result: true });
  } catch (e) {
    res.status(500).send({ result: false });
  }
});

module.exports = router;
