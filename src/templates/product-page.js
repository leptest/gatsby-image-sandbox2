import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

const ProductPage = ({ data }) => {
	console.log(data.productsYaml);

	return (
		<Layout>
			<h1>Product page</h1>
			<p>Please check console. Image is coming back as <strong>null</strong>.</p>
		</Layout>
	);
};

export default ProductPage;

export const query = graphql`
	query($id: String!) {
		productsYaml(id: { eq: $id }) {
			id
			title
			testString
			imageUrl {
				childImageSharp {
					resize(width: 1200, height: 1200) {
						src
					}
				}
			}
		}
	}
`;
