const { mongoose, Schema } = require('mongoose')

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        type: String
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

    
},
    {
        timestamps: true
    }
)

const Blog = mongoose.model("Blog", blogSchema )

module.exports = { Blog }