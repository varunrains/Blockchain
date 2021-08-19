import React, { useState } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

const NewRequest = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  var slug = router.query.new;

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const campaign = Campaign(slug[1]);

    setLoading(true);
    setErrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: accounts[0],
          gas: "1000000",
          type: "0x2",
        });
      router.push(`/requests/${slug[1]}`);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <Link href={`/requests/${slug[1]}`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request!</h3>
      <Form onSubmit={onSubmitHandler} error={!!errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(event) => setRecipient(event.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button primary loading={loading}>
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export default NewRequest;
