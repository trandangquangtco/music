const path = require('path')
const fs = require('fs')
const express = require('express')
const publicFile = (app) => {
	const listFolder = fs.readdirSync(path.join(__dirname, "../../uploads/"))
	for (let name of listFolder) {
		const chilFolder = fs.readdirSync(path.join(__dirname, `../../uploads/${ name }`))
		for (let nameChil of chilFolder) {
			let publics = "/uploads"
			if (nameChil != "horror") publics = "/uploads/song"
			app.use(publics, express.static(path.join(__dirname, `../../uploads/${ name }/${ nameChil }`)));
		}
	}
}
module.exports = publicFile