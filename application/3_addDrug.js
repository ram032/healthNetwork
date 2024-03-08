'use strict';

/**
 * This is a Node.JS application to add new drug on the Network
 */

const helper = require('./contractHelper');

/**
 * @description Module to add new drug on the network as requested by manufacturer. 
 * @param {*} drugName Name of the drug
 * @param {*} serialNo Unique serial (batch) no of the drug
 * @param {*} mfgDate  Manufactured date
 * @param {*} expDate expire date
 * @param {*} companyCRN Manufacturer company registration number who manufactures and add it in the network for selling
 * @param {*} organisationRole Organisation role received from client app. If any other organisation other than manufacturer is sent, error will be thrown. 
 */
async function main(drugName, serialNo, mfgDate, expDate, companyName, companyCRN, organisationRole) {

	try {
		const pharmanetContract = await helper.getContractInstance(organisationRole);

		console.log('.....Requesting to create a New drug on the Network');
		const newDrugBuffer = await pharmanetContract.submitTransaction('addDrug', drugName, serialNo, mfgDate, expDate, companyName, companyCRN);

		// process response
		console.log('.....Processing Approve New Drug Transaction Response \n\n');
		let newDrug = JSON.parse(newDrugBuffer.toString());
		console.log(newDrug);
		return newDrug;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
        console.log('.....Disconnecting from Fabric Gateway');
		helper.disconnect();

	}
}

// main("medicine4", 'serial5', '02152020', '02152022','1234567895','manufacturer').then(() => {
// 	console.log('Drug added on the Network');
// });
// main("Amlip", 'CIP006', '01/02/2023', '01/02/2025', 'Cipla', '0002', 'Manufacturer')
module.exports.execute = main;