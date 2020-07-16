const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

const slugify = (text) => text.toString().toLowerCase()
	.replace(/\s+/g, '-') // Replace spaces with -
	.replace(/[^\w-]+/g, '') // Remove all non-word chars
	.replace(/--+/g, '-') // Replace multiple - with single -
	.replace(/^-+/, '') // Trim - from start of text
	.replace(/-+$/, ''); // Trim - from end of text

exports.createPages = ({ actions, graphql }) => {
	const { createPage } = actions;

	return graphql(`
		{
			allMarkdownRemark(limit: 1000) {
				edges {
					node {
						id
						fields {
							slug
						}
						frontmatter {
							templateKey
						}
					}
				}
			}
			allProductsYaml {
				edges {
					node {
						id
						title
						frontmatter {
							templateKey
						}
					}
				}
			}
		}
	`).then((result) => {
		if (result.errors) {
			result.errors.forEach((e) => console.error(e.toString()));
			return Promise.reject(result.errors);
		}

		const products = result.data.allProductsYaml.edges;

		const newProducts = products.map((product) => {
			const { node } = product;

			return {
				node: {
					...node,
					fields: {
						slug: `products/${slugify(node.title)}`,
					},
				},
			};
		});

		const { edges } = result.data.allMarkdownRemark;

		const newEdges = edges.concat(newProducts);

		return newEdges.forEach((edge) => {
			const { id } = edge.node;
			createPage({
				path: edge.node.fields.slug,
				component: path.resolve(`src/templates/${String(edge.node.frontmatter.templateKey)}.js`),
				context: {
					id,
				},
			});
		});
	});
};

exports.createSchemaCustomization = ({ actions }) => {
	const { createTypes } = actions;

	const typeDefs = `
		type ProductsYaml implements Node @infer {
			testString: String
			imageUrl: File @myFilePathSchema
		}
	`;
	createTypes(typeDefs);
};

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions;
	fmImagesToRelative(node); // convert image paths

	if (node.internal.type === 'MarkdownRemark') {
		const value = createFilePath({ node, getNode });
		createNodeField({
			name: 'slug',
			node,
			value,
		});
	}
};
