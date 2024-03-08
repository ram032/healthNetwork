'use strict';

/**
 * This is a Node.JS application to view current status of an drug
 */

const helper = require('./contractHelper');

/**
 * @description Module to view current status of an drug at anytime an organsation wants to see
 * @param {*} drugName Name of the drug
 * @param {*} serialNo Serial no. (batch) of the drug for which the status to be retrieved
 * @param {*} organisationRole Orgnisation who wants to view current status of an drug
 */
async function main(drugName, serialNo, organisationRole) {

	try {
		const pharmanetContract = await helper.getContractInstance(organisationRole);

		console.log('.....Requesting to view current status of drug on the Network');
		const drugCurrentStateBuffer = await pharmanetContract.submitTransaction('viewDrugCurrentState', drugName, serialNo);

		// process response
		console.log('.....Processing view current drug status Transaction Response \n\n');
		let drugCurrentState = JSON.parse(drugCurrentStateBuffer.toString());
		console.log(drugCurrentState);
		return drugCurrentState;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		console.log('.....Disconnecting from Fabric Gateway');
        helper.disconnect();

	}
}

// main("medicine4","serial5","consumer").then(() => {
// 	console.log('Shipment updated on the Network');
// });
// main("Amlip", "CIP003", "Retailer")
module.exports.execute = main;