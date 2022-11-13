const { SubsocialApi, generateCrustAuthToken } = require("@subsocial/api");
//const { bnsToIds, idToBn } = require("@subsocial/utils")

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  {
    nodeName,
    phraseSecret,
    substrateNodeUrl,
    ipfsNodeUrl,
    recommendedSpaceIds,
    addressAccount
  }
) => {
  const { createNode } = actions;

  // Verifica si se pasa phraseSecret
  if (!phraseSecret) return new Error("phraseSecret not found");

  /**
   * function to set data within node gatsby
   * 
   * @param {*} item data object
   * @param {*} typeNode name or type to node
   */
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

  /**
   * space By Owner
   * 
   * @param {*} accountId 
   * @param {*} callback function to set spaceIds list how params 
   * @returns 
   */
  const spaceByOwner = async (accountId, callback) => {
    const spaceIds = await api.blockchain.spaceIdsByOwner(accountId);
    if (callback) callback(spaceIds);
    return api.base.findSpaces({ ids: spaceIds });
  };

  /**
   * posts by spaceId
   * 
   * @param {*} spaceId 
   * @returns 
   */
  const postBySpaceId = async (spaceId) => {
    const postIds = await api.blockchain.postIdsBySpaceId(spaceId);
    return api.base.findPosts({ ids: postIds });
  };

  /**
   * spaces by profile accounts
   * 
   * @param {*} accountIds 
   * @returns 
   */
  const spacesByProfileAccounts = (accountIds) => {  // future implementation
    return Array.isArray(accountIds)
      ? api.base.findProfileSpaces(accountIds)
      : api.base.findProfileSpace(accountIds);
  };
  
  /* Creating flatSubsocialApi object */
  const api = await SubsocialApi.create({
    substrateNodeUrl,
    ipfsNodeUrl,
  });

  const authHeader = generateCrustAuthToken(phraseSecret);

  // Data can come from anywhere, but for now create it manually
  api.ipfs.setWriteHeaders({
    authorization: "Basic " + authHeader,
  });

  // verifica si se pasa addressAccount
  if (addressAccount) {
    // Busca espacios publicos en subsocial y luego seran agregados como nodos a gatsby
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

  // verifica si se pasa los ids recommendedSpaceIds
  if (recommendedSpaceIds) {
    // Busca espacios publicos en subsocial y luego seran agregados como nodos a gatsby
    api.findPublicSpaces(recommendedSpaceIds).then(listSpaces => {
      listSpaces.map(async (item) => {
        //const postsCount = (await api.blockchain.postsCountBySpaceId(struct.id)).toString()
        pushNode(item, 'SpacesSubsocial')        
      });
    });

    
  }
};
