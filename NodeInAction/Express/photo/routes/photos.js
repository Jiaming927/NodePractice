var photos = [];
var path = require('path');
var Photo = require('../models/Photo');
var fs = require('fs');
var join = path.join;

photos.push({
    name: 'Node.js Logo',
    path: 'http://nodejs.org/images/logos/nodejs-green.png'
});

photos.push({
    name: 'Ryan Speaking',
    path: 'http://nodejs.org/images/ryan-speaker.jpg'
});

exports.list = function(req, res) {
    Photo.find({}, function(err, photos) {
        if (err) return next(err);
        res.render('photos', {
            title: 'Photos',
            photos: photos
        });
    });
};;

exports.form = function(req, res) {
    res.render('photos/upload', {
        title: 'Photo upload'
    });
};

exports.submit = function(dir) {
    return function(req, res) {
        // var img = req.files.photo.image;
        // var name = req.body.photo.name || img.name;
        req.pipe(req.busboy);
        console.log("something");
        req.busboy.on('file', function(fieldname, file, filename) {
            var path = join(dir, filename);
            fs.rename(file.path, path, function(err) {
                if (err) return next(err);
                Photo.create({
                    name: name,
                    path: img.name
                }, function(err) {
                    if (err) return next(err);
                    res.redirect('/');
                });
            });
        });
    };
};

exports.download = function(req, res) {
        var ppath = path.resolve('public/images/bb.jpg');
        console.log(ppath);
        //res.sendfile(ppath); This will show the file
        res.download(ppath, 'bb.jpg');
}
