import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x5d0271BAA7eeB4459f2054804B90f93AA1053616"
);

export default instance;
