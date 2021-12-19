// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_BUROGU_ENDPOINT;
const graphCMS_token = process.env.GRAPHCMS_TOKEN;
export default async function comments(req, res) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphCMS_token}`
    }
  })

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: { name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug } } }) { id }
    }
  `
  try {
      const result = await graphQLClient.request(query, req.body);
      return res.status(200).send(result);

  } catch (error) {
      console.log(error);
  }
    
}
