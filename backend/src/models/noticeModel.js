const mongoose = require("mongoose");


const noticeSchema = new mongoose.Schema({
    noticeID:{
        type:String,
        required:true,
        unique:true
    },
    issueDate:String,
    noticeBody:String,
    issuedBy:String,
    noticeType:{
      type:String,
      enum:['notice','announcement']
    },
    issuerRole:String,
    images: [
        {
          image: {
            filename: String,
            url: String,
            imageDefinition: String,
          }
        }
      ],
})

const Notice = mongoose.model("Notice",noticeSchema)
module.exports = Notice