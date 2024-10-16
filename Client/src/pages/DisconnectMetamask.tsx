import { Link } from "react-router-dom";

const DisconnectInstructions = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Disconnect Instructions</h1>
      <p className="text-center mb-4">
        To disconnect your account from MetaMask, please follow these steps:
      </p>
      <ol className="list-decimal mb-4">
        <li>
          <img
            className="w-60 h-96"
            src="https://support.metamask.io/assets/images/MetaMask_Extension_all_permissions-e639b2b3e23005c26a589252b94b52f8.png"
          />
        </li>
        <li className="mt-12">
          {" "}
          <img
            className="w-60 h-96"
            src="https://support.metamask.io/assets/images/MetaMask_Extension_disconnect_from_site-0dbd2edd2701125492b1f4007a6a9442.png"
          />
        </li>
        <li className=" mt-12">
          
          <img
            className="w-60 h-40 "
            src="https://support.metamask.io/assets/images/MetaMask_extension_disconnect_all_accounts-58eaeb9b95986b52e6f2d2354689ac82.png"
          />
        </li>
      </ol>
      <Link to="/" className="mt-12 text-slate-200 hover:text-white bg-green-600 p-2 rounded-md  text-3xl mb-16 ">
        Return to Home
      </Link>
    </div>
  );
};

export default DisconnectInstructions;
