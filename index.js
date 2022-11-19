var express = require('express');
var mongoose = require('mongoose');
var body_parser = require('body-parser');
var app = express()
var Customer_Model = require('./models/Customers');




var db_host = 'localhost'
var db_name='customers_db'
mongoose.connect('mongodb://'+db_host+'/'+db_name);

//suport parsing of application/json type post data
app.use(body_parser.json());
//support parsing of application /x-www-form-urlencoded post data
app.use(body_parser.urlencoded({extended:ture}));

var server = app.listen(8080, function(){
    console.log("Application Server Started Listening requests");
});

// create customer using post request

app.post('/create_customer', function(req, res){
// receive the posted data
    var user_obj = new Customer_Model(req.body);

    var return_arr={};
    user_obj.save(function(err){
        if(err)
        {
            return_arr.satatus=0;
            return_err.message=err.message;
        }
        else{
            return_arr.status=1;
            return_arr.message="Customer Created Successful";
        }

        var ReturnjsonString= JSON.stringify(return_arr);
        res.json(ReturnjsonString);
    });
});

// select all customers using GET request 

app.get('/get_all_customers', function(req, res){
    //select all records, just intaniate the modal with its name 
    Customer_Model.find({}, function(err, data){

        var return_arr={};

        if(err)
        {
            return_arr.status=0;
            return_arr.message=err.message;
        }
        else
        {
        return_arr.status=1;
        return_arr.customers=data;
        }

        res.json(return_arr);
    });
});

// update customers using PUT request 

app.put('/update_customer/:customer_id', function(req, res){
    var return_arr={};
    Customer_Model.findByIdAndUpdate(req.params.customer_id, req.body,{new: true}, function(err){
        if(err)
        {
            return_arr.status=0;
            return_arr.message=err.message;
        }
        else
        {
         return_arr.status=1;
         return_arr.message="Customer Updated Successfully";
        }

        res.json(return_arr);
    });

});

// delete customer using delete request

app.delete('/delete_customer/:customer_id', function(req, res){

    var return_arr={};
    Customer_Model.findByIdAndRemove(req.params.customer_id, function(err){
        if(err)
        {
            return_arr.status=0;
            return_arr.message=err.message;
        }
        else
        {
            return_arr.status=1;
            return_arr.message="Customer Deleted Successfully";
        }
        res.json(return_arr)
    });
});



