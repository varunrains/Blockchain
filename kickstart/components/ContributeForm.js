import React, { useState } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { useRouter } from "next/router";

const ContributeForm = (props) => {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const onChangeHandler = (event) => {
    setAmount(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const campaign = Campaign(props.address);
    setLoading(true);
    setErrorMessage();
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(amount, "ether"),
        gas: "1000000",
        type: "0x2",
      });
      router.replace(`/campaigns/${props.address}`);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
    setLoading(false);
    setAmount("");
  };

  return (
    <Form onSubmit={onSubmitHandler} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label="ether"
          labelPosition="right"
          value={amount}
          onChange={onChangeHandler}
        />
      </Form.Field>
      <Message error header="Oops!" content={errorMessage} />
      <Button primary loading={loading}>
        Contribute
      </Button>
    </Form>
  );
};

export default ContributeForm;
