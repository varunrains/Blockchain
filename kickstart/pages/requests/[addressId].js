import React from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";

const RequestDetail = () => {
  const router = useRouter();
  return (
    <Layout>
      <h3>Requests</h3>
      <Link href={`/requests/new/${router.query.addressId}`}>
        <a>
          <Button primary>Add Request</Button>
        </a>
      </Link>
    </Layout>
  );
};

export default RequestDetail;
