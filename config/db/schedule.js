const schedule = require('node-schedule');
const startHour = 6;
const startMinute = 0;
const endHour = 18;
const endMinute = 0;
const dateOpen = [0, 1, 2, 3, 4, 5, 6]; //monday-saturday
var isReseted = false;
const Product = require('../../Models/Products.m');
const OnSell = require('../../Models/Onsell.m');

class CanteenSchedule {

    async run() {
        const start = schedule.scheduleJob({ hour: startHour, minute: startMinute, dayOfWeek: dateOpen }, function () {
            console.log('Reset product of today!');

            let today = new Date();
            today = today.getDay();
            console.log(today);

            Product.find({daysell: today}, function (err, products){
                if (!err){
                    //console.log(products[0]);
                    //console.log(products);

                    OnSell.deleteMany({}, function (error, Onsells){
                        if (!error){
                            //do something :v
                        } else{
                            console.log(error);
                        }
                    });

                    for (let i = 0; i < products.length; i++){
                        let item = {
                            id: products[i].id,
                            quantity: products[i].total
                        }

                        let newOnSell = new OnSell(item);
                        newOnSell.save();
                    }

                }
                else{
                    console.log(err);
                }
            })
        });
        const end = schedule.scheduleJob({ hour: endHour, minute: endMinute, dayOfWeek: dateOpen }, function () {
            console.log('Close!');
        });

        if (isReseted == false){

            isReseted = true;
            console.log('Reset product of today!');

            let today = new Date();
            today = today.getDay();
            //console.log(today);

            let deleteO = await OnSell.deleteMany({}); //Reset lai danh sach hang hoa hom nay
            //console.log(deleteO);

            let findPFood = await Product.find({daysell: today});

            for (let i = 0; i < findPFood.length; i++){
                let item = {
                    product: findPFood[i]._id,
                    quantity: findPFood[i].total
                }

                let newOnSell = new OnSell(item);
                let saveN = await newOnSell.save();
            };

            let findPFastFood = await Product.find({type: {$in:["cake", "gas", "noGas"]}, total: {$gt:0}});
            
            for (let i = 0; i < findPFastFood.length; i++){
                let item = {
                    product: findPFastFood[i]._id,
                    quantity: findPFastFood[i].total
                }

                let newOnSell = new OnSell(item);
                let saveN = await newOnSell.save();
            };
        }
    }

}

module.exports = new CanteenSchedule;