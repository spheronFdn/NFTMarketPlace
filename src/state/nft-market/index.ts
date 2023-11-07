import { TransactionResponse } from "@ethersproject/abstract-provider";
import { BigNumber, Contract, ethers } from "ethers";
import { CreationValues } from "modules/CreationPage/CreationForm";
import useSigner from "state/signer";
import NFT_MARKET from "../../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import { NFT_MARKET_ADDRESS } from "./config";
import { NFT } from "./interfaces";
import useListedNFTs from "./useListedNFTs";
import useOwnedListedNFTs from "./useOwnedListedNFTs";
import useOwnedNFTs from "./useOwnedNFTs";
import { toast } from "react-toastify";
import { upload } from "@spheron/browser-upload";

const useNFTMarket = () => {
  const { signer } = useSigner();
  const nftMarket = new Contract(NFT_MARKET_ADDRESS, NFT_MARKET.abi, signer);

  const ownedNFTs = useOwnedNFTs();
  const ownedListedNFTs = useOwnedListedNFTs();
  const listedNFTs = useListedNFTs();

  const createNFT = async (values: CreationValues) => {
    const { name, description, image } = values;

    if (!image) {
      throw new Error("Image file is required to create an NFT.");
    }

    try {
      // Upload the image file and get the CID and filename
      const { cid: imageCid, filename } = await uploadFileToIPFS(image);

      // Construct the direct link to the image
      const imageUrl = `https://${imageCid}.ipfs.sphn.link/${encodeURIComponent(
        filename
      )}`;

      // Create the metadata object with the image link
      const metadata = {
        name,
        description,
        image: imageUrl,
      };

      // Convert the metadata object to a JSON blob and create a file from it
      const metadataBlob = new Blob([JSON.stringify(metadata)], {
        type: "application/json",
      });
      const metadataFile = new File([metadataBlob], "metadata.json");

      // Upload the metadata file and get the CID
      const { cid: metadataCid } = await uploadFileToIPFS(metadataFile);

      // Construct the link to the metadata to use as the tokenURI
      const tokenURI = `https://${metadataCid}.ipfs.sphn.link/metadata.json`;

      // Mint the NFT with the tokenURI
      const transaction = await nftMarket.createNFT(tokenURI);
      await transaction.wait();
      toast.success(
        "NFT has been created, hold tight while we update the frontend."
      );
      return transaction;
    } catch (e) {
      console.error("Error creating NFT:", e);
      toast.error("Failed to create NFT."); // Display error toast message
      throw e; // Rethrow the error to handle it in the calling function
    }
  };
  const uploadFileToIPFS = async (file: File) => {
    try {
      const response = await fetch(
        "http://4eb0fmmsches18qpmn7u47rbpo.ingress.palmito.duckdns.org/initiate-upload"
      );
      const { uploadToken } = await response.json();
      const uploadResult = await upload([file], { token: uploadToken });
      if (!uploadResult.cid) {
        throw new Error("No CID returned from upload");
      }
      return { cid: uploadResult.cid, filename: file.name };
    } catch (error) {
      console.error("Error uploading file to IPFS:", error);
      toast.error(
        "Failed to upload file to IPFS. Please try again later or contact support."
      );
      throw error;
    }
  };

  const listNFT = async (tokenID: string, price: BigNumber) => {
    const transaction: TransactionResponse = await nftMarket.listNFT(
      tokenID,
      price
    );
    await transaction.wait();
  };

  const cancelListing = async (tokenID: string) => {
    const transaction: TransactionResponse = await nftMarket.cancelListing(
      tokenID
    );
    await transaction.wait();
  };

  const buyNFT = async (nft: NFT) => {
    const transaction: TransactionResponse = await nftMarket.buyNFT(nft.id, {
      value: ethers.utils.parseEther(nft.price),
    });
    await transaction.wait();
  };

  return {
    createNFT,
    listNFT,
    cancelListing,
    buyNFT,
    ...ownedNFTs,
    ...ownedListedNFTs,
    ...listedNFTs,
  };
};

export default useNFTMarket;
