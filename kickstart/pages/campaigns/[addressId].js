import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import { Card } from "semantic-ui-react";

const CampaignDetail = (props) => {
  const router = useRouter();

  const renderCards = () => {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
    } = props;
    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The manager created this campaign and can create requests",
        style: { overflowWrap: "break-word" },
      },
    ];
    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <h3>Campaign Detail</h3>
      {renderCards()}
    </Layout>
  );
};

CampaignDetail.getInitialProps = async ({ req, res, match, store, ...ctx }) => {
  //const router = useRouter();
  const address = req.url.split("/")[2];
  const campaign = Campaign(address);
  const summary = await campaign.methods.getSummary().call();

  return {
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
  };
};

export default CampaignDetail;
