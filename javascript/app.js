(function(){
    var app = angular.module('bookStore', []);

    app.controller('BookController', ['$http', function($http){
        var book = this;
        book.bookData = {};

        $http.get('./bookdata.json').success(function(data){
            book.bookData = data;
            book.publicationDate = new Date(data.publication_date);
            book.productOptions = data.products.slice(1, 3);
            book.optionPrice = book.productOptions[0].price;
            book.startRotator(data.quotes);
        });

        this.formatProductLabel = function(product) {
            return product.type + ", " + book.publicationDate.getFullYear()
            + ", $" + product.price;
        };

        this.startRotator = function(quotes) {
            $('.rotator').html(quotes[0])
            .data('intervalLink', window.setInterval(rotate, 6000));
            var i = 1;
            function rotate() {
                var message = quotes[i];
                $('.rotator')
                    .animate({opacity: 0}, 1000, function(){$(this).html(message);})
                    .animate({opacity: 1}, 1000);
                i++; if (i == quotes.length) i = 0;
            }
        }
    }]);
})();
