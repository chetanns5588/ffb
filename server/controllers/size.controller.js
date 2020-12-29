var await = require('await');
const db = require('../config/db.config.js');
const Size = db.Sizes;

exports.pushSizesToProduct = async (req, res) => {
	const messages = [];
	const prodId = req.params.prodId;
	await Size.destroy({where: {productId: req.params.prodId}});
    for (const size of req.body) {
		const addSize = await Size.create({
			name: size,
			productId: prodId
		}).catch(err => {
			console.log(err);
			res.json({ msg: 'Error', detail: err });
		});


		if (!addSize) {
			const result = {
				status: "fail",
				name: size,
				message: "Can NOT upload Successfully",
			}

			messages.push(result);
		} else {
			const result = {
				status: "ok",
				name: size,
				message: "Upload Sizes Successfully"
			}

			messages.push(result);
		}
	}

	return res.json(messages);
}

exports.listAllSizes = (req, res) => {
	Size.findAll({
		where: {productId: req.params.prodId},
		order: [['name']]
	}).then(sizes => {
		const sizeInfo = [];
		for (let i = 0; i < sizes.length; i++) {
			sizeInfo.push({
				id: sizes[i].sizeId,
				name: sizes[i].name
			})
		}
		res.json(sizeInfo);
	}).catch(err => {
		console.log(err);
		res.json({ msg: 'Error', detail: err });
	});
}