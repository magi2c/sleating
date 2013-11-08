'use strict';

var mysql      = require('mysql');
var events     = require('events');
var EventEmitter = events.EventEmitter;
var ee = new EventEmitter();



var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'noticias'
});

var poolWp  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'noticias_wp'
});


var numQuerys = 0;
var numArticlesProsWp = 0;

pool.getConnection(function(err, conn) {

    getArticles(conn, function(err, results) {

        poolWp.getConnection(function(errWp, connWp) {

        results.forEach(function(article) {

            setWpPost(connWp, article)
                .on('result', function(result) {
                    var wpPostId = result.insertId;

                    // Category
                    getArticleCategories(conn, article['id'])
                        .on('result', function(result) {

                            console.log(result);
                            process.exit(0);
                            //ToDo setWpTerm

                            ee.emit('queryAdd');
                            var sqlWp = connWp.query("SELECT 2 + 2 AS solution");
                            sqlWp.on('result', function(result) {console.log("Successful insertion2!");});
                            sqlWp.on('end', function() { ee.emit('querySub'); });

                        })
                        .on('error', function(err) {throw err;});

//                    // Comments
//                    getArticleComments(conn, article['id'])
//                        .on('fields', function(fields) {
//
//                            var sqlWp = connWp.query("SELECT 2 + 2 AS solution");
//                            sqlWp.on('fields', function(result) {console.log("Successful insertion2!");});
//                            sqlWp.on('end', function() { ee.emit('endLoopWp'); });
//
//                        })
//                        .on('error', function(err) {throw err;});





                })
                .on('error', function(err) {throw err;});



            });

        });


    });





});


///////////////////////////// events ////////////////


ee.on('queryAdd', function(){
    numQuerys ++;
    console.log('queryAdd ' + numQuerys);
});


ee.on('querySub', function(){
    numQuerys --;
    console.log('querySub ' + numQuerys);
    if (0 == numQuerys) {
        poolWp.end();
        pool.end();
    }
});

/////////////////////////// functions //////////

function getArticles(conn, callback) {
    var query = 'SELECT *  FROM articles as a' +
//' LEFT JOIN category_relations as cr on cr.related_object_id = a.id' +
//' LEFT JOIN categories as c on c.id = cr.category_id' +
        ' ORDER BY a.id LIMIT 1';
    conn.query(query, callback);
}

function getArticleCategories(conn, articleId) {
    console.log("getArticleCategories " + articleId);
    var querys = ' SELECT  *  FROM category_relations as c' +
        ' WHERE related_object_id = ' + articleId + ';'
    ;
    return conn.query(querys);
}

function getArticleComments(conn, articleId) {
    console.log("getArticleComments " + articleId);
    var querys = ' SELECT  *  FROM  comments as c' +
            ' WHERE article_id = ' + articleId + ';'
        ;
    return conn.query(querys);
}


function setWpPost(conn, article) {
    console.log("setWpPost " + article['id']);
    //console.log(article);

    var post = {
        post_date: article['published_at'],
        post_content: '<div class="description">' + article['description'] + '</div>' + article['text'],
        post_title: article['name']
    };

    return conn.query("SELECT 2 + 2 AS solution");
    return conn.query('INSERT INTO wp_posts SET ?', post);
}

function setWpTerm(conn, category) {
    console.log("setWpPost " + category['id']);
    ee.emit('queryAdd');

    var param = {
        name: categoty['name'],
        slug: categoty['name']
    };

    return conn.query("SELECT 2 + 2 AS solution");
    return conn.query('INSERT INTO  wp_terms SET ?', param);
}

