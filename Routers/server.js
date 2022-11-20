
const ProductRouter = require('./Product.r')
const DefaultRouter = require('./Default.r')

function route(server){

    server.use('/api/product', ProductRouter);

    server.get('/', DefaultRouter);

}

module.exports = route;