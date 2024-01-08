import { gql } from "@urql/core";

export const TAGS = gql`
  query {
    tags {
      id
      titleEn
      titleKh
    }
  }
`;
