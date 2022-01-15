
var exec = require('child_process').exec;
const fs = require('fs')
const path = require('path')
require('dotenv').config()
const run = () => {

	var Natural_Anh = exec(`cat ${ path.join(__dirname, "Natural_Anh.sql") }| docker exec -i ${ process.env.MYSQL_CONTAINER_NAME } /usr/bin/mysql -u root --password=${ process.env.MYSQL_ROOT_PASSWORD } ${ process.env.MYSQL_DATABASE }`)
	var Horror_Household = exec(`cat ${ path.join(__dirname, "Horror_Household_An.sql") }| docker exec -i ${ process.env.MYSQL_CONTAINER_NAME } /usr/bin/mysql -u root --password=${ process.env.MYSQL_ROOT_PASSWORD } ${ process.env.MYSQL_DATABASE }`)
	var TECHNOLOGY_DIEN = exec(`cat ${ path.join(__dirname, "TECHNOLOGY_DIEN.sql") }| docker exec -i ${ process.env.MYSQL_CONTAINER_NAME } /usr/bin/mysql -u root --password=${ process.env.MYSQL_ROOT_PASSWORD } ${ process.env.MYSQL_DATABASE }`)
	var Thu_sound_design = exec(`cat ${ path.join(__dirname, "Thu_sound_design.sql") }| docker exec -i ${ process.env.MYSQL_CONTAINER_NAME } /usr/bin/mysql -u root --password=${ process.env.MYSQL_ROOT_PASSWORD } ${ process.env.MYSQL_DATABASE }`)
	Natural_Anh.on('close', (error, stdout, stderr) => {
		console.log(`Natural_Anh stdout: ${ stdout }`);
		console.log(`stderr: ${ stderr }`);
		if (error !== null) {
			console.log(`exec error: ${ error }`);
		}
	})
	Horror_Household.on('close', (error, stdout, stderr) => {
		console.log(`Horror_Household stdout: ${ stdout }`);
		console.log(`stderr: ${ stderr }`);
		if (error !== null) {
			console.log(`exec error: ${ error }`);
		}
	})
	TECHNOLOGY_DIEN.on('close', (error, stdout, stderr) => {
		console.log(`TECHNOLOGY_DIEN stdout: ${ stdout }`);
		console.log(`stderr: ${ stderr }`);
		if (error !== null) {
			console.log(`exec error: ${ error }`);
		}
	})
	Thu_sound_design.on('close', (error, stdout, stderr) => {
		console.log(`Thu_sound_design stdout: ${ stdout }`);
		console.log(`stderr: ${ stderr }`);
		if (error !== null) {
			console.log(`exec error: ${ error }`);
		}
	})
}
run()