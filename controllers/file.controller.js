const File = require('../models/File')

exports.upload = async (req, res, next) => {
    const { name, size, url, startTime, endTime } = req.body;
    var file = new File({ name, size, url, startTime, endTime })


    file.save()
        .then(function () {
            console.log('File successfully uploaded: ', file.toJSON());
            return res.json({ file: file.toJSON() })
        })
        .catch(next)
}

exports.getAll = async (req, res, next) => {
    File.find(
        {},
        null,
        {
            sort: { createdAt: 1 }
        },
        (err, files) => {
            if (err) {
                return next(err);
            }
            res.status(200).send({
                files: files.map(function (file) {
                    return file.toJSON();
                }),
                filesCount: files.length
            });
        }
    );
}

exports.getOne = async (req, res, next) => {
    File.findById(req.params.id, (err, file) => {
        if (err) {
            return next(err);
        }
        res.json({ file: file.toJSON() });
    });
}