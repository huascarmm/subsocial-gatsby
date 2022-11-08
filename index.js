const Service = require('./src/subsocial');

Service.connect({
    substrateNodeUrl: `wss://westend.api.onfinality.io`,
    ipfsNodeUrl: `https://staging.subsocial.network/ipfs`,
}).then(async connector => {    
  const spaces = await connector.getSpaces()
  console.log(spaces)
})