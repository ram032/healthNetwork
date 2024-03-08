'use strict';

/**
 * This is a Node.JS application to view history of an medicine on the network
 */

const helper = require('./contractHelper');

/**
 * @description Module to view complete history of an drug on the network
 * @param {*} drugName Name of the drug
 * @param {*} serialNo Senrial no. (batch) of the drug
 * @param {*} organisationRole Organisation name who wants to view history of an drug
 */
async function main(drugName, serialNo, organisationRole) {

	try {
		const pharmanetContract = await helper.getContractInstance(organisationRole);

		console.log('.....Requesting to view history on the Network');
		const viewHistoryBuffer = await pharmanetContract.submitTransaction('viewHistory', drugName, serialNo);

		// process response
		console.log('.....Processing view history of  Drug Transaction Response \n\n');
		let viewHistoryObject = JSON.parse(viewHistoryBuffer.toString());
		console.log(viewHistoryObject);
		return viewHistoryObject;

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
// main('Amlip', 'CIP003', 'Consumer')
module.exports.execute = main;