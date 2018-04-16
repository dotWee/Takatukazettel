var mongoose = require('mongoose');
var databaseConfig = require('../../config/database');

var itemSchema = mongoose.Schema({
    title: String,
    user: String,
});

var Item = mongoose.model('Item', itemSchema);

function items(request, response) {
    if (databaseConfig.useMongoDb) mongoItems(request, response);
    else inmemItems(request, response);
}

function mongoItems(request, response) {
    Item.find(function (err, items) {

        // if there is an error retrieving, send the error. nothing after response.send(err) will execute
        if (err) {
            response.send(err);
        }

        // return all items as json
        response.json(items);
    });
}

function inmemItems(request, response) {

}

function find(request, response) {
    if (databaseConfig.useMongoDb) mongoFind(request, response);
    else inmemFind(request, response);
}

function mongoFind(request, response) {
    let id = request.swagger.params.id.value;

    Item.findOne({
        _id: id
    }, function (err, item) {

        // if there is an error retrieving, send the error. nothing after response.send(err) will execute
        if (err) {
            response.send(err);
        }

        // return item as json
        response.json(item);
    });
}

function inmemFind(request, response) {

}

function save(request, response) {
    if (databaseConfig.useMongoDb) mongoSave(request, response);
    else inmemSave(request, response);
}

function mongoSave(request, response) {
    let item = new Item({
        title: request.body.title,
        user: request.body.user
    });

    item.save(function (err, item) {
        if (err) {
            console.log(err);
        } else {
            console.log('saved item with title ' + item.title);
            response.json({
                success: 1,
                description: 'Item saved',
            });
        }
    });
}

function inmemSave(request, response) {

}

function update(request, response) {
    if (databaseConfig.useMongoDb) mongoUpdate(request, response);
    else inmemUpdate(request, response);
}

function mongoUpdate(request, response) {
    let id = request.swagger.params.id.value;

    Item.findOne({
        _id: id
    }, function (err, item) {

        // if there is an error retrieving, send the error. nothing after response.send(err) will execute
        if (err) {
            response.status(204).send(err);
        }

        // update item
        if (request.body.title !== null && request.body.title !== '') {
            item.set({title: request.body.title});
        }

        if (request.body.user !== null && request.body.user !== '') {
            item.set({user: request.body.user});
        }

        item.save(function (err, item) {
            if (err) {
                console.log(err);
            } else {
                console.log('saved item with title ' + item.title);
            }
        });

        // return item as json
        response.json({
            success: 1,
            description: 'Item updated',
        });
    });
}

function inmemUpdate(request, response) {

}

function remove(request, response) {
    if (databaseConfig.useMongoDb) mongoRemove(request, response);
    else inmemRemove(request, response);
}

function mongoRemove(request, response) {
    let id = request.swagger.params.id.value;

    Item.remove({_id: id}, function (err) {
        if (err) response.status(204).send(err);
        else response.json({
            success: 1,
            description: 'Item deleted',
        });
    });
}

function inmemRemove(request, response) {

}

module.exports = {
    items,
    find,
    save,
    update,
    remove
};