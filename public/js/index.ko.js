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