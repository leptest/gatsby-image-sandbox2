import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

const IndexPage = ({ data }) => {
	console.log(data.markdownRemark)

	return (
		<Layout>
			<p>Homepage</p>
			<p><Link to="/products/page-1">Product Page 1</Link></p>
			<p><Link to="/products/page-2">Product Page 2</Link></p>
			<p>Please check console. The image is being correctly processed on the index.md file (markdown), by <strong>gatsby-remark-relative-images</strong>.</p>
		</Layout>
	);
};

export default IndexPage;

export const query = graphql`
	query($id: String!) {
		markdownRemark(id: { eq: $id }) {
			id
			html
			frontmatter {
				title,
				# imageUrl
				imageUrl {
					childImageSharp {
						resize(width: 1200, height: 1200) {
							src
						}
					}
				}
			}
		}
	}
`;
