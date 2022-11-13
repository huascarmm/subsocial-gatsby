## **1. Bounty Category**

Subsocial Ghost/Gatsby

## **2. Github link**

https://github.com/huascarmm/subsocial-gatsby

## **3. Video link**

## **4. Description**

This is a plugin to get data from sub social and implement in gatsby and ghost

## **5. Developer**

Huáscar Miranda. - [huascarm@gmail.com](mailto:huascarm@gmail.com) - [https://github.com/huascarmm](https://github.com/huascarmm)

## **6.Project.**

Subsocial Plugin for Ghost/Gatsby

## **7. Problem**

Need of a plugin for gatsby/ghost to get data

## **8.How to use in gatsby**

#### Step1: Setup gatsby-config.js

Setup the file with these params:

- substrateNodeUrl: subsocial websocket
- ipfsNodeUrl : ipfs url
- recommendedSpaceIds : Array of spaces
- addressAccount : subsocial address

For example

```
{
	resolve: `gatsby-source-subsocial`,
	options: {
    phraseSecret: 'hello world',
    substrateNodeUrl: `wss://para.subsocial.network`,
    ipfsNodeUrl: `https://app.subsocial.network/ipfs`,
    recommendedSpaceIds: ["1", "1001", "1002", "10316"],
    addressAccount: "3sD7b8HxT2rg8SNhgZZcgG3bSffVLq5drAvDqDfM8CJ6SU6x"
	},
},
```

#### Step2: GraphQl requests in components

You have to build your query and make graphql requests according your software arquitecture

For example:

```js
...
export const query = graphql`
  query {
    allSpacesSubsocial {
      edges {
        node {
          id
          content {
            name
            tags
            about
            email
            image
            links
            summary
            isShowMore
          }
        }
      }
    }
  }
`
```

#### Step3: Ghost credentials

Setup Ghost credentials in gatsby-config.js

- apiUrl : your ghost page url
- contentApiKey : apikey generated from ghost
- version : by default `v5.0`

For example:

```
{
  apiUrl: `https://subsocial.ghost.io`,
  contentApiKey: `xxxxxxxxxx`,
  version: `v5.0`
}
```

## **9. Technology**

We are implementing a plugin in npm for gatsby.
Using javascript, react, gatsby.

Link NPM: [https://www.npmjs.com/package/gatsby-source-subsocial](https://www.npmjs.com/package/gatsby-source-subsocial)

## **10. Project demo**

[https://github.com/huascarmm/subsocial-gatsby-example](https://github.com/huascarmm/subsocial-gatsby-example)
