'use strict';

/**
 * This is a Node.JS application to Register a company into the network through wallet identity
 */

const helper = require('./contractHelper');

/**
 * @description Register company into the network through wallet identify
 * @param {*} companyCRN Unique registration number of company to be registered
 * @param {*} companyName Name of the company to be registered
 * @param {*} location Location of the company
 * @param {*} organisationRole Dynamic orgsation role parameter sent by client app, on which the company to be registered
 */
async function main(companyCRN, companyName, location, organisationRole) {

	try {
		const pharmanetContract = await helper.getContractInstance(organisationRole);

		console.log('.....Requesting to create a New company on the Network');
		const newCompanyBuffer = await pharmanetContract.submitTransaction('registerCompany', companyCRN, companyName, location, organisationRole);

		// process response
		console.log('.....Processing Approve New Company Transaction Response \n\n');
		let newCompany = JSON.parse(newCompanyBuffer.toString());
		console.log(newCompany);
		console.log("\n\n.....Register New Company Transaction Complete!");
		return newCompany;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
        console.log('.....Disconnecting from Fabric Gateway');
		helper.disconnect();

	}
}

// main("1234567897", 'company7', 'Bangalore1', 'transporter').then(() => {
// 	console.log('Company registered on the Network');
// });

module.exports.execute = main;
// main("0002", 'Cipla', 'Mumbai', 'Manufacturer');
// main("0004", 'Dvijay', 'Nasik', 'Distributor');
// main("0003", 'BlueDart', 'Mumbai', 'Transporter');
// main("0005", "Apollo", "Delhi", "Retailer");