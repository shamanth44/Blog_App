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

    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
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