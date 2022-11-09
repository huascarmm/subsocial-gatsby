


step1
configurar los enlaces de la blockchain en el archivo gatsby-config.js

con los siguientes parametros

substrateNodeUrl .- websoket de la blockchain a conectarse
ipfsNodeUrl .- url de la api para las ipfs
recommendedSpaceIds .- un listado de ids de spaces que quiera acceder

example
```
{
	resolve: `gatsby-source-subsocial`,
	options: {
    substrateNodeUrl: `wss://para.subsocial.network`,
    ipfsNodeUrl: `https://app.subsocial.network/ipfs`,
    recommendedSpaceIds: ["1", "1001", "1002", "10316"]
	},
},
```

step 2

realizar las consultas mediante graphQL en sus componentes reactjs

por ejemplo

```
export const query = graphql`
  query {
    allMyNodeTypeSpace {
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
