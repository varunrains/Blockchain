import React from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { Button, Table } from "semantic-ui-react";
import { useRouter } from "next/router";
import Campaign from "../../ethereum/campaign";
import RequestRow from "../../components/RequestRow";

const RequestDetail = (props) => {
  const router = useRouter();
  const { Header, Row, HeaderCell, Body } = Table;

  const renderRows = () => {
    return props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={props.address}
          approversCount={props.approversCount}
        />
      );
    });
  };

  return (
    <Layout>
      <h3>Requests</h3>
      <Link href={`/requests/new/${router.query.addressId}`}>
        <a>
          <Button primary floated="right" style={{ marginBottom: 10 }}>
            Add Request
          </Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>{renderRows()}</Body>
      </Table>
      <div>Found {props.requestCount} requests.</div>
    </Layout>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const address = params.addressId;
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.getReqestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();
  const requests = await Promise.all(
    Array(+requestCount)
      .fill()
      .map((element, index) => {
        return campaign.methods.requests(index).call();
      })
  );
  console.log(requests);

  return {
    props: {
      requests: JSON.parse(JSON.stringify(requests)),
      address,
      requestCount,
      approversCount,
    },
  };
}

export async function getStaticPaths(context) {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export default RequestDetail;
