'use strict';

/**
 * This is a Node.JS application to create shipment for an PO
 */

const helper = require('./contractHelper');

/**
 * @description Module to create an shipment request for a particular PO raised either by Distributor or Retailer. After this transaction the owner of the drugs will be Transporter who will be shipping these drugs.
 * @param {*} buyerCRN Unique CRN of buyer (either distributor or retailer) who has raised PO
 * @param {*} drugName Drug name which needs to be shipped
 * @param {*} listOfAssets List of serial numbers to be shipped
 * @param {*} transporterCRN Unique CRN of transporter who will be shipping this to buyer location
 * @param {*} organisationRole Sent by client app who initiates this transaction, i.e. either distributor or retailer
 */
async function main(buyerCRN, drugName, listOfAssets, transporterName, transporterCRN, organisationRole) {

	try {
		console.log(listOfAssets);
		const pharmanetContract = await helper.getContractInstance(organisationRole);
		
		console.log('.....Requesting to create shipment for an PO on the Network');
		const newShipmentBuffer = await pharmanetContract.submitTransaction('createShipment', buyerCRN, drugName, listOfAssets, transporterName, transporterCRN);

		// process response
		console.log('.....Processing Create Shipment Transaction Response \n\n');
		let newShipment = JSON.parse(newShipmentBuffer.toString());
		console.log(newShipment);
		return newShipment;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		console.log('.....Disconnecting from Fabric Gateway');
        helper.disconnect();

	}
}

// main("DIST001","Paracetamol","001,002,003","TRA001","manufacturer").then(() => {
// 	console.log('Shipment added on the Network');
// });
// main('0004', 'Amlip', 'CIP001,CIP002,CIP003,CIP004,CIP005', 'BlueDart', '0003', 'Manufacturer')
// main('0005', 'Amlip', 'CIP001,CIP002,CIP003,CIP004,CIP005', 'BlueDart', '0003', 'Distributor')

module.exports.execute = main;