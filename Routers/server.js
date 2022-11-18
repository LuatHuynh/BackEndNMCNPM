
const DefaultRouter = require('./Default.r')

function route(server){



    server.get('/', DefaultRouter);

}

module.exports = route;