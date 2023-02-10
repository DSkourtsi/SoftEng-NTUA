const mysql = require("mysql");
const express = require("express");
const router = express.Router();
const DB = require('../sqlConnection').db_con;

function questionnaire(req, res){

    let questionnaireID = req.params.questionnaireID;
    
    if (questionnaireID.length == 0){
        res.status(400).send("400: Bad Request");
        return;
    }

    else{
        const myquery="SELECT *\
                       FROM questionnaire\
                       WHERE questionnaireID = ?";
        const parameters = [questionnaireID]

        DB.query(myquery, parameters, function(err, result, fields){
            if (err) {
                var Json = {
                    status: "failed",
                    reson: "500: Internal Server Error \n"+err
                };
                res.status(500).send(Json);
                return;
              }
            if (result.length == 0){
                res.status(402).send("402: No data");
                return;
            }
            else{
                const query2="SELECT qID, qtext, required, type\
                       FROM question\
                       WHERE questionnaireID = ?";
                const parameters = [questionnaireID]

                DB.query(query2, parameters, function(err, res_questions, fields){
                    if (err) {
                        var Json = {
                            status: "failed",
                            reson: "500: Internal Server Error \n"+err
                        };
                        res.status(500).send(Json);
                        return;
                    }
                    
                
                    else{
                        var Json = {
                            status: "OK",
                            questionnaireID: questionnaireID,
                            questionnaireTitle: result[0].questionnaireTitle,
                            keywords: result[0].keywords,
                            questions: res_questions
                        };
                        res.status(200).send(Json);
                        return;
                    }
                });
            }
        });
    }
}
router.get("/questionnaire/:questionnaireID", questionnaire);

module.exports = router;
