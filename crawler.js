var request = require("request");
var cheerio = require('cheerio');

module.exports = {
    init: function() {
        this.index = {};
    },

    crawl: function(url) {
        console.log(url);
        var t = this;

        request({uri: url},
            function(error, response, body) {
                // ignore errors for now
                $ = cheerio.load(body);
                var links = $('a'); //jquery get all hyperlinks
                // split title to tokens
                var title = $("title").text();
                var tokens = title.split(" ");
                tokens.each(function(x) {
                    t.index[x] = url;
                });

                $(links).each(function(i, link){
                    // push the link to the queue
                    t.crawl(url + '/' + $(link).attr('href'));
                });
            });
    }

}