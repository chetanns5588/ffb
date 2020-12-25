var await = require('await');
const db = require('../config/db.config.js');
const File = db.Files;

exports.uploadFiles = async (req, res) => {
	const messages = [];
	const prodId = req.params.prodId;
	await File.destroy({where: {productId: req.params.prodId}});
	for (const file of req.files) {
		const uploadfile = await File.create({
			type: file.mimetype,
			name: file.originalname,
			path: file.path,
			productId: prodId
		}).catch(err => {
			console.log(err);
			res.json({ msg: 'Error', detail: err });
		});


		if (!uploadfile) {
			const result = {
				status: "fail",
				filename: file.originalname,
				message: "Can NOT upload Successfully",
			}

			messages.push(result);
		} else {
			const result = {
				status: "ok",
				filename: file.originalname,
				message: "Upload Successfully!"
			}

			messages.push(result);
		}
	}

	return res.json(messages);
}

exports.updateUploadFiles = async (req, res) => {
	const messages = [];
	File.destroy({where: {productId: req.params.prodId}});
	return res.json(messages);
}

exports.listAllFiles = (req, res) => {
	File.findAll({
		where: {productId: req.params.prodId},
		order: [['name']]
	}).then(files => {
		const fileInfo = [];
		for (let i = 0; i < files.length; i++) {
			fileInfo.push({
				id: files[i].fileId,
				filename: files[i].name,
				path: req.params.prodId + '/' + files[i].name
			})
		}
		res.json(fileInfo);
	}).catch(err => {
		console.log(err);
		res.json({ msg: 'Error', detail: err });
	});
}