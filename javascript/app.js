(function(){
    var app = angular.module('bookStore', []);

    app.controller('BookController', ['$http', function($http){
        var book = this;
        book.bookData = {};
        $http.get('./bookdata.json').success(function(data){
            book.bookData = data;
            book.publicationDate = new Date(data.publication_date)
            book.productOptions = data.products.slice(1, 3);
            book.optionPrice = book.productOptions[0].price;
        });

        this.formatProductLabel = function(product) {
            return product.type + ", " + book.publicationDate.getFullYear()
            + ", $" + product.price;
        };
    }]);
})();
