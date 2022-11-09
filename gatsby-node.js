const { SubsocialApi, generateCrustAuthToken } = require("@subsocial/api");
//const { bnsToIds, idToBn } = require("@subsocial/utils")

exports.onCreateDevServer = async ({ app }) => {
  /* Creating flatSubsocialApi object */
  const api = await SubsocialApi.create({
    substrateNodeUrl,
    ipfsNodeUrl,
  });

  const authHeader = generateCrustAuthToken(
    "bottom drive obey lake curtain smoke basket hold race lonely fit walk//Alice"
  );

  // Data can come from anywhere, but for now create it manually
  api.ipfs.setWriteHeaders({
    authorization: "Basic " + authHeader,
  });

  app.post("/api/spaces", async function (req, res) {
    const cid = await api.ipfs.saveContent({
      about:
        "Subsocial is an open protocol for decentralized social networks and marketplaces. It`s built with Substrate and IPFS",
      image: "Qmasp4JHhQWPkEpXLHFhMAQieAH1wtfVRNHWZ5snhfFeBe", // ipfsImageCid = await api.subsocial.ipfs.saveFile(file)
      name: "Subsocial",
      tags: ["subsocial"],
    });

    const tx = api.substrateApi.tx.spaces.createSpace(IpfsContent(cid), null);
  });

  app.post("/api/posts", async function (req, res) {
    res.send("hello world");

    const cid = await api.ipfs.saveContent({
      body: "Keep up the good work!",
    });

    const tx = api.substrateApi.tx.posts.createPost(
      "1",
      { SharedPost: "1" },
      IpfsContent(cid)
    );
  });
};

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  {
    nodeName,
    typeFetch,
    ipfsUrl,
    substrateNodeUrl,
    ipfsNodeUrl,
    recommendedSpaceIds,
    addressAccount
  }
) => {
  const { createNode } = actions;

  const pushNode = (item, typeNode) => {
    const nodeMeta = {
      ...item.content,
      id: createNodeId(`${item.struct.id}`),
      parent: null,
      children: [],
      internal: {
        type: typeNode || nodeName,
        contentDigest: createContentDigest(item),
        content: JSON.stringify({
          ...item.content,
          id: item.struct.contentId,
        }),
      },
    };

    const node = Object.assign({}, nodeMeta, item);
    createNode(node);
  };

  const spaceByOwner = async (accountId, callback) => {
    const spaceIds = await api.blockchain.spaceIdsByOwner(accountId);
    if (callback) callback(spaceIds);
    return api.base.findSpaces({ ids: spaceIds });
  };

  const postBySpaceId = async (spaceId) => {
    const postIds = await api.blockchain.postIdsBySpaceId(spaceId);
    return api.base.findPosts({ ids: postIds });
  };

  const spacesByProfileAccounts = (accountIds) => {
    return Array.isArray(accountIds)
      ? api.base.findProfileSpaces(accountIds)
      : api.base.findProfileSpace(accountIds);
  };
  
  /* Creating flatSubsocialApi object */
  const api = await SubsocialApi.create({
    substrateNodeUrl,
    ipfsNodeUrl,
  });

  const authHeader = generateCrustAuthToken(
    "bottom drive obey lake curtain smoke basket hold race lonely fit walk//Alice"
  );

  // Data can come from anywhere, but for now create it manually
  api.ipfs.setWriteHeaders({
    authorization: "Basic " + authHeader,
  });

  if (addressAccount) {
    spaceByOwner(addressAccount, (spaceIds) => {
      spaceIds.forEach(spaceId => {
        postBySpaceId(spaceId).then(posts => {
          posts.forEach(post => {
            pushNode(post, 'PostsSubsocial');
          })
        })
      })

    }).then(spaces => {
      spaces.forEach(space => {
        pushNode(space, 'SpacesSubsocial')
      })
    })
  }

  if (recommendedSpaceIds) {
    api.findPublicSpaces(recommendedSpaceIds).then(listSpaces => {
      listSpaces.map(async (item) => {
        //const postsCount = (await api.blockchain.postsCountBySpaceId(struct.id)).toString()
        pushNode(item, 'SpacesSubsocial')        
      });
    });

    
  }
};
