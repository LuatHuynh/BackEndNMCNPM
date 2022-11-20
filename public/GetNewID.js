const Product = require('../Models/Products.m');

var newID = '';

class GetNewID {
    generateProductID() {
        // let findP = await Product.find({});
        // //console.log(findP);
        // if (findP.length == 0) {
        //     newID = 'FF0000000';
        // } else {
        //     let curID = findP[findP.length - 1].id;

        //     newID = curID;
        // }
        Product.find({}, function (err, products){
            if (!err){
                //console.log(products[0]);

                if (products.length == 0) {
                    //return 'FF0000000';
                } else {
                    let curID = products[products.length - 1].id;

                    newID = curID;
                    console.log(newID)
                    //return newID;
                }

            }
            else{
                console.log(err);
            }
        });
        // console.log("after + " + newID)
        // return newID;
    }
    
    // generateProductID(){
    //     this.ProductID();
    //     console.log(newID);
    //     return newID;
    // }
}

module.exports = new GetNewID;