const { mongoose, Schema } = require('mongoose')

const categorySchema = new Schema({
    name: {
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
},
    {
        timestamps: true
    }
)

const Category = mongoose.model("Category", categorySchema )

module.exports = { Category }