# Spheron NFT Marketplace

A comprehensive NFT Marketplace showcasing the power of Spheron's decentralized infrastructure services: Storage, Compute, and Site.

## Description

This project serves as a full-fledged demonstration of how Spheron's suite of services can be leveraged to create a decentralized NFT marketplace. By utilizing Spheron's Storage, Compute, and Site services, users can mint, list, buy, and resell NFTs within a robust and decentralized ecosystem.

### Why Did We Build This?

We developed this NFT marketplace to provide a hands-on example for anyone interested in creating their own marketplace on the Spheron platform, harnessing the power of decentralized infrastructure to facilitate NFT transactions.

## Usage

To set up and run this project locally, follow these steps:

1. Clone the repository:
    ```
    git clone https://github.com/spheronFdn/spheron-site-deployer-service.git
    ```
2. Navigate to the project directory and install dependencies:
    ```
    cd spheron-site-deployer-service
    npm install
    ```
3. Create a `.env` file using the `.env-example` as a template and fill in the required environment variables:
    ```
    NEXT_PUBLIC_NFT_MARKET_ADDRESS=<deployed_contract_address>
    NEXT_PUBLIC_GRAPH_URL=<your_subgraph_api>
    ```
4. Sign up for a Spheron account [here](https://app.spheron.network/).
5. Obtain your Spheron Storage access token following the instructions [here](https://docs.spheron.network/rest-api/#creating-an-access-token).
6. In the `backend` directory, edit the `.env` file to include your Spheron Storage access token:
    ```
    SPHERON_TOKEN="<your_access_token>"
    ```
7. Set up a `Dockerfile` as per your project's requirements.
```
# Use the official Node.js 16 image as a parent image
FROM node:16

# Set the working directory inside the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files into the working directory
COPY package*.json ./

# Install dependencies in the container
RUN npm install 

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Inform Docker that the container listens on the specified network port at runtime.
EXPOSE 8080

# Define the command to run your app using CMD which defines your runtime
CMD ["node", "index.js"]

```
8. Create a `.dockerignore` file to specify which files and directories should be ignored when building the Docker image.
```
# Ignore node modules
node_modules

# Ignore a local .env file that should not be included in the Docker image
.env

# Ignore git and version control
.git
.gitignore

# Ignore Docker files
Dockerfile
.dockerignore
```
9. Follow the Spheron Compute documentation to build and push your Docker image, and learn about creating a Docker image [here](https://docs.spheron.network/compute/cluster/).
10. Use the `/initiate-upload` endpoint in your frontend to obtain an upload token for the browser SDK. Detailed instructions can be found [here](https://docs.spheron.network/sdk/browser/).

11. Next steps involve deploying your subgraph and starting up your project:
```
yarn global add @graphprotocol/graph-cli
graph init --studio nft-marketplace-1
graph auth --studio <your_studio_access_token>
cd nft-marketplace-1
graph codegen && graph build
graph deploy --studio nft-marketplace-1
```

Now, your subgraph is deployed, and you can start your project using `yarn dev` or host it on the decentralized web using Spheron Site.

🚀 Congratulations! You now have your own end-to-end NFT marketplace, powered entirely by Spheron infrastructure.

## How It Works?

- **Browser Storage V2**: Used for storing NFT metadata and images on IPFS. Options for Arweave or Filecoin are available during server deployment.
- **Spheron Compute**: Runs the server necessary for generating one-time upload tokens for use in the Browser SDK.
- **Spheron Site**: Deploys your frontend to the decentralized web, allowing users to interact with your NFT marketplace.
- **The Graph**: Decentralized protocol for indexing and querying data from blockchains, enabling the efficient and fast retrieval of blockchain information for DApps.

## Help

For help, discussions or any other queries: [Join our Community](https://community.spheron.network/)

## Version History

- **0.1**
    - Initial Release

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Spheron Compute Docs](https://docs.spheron.network/compute/cluster/)
- [Spheron Browser Upload SDK](https://docs.spheron.network/sdk/browser/)
- [Spheron Site Docs](https://docs.spheron.network/static/deployment/logs/)
- [The Graph Docs](https://thegraph.com/docs/en/)

