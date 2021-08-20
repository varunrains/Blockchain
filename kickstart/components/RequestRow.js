import React from "react";
import { Tab, Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

const RequestRow = (props) => {
  const { Row, Cell } = Table;
  const { id, request } = props;

  const onApproveHandler = async (event) => {
    event.preventDefault();
    const campaign = Campaign(props.address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .approveRequest(+props.id)
        .send({ from: accounts[0], gas: "1000000", type: "0x2" });
    } catch (error) {
      console.log(error);
    }
  };

  const onFinalizeHandler = async (event) => {
    const campaign = Campaign(props.address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .finalizeRequest(+props.id)
        .send({ from: accounts[0], gas: "1000000", type: "0x2" });
    } catch (error) {
      console.log(error);
    }
  };

  const readyToFinalize = request.approvalCount > props.approversCount / 2;

  return (
    <Row
      disabled={request.complete}
      positive={readyToFinalize && !request.complete}
    >
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>
        {request.approvalCount}/{props.approversCount}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button color="green" basic onClick={onApproveHandler}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button color="teal" basic onClick={onFinalizeHandler}>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
};

export default RequestRow;
