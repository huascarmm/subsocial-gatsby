const {
  SubsocialApi,
  generateCrustAuthToken,
} = require("@subsocial/api")
//const { bnsToIds, idToBn } = require("@subsocial/utils")

let api;

exports.onPreInit = async ({ actions }, { ipfsNodeUrl, substrateNodeUrl }) => {
  // store job creation action to use it later
  /* Creating flatSubsocialApi object */
  api = await SubsocialApi.create({
    substrateNodeUrl,
    ipfsNodeUrl,
  })

  const authHeader = generateCrustAuthToken(
    "bottom drive obey lake curtain smoke basket hold race lonely fit walk//Alice"
  )

  // Data can come from anywhere, but for now create it manually
  api.ipfs.setWriteHeaders({
    authorization: "Basic " + authHeader,
  })
}

exports.onCreateDevServer = async ({ app }) => {
  app.post("/api/spaces", async function (req, res) {
    const cid = await api.ipfs.saveContent({
      about:
        "Subsocial is an open protocol for decentralized social networks and marketplaces. It`s built with Substrate and IPFS",
      image: "Qmasp4JHhQWPkEpXLHFhMAQieAH1wtfVRNHWZ5snhfFeBe", // ipfsImageCid = await api.subsocial.ipfs.saveFile(file)
      name: "Subsocial",
      tags: ["subsocial"],
    })

    const tx = api.substrateApi.tx.spaces.createSpace(IpfsContent(cid), null)
  })

  app.post("/api/posts", async function (req, res) {
    res.send("hello world")

    const cid = await api.ipfs.saveContent({
      body: "Keep up the good work!",
    })

    const tx = api.substrateApi.tx.posts.createPost(
      "1",
      { SharedPost: "1" },
      IpfsContent(cid)
    )
  })
}

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  { appName, ipfsUrl, substrateNodeUrl, ipfsNodeUrl, recommendedSpaceIds }
) => {
  const { createNode } = actions

  if (recommendedSpaceIds) {
  const listSpaces = await api.findPublicSpaces(recommendedSpaceIds)
  console.log(listSpaces)

  listSpaces.map(async item => {
    //const postsCount = (await api.blockchain.postsCountBySpaceId(struct.id)).toString()

    const nodeMeta = {
      ...item.content,
      id: createNodeId(`${item.struct.id}`),
      parent: null,
      children: [],
      internal: {
        type: `MyNodeTypeSpace`,
        contentDigest: createContentDigest(item),
        content: JSON.stringify({
          ...item.content,
          id: item.struct.contentId,
        }),
      },
    }

    const node = Object.assign({}, nodeMeta, item)
    createNode(node)

    //return {...content, id : struct.contentId};
  })

  // const entities = await Promise.all(entitiesPromise);
  // console.log(entities)

  // // Subsocial's space id.
  // const spaceId = 1

  // // Find space by id.
  // const space = await api.findSpace({ id: spaceId })

  // const nodeContent = JSON.stringify(space)

  // const nodeMeta = {
  //   id: createNodeId(`${space.id}`),
  //   parent: null,
  //   children: [],
  //   internal: {
  //     type: `MyNodeTypeSpace`,
  //     contentDigest: createContentDigest(space),
  //   },
  // }

  // const node = Object.assign({}, nodeMeta, space)
  // createNode(node)
  } else {
    const item = await api.findSpace({ id: '1' });
    console.log(item);
    const nodeMeta = {
      ...item.content,
      id: createNodeId(`${item.struct.id}`),
      parent: null,
      children: [],
      internal: {
        type: `MyNodeTypeSpace`,
        contentDigest: createContentDigest(item),
        content: JSON.stringify({
          ...item.content,
          id: item.struct.contentId,
        }),
      },
    }

    const node = Object.assign({}, nodeMeta, item)
    createNode(node)
  }
}
