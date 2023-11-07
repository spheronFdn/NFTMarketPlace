import Link from "next/link";
import ConnectButton from "../ConnectButton";
import NavBar from "./NavBar";

const TopBar = () => {
  return (
    <div className="fixed top-0 mb-10 w-full bg-gradient-to-r from-sky-100 to-indigo-500">
      <div className="relative flex w-full items-center px-4  py-4 shadow">
        {/* <Image
          src="/spheronArtboard1new.png"
          width={180}
          height={70}
          alt="Spheron Logo"
        /> */}
        <h1 className="font-bold">Spheron</h1>
        <h1>` | `</h1>
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
