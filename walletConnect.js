var account;
var btnContent;
var ItemID;
var ownerKey = "0xddD5f93d84eF9E8A91e2dC3C37d8FFd33E1061e9";


// https://docs.walletconnect.com/quick-start/dapps/web3-provider
var provider = new WalletConnectProvider.default({
  rpc: {
    1: "https://cloudflare-eth.com/", // https://ethereumnodes.com/
    137: "https://polygon-rpc.com/", // https://docs.polygon.technology/docs/develop/network-details/network/
    // ...
  },
  // bridge: 'https://bridge.walletconnect.org',
});

var connectWC = async () => {
  await provider.enable();

  //  Create Web3 instance
  const web3 = new Web3(provider);
  window.w3 = web3;

  var accounts = await web3.eth.getAccounts(); // get all connected accounts
  account = accounts[0]; // get the primary account
  var walletbtn = document.getElementById("walletbtn");
  walletbtn.onclick = disconnect;
  btnContent = walletbtn.innerHTML;
  walletbtn.innerHTML = "Disconnect";
  document.getElementById("Address").innerText = "address: " + account;

  if (ownerKey == account) {
    //he is owner of this item
    
    document.getElementById("non-ownerBtn").style.display = "none";
    document.getElementById("ownerBtn").style.display = "flex";
  }
};
//I have the account

var SendTransaction = async () => {
    console.log("buy clicked");
    console.log(String(account));
    
    var str = String(account);
    ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: '0x15058E192b67b47508bC877B68e3350001dC4Db5',
            to: '0xddD5f93d84eF9E8A91e2dC3C37d8FFd33E1061e9',
            value: '0x29a2241af62c0000',
            gasPrice: '0x09184e72a000',
            gas: '0x2710',
          },
        ],
      })
      .then((txHash) => console.log(txHash))
      .catch((error) => console.error);
  };

var sign = async (msg) => {
  if (w3) {
    return await w3.eth.personal.sign(msg, account);
  } else {
    return false;
  }
};

var contract = async (abi, address) => {
  if (w3) {
    return new w3.eth.Contract(abi, address);
  } else {
    return false;
  }
};

var disconnect = async () => {
  // Close provider session
  console.log("dissconect");
  await provider.disconnect();
  document.getElementById("Address").innerText = "address";
  document.getElementById("walletbtn").innerHTML = btnContent;
  document.getElementById("walletbtn").onclick = connectWC;

  document.getElementById("non-ownerBtn").style.display = "flex";
  document.getElementById("ownerBtn").style.display = "none";
};

var address = "0x4b4f8ca8fb3e66b5ddafcebfe86312cec486dae1";
var abi = [
  {
    inputs: [],
    name: "count",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "increment",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];
