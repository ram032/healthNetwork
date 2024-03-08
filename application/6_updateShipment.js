'use strict';

/**
 * This is a Node.JS application to Update shipping status of an Purchase Order
 */

const helper = require('./contractHelper');

/**
 * @description Module to update shipment status of an PO and ownership of the drug with the new owner information. 
 * @param {*} buyerCRN Unique CRN of buyer who raised PO 
 * @param {*} drugName Name of the drug
 * @param {*} transporterCRN Unique CRN of transporter who is responsible for delivering the drugs with buyer
 * @param {*} organisationRole Role who would be performing this operation, to be sent by client app
 */
async function main(buyerName, buyerCRN, drugName, transporterName, transporterCRN, organisationRole) {

	try {
		const pharmanetContract = await helper.getContractInstance(organisationRole);

		console.log('.....Requesting to update shipment of an PO on the Network');
		const updatedShipmentBuffer = await pharmanetContract.submitTransaction('updateShipment', buyerName, buyerCRN, drugName, transporterName, transporterCRN);

		// process response
		console.log('.....Processing Shipment fof PO Transaction Response \n\n');
		let updatedShipmentObject = JSON.parse(updatedShipmentBuffer.toString());
		console.log(updatedShipmentObject);
		return updatedShipmentObject;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		console.log('.....Disconnecting from Fabric Gateway');
        helper.disconnect();

	}
}

// main("DIST001","Paracetamol","TRA001","transporter").then(() => {
// 	console.log('Shipment updated on the Network');
// });
// main('Dvijay', '0004', 'Amlip', 'BlueDart', '0003', 'Transporter')
// main('Apollo', '0005', 'Amlip', 'BlueDart', '0003', 'Transporter')
module.exports.execute = main;