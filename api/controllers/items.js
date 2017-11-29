var Zettel = require('../helpers/zettel');

function items(request, response) {
  Zettel.find(function (err, items) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err) {
      res.send(err);
    }

    // return all items as json
    res.json(items);
  });
}

function find(request, response) {
  const id = request.swagger.params.id.value;

  Zettel.findOne({
    _id: id
  }, function (err, item) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err) {
      res.send(err);
    }

    // return item as json
    res.json(item);
  });
}

function save(request, response) {
  var item = new Item({
    title: request.body.title,
    user: request.body.user
  });

  item.save(function (err, item) {
    if (err) {
      console.log(err);
    } else {
      console.log('saved item with title ' + item.title);
    }
  });

  response.json({
    success: 1,
    description: 'Item saved',
  });
}

function update(request, response) {
  const id = request.swagger.params.id.value;

  Zettel.findOne({
    _id: id
  }, function (err, item) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err) {
      res.status(204).send(err);
    }

    // update item
    item.title = request.body.title;
    item.title = request.body.user;
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

function remove(request, response) {
  const id = request.swagger.params.id.value;
  const deleted = ITEMS.delete(id);
  if (deleted) {
    response.json({
      success: 1,
      description: 'Item deleted',
    });
  } else {
    response.status(204).send();
  }
}

module.exports = {
  items,
  find,
  save,
  update,
  remove
};