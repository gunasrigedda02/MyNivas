const mongoose = require("mongoose");

const demoTestSchema = new mongoose.Schema({
    testId: {
        type: Number
    },
    testName: {
        type: String
    },
    testStatus: {
        type: String
    }
});

module.exports = mongoose.model("demoTest", demoTestSchema);
"C:\Users\Anilk\OneDrive\Desktop\MongoDBCompass.lnk"