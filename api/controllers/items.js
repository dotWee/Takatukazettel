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
    if (ITEMS.has(id)) {
        const item = ITEMS.get(id);
        response.json(item);
    } else {
        response.status(204).send();
    }
}

function save(request, response) {
    const item = request.body;
    ITEMS.set(item.id, item);
    response.json({
        success: 1,
        description: 'Item saved',
    });
}

function update(request, response) {
    const id = request.swagger.params.id.value;
    if(ITEMS.has(id)) {
      const item = ITEMS.get(id);
      const itemUpdate = request.body;
      ITEMS.set(id, itemUpdate);
      response.json(
        {
          success: 1,
          description: 'Item updated',
        }
      );
    } else {
      response.status(204).send();
    }
  }

  function remove(request, response) {
    const id = request.swagger.params.id.value;
    const deleted = ITEMS.delete(id);
    if(deleted) {
      response.json(
        {
          success: 1,
          description: 'Item deleted',
        }
      );
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