let endpoint = "/items";

function ItemModel(data) {
    var self = this;
    self._id = ko.observable("");
    self.title = ko.observable("");
    self.user = ko.observable("");

    if (!!data) {
        self._id(data._id);
        self.title(data.title);
        self.user(data.user);
    }
}

function IndexModel() {
    var self = this;

    self.items = ko.observableArray([]);
    self.currentItem = ko.observable(new ItemModel());

    // Load items
    self.refreshList = function (endpointParam = "") {

        // Clear old array
        self.items.removeAll();

        var xreq = new XMLHttpRequest();
        xreq.addEventListener("load", function (data) {
            var itemArray = JSON.parse(data.target.responseText);
            console.log("Pulled " + itemArray.length + " items");

            // Add each item to local array
            JSON.parse(data.target.responseText).forEach(function (element) {
                self.items.push(new ItemModel(element));
            }, this);

            console.log("Loaded " + self.items().length + " items into the view");
            ko.applyBindings(self);
        });
        xreq.open("GET", endpoint + endpointParam);
        xreq.setRequestHeader("Content-type", "application/json");
        xreq.send();
    };

    self.refreshList();

    self.addItem = function () {
        console.log("Create new item with values: " + ko.toJSON(self.currentItem));

        var xreq = new XMLHttpRequest();
        xreq.addEventListener("load", function (data) {
            self.refreshList();
        });
        xreq.open("POST", endpoint);
        xreq.setRequestHeader("Content-type", "application/json");
        xreq.send(ko.toJSON(self.currentItem));
    };

    self.removeItem = function (item) {
        console.log("Delete item with id " + item._id());
        var xreq = new XMLHttpRequest();
        
        xreq.addEventListener("load", function (data) {
            self.items.destroy(item);
        });
        xreq.open("DELETE", endpoint + "/" + item._id());
        xreq.setRequestHeader("Content-type", "application/json");
        xreq.send(ko.toJSON(item._id()));
    };

    self.removeAllItems = function () {
        console.log("Delete all items");
        self.items().forEach(function(item) {
            self.removeItem(item);
        });
    };
}

var localModel = new IndexModel();