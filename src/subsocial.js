const {
  SubsocialApi,
  generateCrustAuthToken,
  getSubstrateApi,
} = require("@subsocial/api")

let _instance = null

class SubsocialConnector {

  static async connect(config) {
    const { substrateNodeUrl, ipfsNodeUrl } = config
    _instance = await SubsocialApi.create({
      substrateNodeUrl,
      ipfsNodeUrl,
    })

    const authHeader = generateCrustAuthToken(
      "bottom drive obey lake curtain smoke basket hold race lonely fit walk//Alice"
    )

    // Data can come from anywhere, but for now create it manually
    _instance.ipfs.setWriteHeaders({
      authorization: "Basic " + authHeader,
    })
    SubsocialConnector._instance = _instance;
    return SubsocialConnector._instance
  }

  async getSpaces() {
    const spaceId = 1
    const space = await _instance.findSpace({ id: spaceId })
    return space
  }

  async getPosts() {}
}

module.exports = SubsocialConnector;