import { gql } from "@urql/core";

export const TAGS = gql`
	query {
		storeOwnerTags {
			id
			title {
				en
				kh
			}
		}
	}
`;
