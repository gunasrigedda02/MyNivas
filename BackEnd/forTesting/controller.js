const Schema = require("./model");

const addTest = async (req, res) => {
    const {testId, testName, testStatus} = req.body;

    try{
        const newTestData = new Schema({testId, testName, testStatus});
        await newTestData.save();
        res.send("Test data added successfull");
    } catch (er) {
        console.log(er);
        res.send(er);
    }
};

exports.addTest = addTest;