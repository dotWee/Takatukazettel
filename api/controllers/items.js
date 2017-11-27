let ITEMS = new Map();
ITEMS.set(
    '9780201485677', {
        id: '9780201485677',
        title: 'Refactoring: Improving the Design of Existing Code',
        creator: 'Martin Fowler'
    }
);
ITEMS.set(
    '9780132350884', {
        id: '9780132350884',
        title: 'Clean Code: A Handitem of Agile Software Craftsmanship',
        creator: 'Robert C. Martin'
    }
);
ITEMS.set(
    '9780321356680', {
        id: '9780321356680',
        title: 'Effective Java',
        creator: 'Joshua Bloch'
    }
);

function items(request, response) {
    response.json(Array.from(ITEMS.values()));
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