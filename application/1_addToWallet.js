'use strict';

/**
 * This is a Node.JS module to load a user's Identity to his wallet.
 * This Identity will be used to sign transactions initiated by this user.
 * Defaults:
 *  User Name: ORG1_ADMIN
 *  User Organization: ORG1
 *  User Role: Admin
 *
 */

const fs = require('fs'); // FileSystem Library
const { Wallets} = require('fabric-network'); // Wallet Library provided by Fabric

async function main(certificatePath, privateKeyPath, organisationRole) {
	
	// Main try/catch block
	try {
		
		// A wallet is a filesystem path that stores a collection of Identities
		const wallet = await Wallets.newFileSystemWallet('./identity/'+ organisationRole.toLowerCase());
		
		// Fetch the credentials from our previously generated Crypto Materials required to create this user's identity
		const certificate = fs.readFileSync(certificatePath).toString();
		const privatekey = fs.readFileSync(privateKeyPath).toString();
		
		// Load credentials into wallet
		const identityLabel = organisationRole.toUpperCase()+'_ADMIN';
		const identity = {
			credentials: {
				certificate: certificate,
				privateKey: privatekey
			},
			mspId: organisationRole.toLowerCase()+'MSP',
			type: 'X.509'
		};
		
		await wallet.put(identityLabel, identity);
        console.log("Successfully added Identity to the wallet");
		
	} catch (error) {
		console.log(`Error adding to wallet. ${error}`);
		console.log(error.stack);
		throw new Error(error);
	}
}

// const certificatePath = '/home/ram/pharma-network/network/organizations/peerOrganizations/manufacturer.pharma-network.com/users/Admin@manufacturer.pharma-network.com/msp/signcerts/Admin@manufacturer.pharma-network.com-cert.pem';
// const privateKeyPath = '/home/ram/pharma-network/network/organizations/peerOrganizations/manufacturer.pharma-network.com/users/Admin@manufacturer.pharma-network.com/msp/keystore/priv_sk';

// const certificatePath = '/home/ram/drugProject/network/organizations/peerOrganizations/manufacturer.pharma-network.com/users/Admin@manufacturer.pharma-network.com/msp/signcerts/cert.pem';
// const privateKeyPath = '/home/ram/drugProject/network/organizations/peerOrganizations/manufacturer.pharma-network.com/users/Admin@manufacturer.pharma-network.com/msp/keystore/b3f8d83adadec6203e6ffbe5c7275a1496612a5a64f56a03a6c34fb24d1487a5_sk';
// main(certificatePath, privateKeyPath, "Manufacturer");

// const certificatePath = '/home/ram/drugProject/network/organizations/peerOrganizations/transporter.pharma-network.com/users/Admin@transporter.pharma-network.com/msp/signcerts/cert.pem';
// const privateKeyPath = '/home/ram/drugProject/network/organizations/peerOrganizations/transporter.pharma-network.com/users/Admin@transporter.pharma-network.com/msp/keystore/9bd305567d8e68a82648452f0e0c782907275368311a2482d9bc935a6781eb09_sk';
// main(certificatePath, privateKeyPath, "Transporter");

// const certificatePath = '/home/ram/drugProject/network/organizations/peerOrganizations/distributor.pharma-network.com/users/Admin@distributor.pharma-network.com/msp/signcerts/cert.pem';
// const privateKeyPath = '/home/ram/drugProject/network/organizations/peerOrganizations/distributor.pharma-network.com/users/Admin@distributor.pharma-network.com/msp/keystore/611ee967b41dd4b6a1dedfcad359b06f4b7baa7f387a978916dc155340ec9387_sk';
// main(certificatePath, privateKeyPath, "Distributor");

// const certificatePath = '/home/ram/drugProject/network/organizations/peerOrganizations/retailer.pharma-network.com/users/Admin@retailer.pharma-network.com/msp/signcerts/cert.pem';
// const privateKeyPath = '/home/ram/drugProject/network/organizations/peerOrganizations/retailer.pharma-network.com/users/Admin@retailer.pharma-network.com/msp/keystore/eaec62737ba5a22bca87dce402d9bb045f4d0d1e71b2fe91ec58682cb1faf6f6_sk';
// main(certificatePath, privateKeyPath, "Retailer");

// const certificatePath = '/home/ram/drugProject/network/organizations/peerOrganizations/consumer.pharma-network.com/users/Admin@consumer.pharma-network.com/msp/signcerts/cert.pem';
// const privateKeyPath = '/home/ram/drugProject/network/organizations/peerOrganizations/consumer.pharma-network.com/users/Admin@consumer.pharma-network.com/msp/keystore/13da14eeb87314d0eb89d5e81e75d367d970d29078f0d4a8fd41c86d1dcad9e7_sk';
// main(certificatePath, privateKeyPath, "Consumer");

module.exports.execute = main;