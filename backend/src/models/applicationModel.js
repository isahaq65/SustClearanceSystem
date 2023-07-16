const mongoose = require("mongoose");


const applicationSchema = new mongoose.Schema({
  applicationID: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
  },
  dept: {
    type: String,
    trim: true,
  },
  session: String,
  regNo: {
    type: String,
    trim: true,
  },
  images: [
    {
      image: {
        filename: String,
        url: String,
        imageDefinition: String,
      }
    }
  ],
  discipline: String,
  school: String,

  applicationType: {
    type: String,
    enum: ['gradesheet', 'clearance', 'certificate', 'equivalent-certificate','transcript']
  },
  signatureImageUrl:String,
  recipientAddress: String,
  currentAddress: String,
  permanentAddress: String,
  mobile: String,
  nameExam: String,
  nameExamYear: String,
  cgpa: String,
  letterGrade: String,
  nationality: String,
  degree: String,
  date: String,
  issueDate:String,
  semester:String,
  fatherName:String,
  type1Approval: {
    departmentHead: {
      approval:{
        type: Boolean,
      default: false,
      },
      signature: String,
      comment:String
    },
    controller: {
      approval:{
        type: Boolean,
      default: false,
      },
      signature: String,
      comment:String

    },
  },
  type2Approval: {
    departmentHead: {
      approval:{
        type: Boolean,
      default: false,
      },
      signature: String,
      comment:String

    },
    librarian: {
      approval:{
        type: Boolean,
      default: false,
      },
      signature: String,
      comment:String

    },
    proctor: {
      approval:{
        type: Boolean,
      default: false,
      },
      signature: String,
      comment:String

    },
    studentAdvisor: {
      approval:{
        type: Boolean,
      default: false,
      },
      signature: String,
      comment:String

    },
    register: {
      approval:{
        type: Boolean,
      default: false,
      },
      signature: String,
      comment:String

    },
    medicalOfficer: {
      approval:{
        type: Boolean,
      default: false,
      },
      signature: String,
      comment:String

    },
    provost: {
      approval:{
        type: Boolean,
      default: false,
      },
      signature: String,
      comment:String
    },
  },

  completeStatus: {
    type: Boolean,
    default: false
  },
  rejectionStatus: {
    type: Boolean,
    default: false
  }

});

applicationSchema.methods.saveImages = async function (files) {
  const application = this;
  files.forEach(file => {
    const { filename, fieldname: imageDefinition } = file
    const image = {
      filename,
      url: `http://localhost:${process.env.PORT}/` + filename,
      imageDefinition
    }
    //   console.log(image)
    application.images = application.images.concat({ image });
  });

  await application.save();
  // return token;
};

applicationSchema.methods.toJSON = function () {
  let application = this
  application = application.toObject()

  if (application.applicationType === 'clearance') {
    delete application.type1Approval
    application.approval = application.type2Approval
    delete application.type2Approval
  } else {
    delete application.type2Approval
    application.approval = application.type1Approval
    delete application.type1Approval

  }
  // console.log(user)
  return application
}



const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
