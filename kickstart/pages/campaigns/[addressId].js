import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import { Button, Card, Grid } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import Link from "next/link";

const CampaignDetail = (props) => {
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
      {
        header: minimumContribution,
        meta: "Minimum contribution (wei)",
        description:
          "You must contribute at least this much wei to become an contributor",
      },
      {
        header: requestsCount,
        meta: "Number of requests",
        description:
          "The request tries to withdraw money from the contribution",
      },
      {
        header: approversCount,
        meta: "Number of approvers",
        description: "Number of people who have donated to this campaign",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign balance (ether)",
        description: "The balance is how much money this campaign has",
      },
    ];
    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <h3>Campaign Detail</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>{renderCards()}</Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={props.address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link href={`/requests/${props.address}`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const address = params.addressId;
  const campaign = Campaign(address);
  const summary = await campaign.methods.getSummary().call();

  return {
    props: {
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      address: address,
    },
  };
}

export async function getStaticPaths(context) {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export default CampaignDetail;
