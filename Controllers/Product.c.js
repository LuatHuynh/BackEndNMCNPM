const Product = require('../Models/Products.m');
const OnSell = require('../Models/Onsell.m');
const Import = require('../Models/Import.m');
const Inventory = require('../Models/Inventory.m');
const getNewID = require('../public/GetNewID');

class ProductController {

    async index(req, res, next) {
        try {
            res.send("hello");
        } catch (error) {
            next(error);
        }
    }

    async CurrentProduct(req, res, next) {
        try {

            let findO = await OnSell.
                find({}).
                populate('product');
            //console.log(findO);
            let todayProduct = [];
            for (let i = 0; i < findO.length; i++) {
                let item = {
                    id: findO[i].product.id,
                    type: findO[i].product.type,
                    img: findO[i].product.img,
                    total: findO[i].quantity,
                    name: findO[i].product.name,
                    price: findO[i].product.price
                }
                todayProduct[i] = item;
            }

            res.json({products: todayProduct});

        } catch (error) {
            next(error);
        }
    }

    async insertFood(req, res, next) {
        try {
            let listProducts = req.body.product;
            let daySell = parseInt(req.body.day);

            let updateP = await Product.updateMany({ daysell: daySell }, { daysell: -1 });

            //generate new ID
            let findP = await Product.find({});
            let newID = 0;
            let resultNewID = '';
            if (findP.length == 0) {
                resultNewID = 'FF0000000';
            } else {
                let curID = findP[findP.length - 1].id;

                curID = curID.slice(2);
                newID = 1 + parseInt(curID[0]) * 1000000 + parseInt(curID[1]) * 100000 + parseInt(curID[2]) * 10000
                        + parseInt(curID[3]) * 1000 + parseInt(curID[4]) * 100 + parseInt(curID[5]) * 10 + parseInt(curID[6]);
                
                resultNewID = newID + '';
                while (resultNewID.length < 7){
                    resultNewID = '0' + resultNewID;
                }
                resultNewID = 'FF' + resultNewID;
            }
            

            for (let i = 0; i < listProducts.length; i++) {

                if (i != 0){
                    newID++;
                    resultNewID = newID + '';
                    while (resultNewID.length < 7){
                        resultNewID = '0' + resultNewID;
                    }
                    resultNewID = 'FF' + resultNewID;
                }

                //add product
                let item = {
                    id: resultNewID,
                    name: listProducts[i].name,
                    img: listProducts[i].img,
                    type: listProducts[i].type,
                    price: listProducts[i].price,
                    daysell: daySell,
                    total: listProducts[i].total
                }

                let newProduct = new Product(item);
                let addP = await newProduct.save();
            }

            //Product.insertMany(req.body);
            res.json({
                message: "success"
            })

        } catch (error) {
            next(error);
        }
    }

    async importGoods(req, res, next) {
        try {
            let listProducts = req.body.product;

            //generate new ID
            let findP = await Product.find({});
            let newID = 0;
            let resultNewID = '';
            if (findP.length == 0) {
                resultNewID = 'FF0000000';
            } else {
                let curID = findP[findP.length - 1].id;

                curID = curID.slice(2);
                newID = 1 + parseInt(curID[0]) * 1000000 + parseInt(curID[1]) * 100000 + parseInt(curID[2]) * 10000
                        + parseInt(curID[3]) * 1000 + parseInt(curID[4]) * 100 + parseInt(curID[5]) * 10 + parseInt(curID[6]);
                
                resultNewID = newID + '';
                while (resultNewID.length < 7){
                    resultNewID = '0' + resultNewID;
                }
                resultNewID = 'FF' + resultNewID;
            }
            

            for (let i = 0; i < listProducts.length; i++) {

                if (i != 0){
                    newID++;
                    resultNewID = newID + '';
                    while (resultNewID.length < 7){
                        resultNewID = '0' + resultNewID;
                    }
                    resultNewID = 'FF' + resultNewID;
                }

                //add product
                let itemProduct = {
                    id: resultNewID,
                    name: listProducts[i].name,
                    img: listProducts[i].img,
                    type: listProducts[i].type,
                    price: listProducts[i].price,
                    daysell: -1,
                    total: 0
                }
                let newProduct = new Product(itemProduct);
                let addP = await newProduct.save();

                //add good
                let itemImport = {
                    productID: newProduct._id,
                    time: listProducts[i].time,
                    total: listProducts[i].total,
                    totalPrice: listProducts[i].totalPrice,
                    source: listProducts[i].source
                }
                let newImport = new Import(itemImport);
                
                let addImport = await newImport.save();

                //add inventory
                let itemInventory = {
                    productID: newProduct._id,
                    quantity: listProducts[i].total
                }
                let newInventory = new Inventory(itemInventory);
                let addInventory = await newInventory.save();
            }

            //Product.insertMany(req.body);
            res.json({
                message: "success"
            })

        } catch (error) {
            next(error);
        }
    }

    async importHistory(req, res, next) {
        try {
            let findImport = await Import.
                find({}).
                populate('productID');
            let importArr = [];
            for (let i = 0; i < findImport.length; i++) {
                let item = {
                    id: findImport[i].productID.id,
                    name: findImport[i].productID.name,
                    total: findImport[i].total,
                    totalPrice: findImport[i].totalPrice,
                    source: findImport[i].source,
                    time: findImport[i].time
                }
                importArr.push(item);
            }

            res.json({
                products: importArr
            });

        } catch (error) {
            next(error);
        }
    }

    async currentInventory(req, res, next) {
        try {
            let findInventory = await Inventory.
                find({}).
                populate('productID');
            
            let cakeArr = [];
            let gasArr = [];
            let noGasArr = [];

            for (let i = 0; i < findInventory.length; i++) {
                if (findInventory[i].productID.type == "cake"){
                    let item = {
                        id: findInventory[i].productID.id,
                        name: findInventory[i].productID.name,
                        quantity: findInventory[i].quantity
                    }
                    cakeArr.push(item);
                }
                if (findInventory[i].productID.type == "gas"){
                    let item = {
                        id: findInventory[i].productID.id,
                        name: findInventory[i].productID.name,
                        quantity: findInventory[i].quantity
                    }
                    gasArr.push(item);
                }
                if (findInventory[i].productID.type == "noGas"){
                    let item = {
                        id: findInventory[i].productID.id,
                        name: findInventory[i].productID.name,
                        quantity: findInventory[i].quantity
                    }
                    noGasArr.push(item);
                }
            }

            res.json({
                gas: gasArr,
                noGas: noGasArr,
                cake: cakeArr
            });

        } catch (error) {
            next(error);
        }
    }


}

module.exports = new ProductController;