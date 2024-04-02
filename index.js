const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path');

// Define el esquema de GraphQL
const typeDefs = gql`
  type Query {
    hello(message: String!): String
    aboutCarlos: String
    aboutSebastian: String
    aboutBrandon: String
    aboutMauricio: String
    aboutBrayan: String
    aboutGetial: String
  }
`;

// Define los resolvers de GraphQL
const resolvers = {
  Query: {
    hello: (_, { message }) => {
        return `¡Hola, ${message}! Un saludo por parte del profe `;
      },
    aboutSebastian: () => {
      return "Me encanta leer el periodico 🗞️"
    },
    aboutBrandon: () => {
        return "I use Arch btw"
    },
    aboutCarlos: () => {
			return `Carlos tiene una hermana y un hermano.`
    },
    aboutMauricio: () => {
      return "Me gusta la analitica de datos"
    },
    aboutBrayan: () => {
      return "Me gustan los videojuegos y los juegos de ocio."
    },
    aboutGetial: () => {
      return "Me llamo Juan Sebastian Getial, me gusta hacer ejercicio y la Pizza";
    }
  },
};

async function startApolloServer() {
	// Crea la instancia de Apollo Server
	const server = new ApolloServer({ typeDefs, resolvers });

	// Inicia el servidor Apollo
	await server.start();

	// Crea la aplicación Express
	const app = express();

	// Aplica el middleware de Apollo Server a la aplicación Express
	server.applyMiddleware({ app, path: '/graphql' });

	// Sirve la aplicación de React desde la carpeta "saludofront-app"
	const reactAppPath = path.join(__dirname, 'saludofront-app', 'dist');
	app.use(express.static(reactAppPath));
	app.get('*', (req, res) => {
		res.sendFile(path.join(reactAppPath, 'index.html'));
	});

	// Inicia el servidor
	const PORT = 4000;
	app.listen(PORT, () => {
		console.log(`Servidor GraphQL ejecutándose en http://localhost:${PORT}${server.graphqlPath}`);
	});
}

startApolloServer();
