import Link from "next/link";
import ConnectButton from "../ConnectButton";
import NavBar from "./NavBar";
import Image from 'next/image'

const TopBar = () => {
  return (
    <div className="fixed top-0 w-full bg-gradient-to-r from-sky-100 to-indigo-500 mb-10">
      <div className="relative flex w-full items-center px-4  py-4 shadow">
        <Image
          src="https://bafybeidgr723rgzzss5km42asahuftdvtxvre2ebhiz2ecr2cjyhfrddi4.ipfs.sphn.link/spheronArtboard1-100-removebg-preview.png"
          width={200}
          height={50}
          alt="Spheron Logo"
        />
        <Link href="/">
          <a className="text-lg font-bold">NFTMarketplace</a>
        </Link>
        <div className="flex-grow">
          <NavBar />
        </div>
        <ConnectButton />
      </div>
    </div>
  );
};

export default TopBar;
