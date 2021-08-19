import React, { Fragment, useEffect } from "react";
import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import Link from "next/link";

const CampaignIndex = (props) => {
  //useEffect(() => {}, []);

  const renderCampaigns = () => {
    const items = props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link href={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Link href="/campaigns/new">
          <a>
            <Button
              floated="right"
              content="Create Campaign"
              icon="add circle"
              primary
            />
          </a>
        </Link>
        {renderCampaigns()}
      </div>
    </Layout>
  );
};

//This is a old way of using the initial props in nextJS new way
//is to use either getStaticProps (pre-rendering) or getServerSideProps(when the user requests)
CampaignIndex.getInitialProps = async ({ req, res, match, store, ...ctx }) => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default CampaignIndex;
