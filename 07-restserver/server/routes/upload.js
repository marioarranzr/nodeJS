const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const User = require('../model/user');

// default options
app.use(fileUpload());

app.put('/upload/:type/:id', function(req, res) {

    let type = req.params.type;
    let id = req.params.id;

    let validTypes = ['users', 'products'];
    if (validTypes.indexOf(type) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'The valid types are ' + validTypes.join(', '),
                type
            }

        });
    }

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No files were uploaded'
            }
        });
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let file = req.files.file;

    let validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    let fileName = file.name.split('.');
    let extension = fileName[fileName.length - 1];

    if (validExtensions.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'The valid extensions are ' + validExtensions.join(', '),
                extension
            }

        });
    }

    // Change file name
    fileName = `${id}-${new Date().getMilliseconds()}.${extension}`;

    // Use the mv() method to place the file somewhere on your server
    file.mv(`uploads/${type}/${fileName}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'No files were uploaded'
                }
            });
        }

        res.json({
            ok: true,
            message: 'File uploaded'
        });
    });
});


module.exports = app;