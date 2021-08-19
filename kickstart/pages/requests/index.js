import React from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";

const RequestIndex = () => {
  const router = useRouter();
  return (
    <Layout>
      <h3>Requests</h3>
    </Layout>
  );
};

export default RequestIndex;
