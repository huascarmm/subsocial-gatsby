## **1. Bounty Category**

Subsocial Ghost/Gatsby

## **2. Github link**

https://github.com/huascarmm/subsocial-gatsby

## **3. Video link**

## **4. Description**

This is a plugin to get data from sub social and implement in gatsby and ghost

## **6. Developer\*\***

Huáscar Miranda. - [huascarm@gmail.com](mailto:huascarm@gmail.com) - [https://github.com/huascarmm](https://github.com/huascarmm)

## **7.Project.**

Subsocial Plugin for Ghost/Gatsby

## **9. Problem**

Need of a plugin for gatsby/ghost to get data

## **10.How to use in gatsby**

step1
configurar los enlaces de la blockchain en el archivo gatsby-config.js

con los siguientes parametros

substrateNodeUrl .- websoket de la blockchain a conectarse
ipfsNodeUrl .- url de la api para las ipfs
recommendedSpaceIds .- un listado de ids de spaces que quiera acceder
addressAccount .- direecion de cuenta en la blockchain

example

```
{
	resolve: `gatsby-source-subsocial`,
	options: {
    substrateNodeUrl: `wss://para.subsocial.network`,
    ipfsNodeUrl: `https://app.subsocial.network/ipfs`,
    recommendedSpaceIds: ["1", "1001", "1002", "10316"],
    addressAccount: "3sD7b8HxT2rg8SNhgZZcgG3bSffVLq5drAvDqDfM8CJ6SU6x"
	},
},
```

step 2

realizar las consultas mediante graphQL en sus componentes reactjs

por ejemplo

```
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

step 3

configurar credenciales para ghost en el archivo gatsby-config.js

apiUrl .- url de su pagina en ghost
contentApiKey .- apikey que se genera desde su pagina de ghost
version .- es versionado para la aplicacion por defecto `v5.0`

## **11. Pila tecnológica**

We are implementing a plugin in npm for gatsby.

Link NPM.

## **12. Enlace de la demostración del proyecto (url de la página)**

[https://github.com/huascarmm/subsocial-gatsby-example](https://github.com/huascarmm/subsocial-gatsby-example)
