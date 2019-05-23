const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const FileUploadSchema = new Schema({
    item_id: {
        type: String,
        required: true
    },
    file_name: {
        type: String,
        required: true
    },
    file_path: {
        type: String,
        required: true
    },
    upload_time: {
       type: Date,
       required: true
    },

    viewers: [{
        username: {
            type: String,
            required: true
        },
        view_time: {
            type: String,
            required: true
        }
    }]
})

module.exports = FileUpload = mongoose.model('FileUpload', FileUploadSchema);