# Word Context Examples Search Engine

This is a search engine application that finds sentences for a given word in a source and target language. It leverages the power of Elasticsearch for indexing data and a Sanic server for the API. The frontend is built with React.js.

![light example](https://github.com/hamzabealta/word-search/blob/main/example1.png?raw=true)


The application is designed to run in a Docker environment, but for simplicity, SSL verification is not currently enabled on the Nginx server, and the application runs on the host network to avoid CORS issues.

## Project Structure

- `data_import`: The service that loads a public parallel dataset into the Elasticsearch server.
- `api_server`: The Sanic server that serves as the API endpoint.
- `react_client`: The frontend server running React.js.

## Prerequisites

To run this project, you need Docker installed on your machine and Docker Swarm initialized.

## Building and Running

To build the images:

If you're not using Docker Swarm like me and therefore aren't required to build each image individually for XML file specification, you can simply include a build tag in the Docker Compose file. Each service's build context is already configured to point to the appropriate directory.   

```bash
docker build -t data_import ./data_import
docker build -t api_server ./api_server
docker build -t web-server ./react_client
```

Then, to launch the stack:

```bash
docker stack deploy --compose-file project-stack.yml <stack-name>
```

The application should now be accessible at `http://localhost:3011`. The data import process might take a few minutes. Once it's complete, the application will be fully functional. If you're running the application locally and encounter CORS issues, you can use browser extensions such as "Allow CORS" to bypass them.  


## SSL Configuration

For production deployments, we recommend enabling SSL. The code for SSL configuration is present but commented out. To enable it:

1. Modify the Nginx configuration file to use ports 80 and 443.
1. Uncomment the lines in the Dockerfile of the web-server service that execute the sslSetUp.sh script.
1. Update the ports in the `project-stack.yml` file for the web-server service and specify the `/etc/letsencrypt` folder.
1. If you wish, use a Docker network and communicate through service names within that network.

## Local Development Without Docker

For local development, you can create Python virtual environments and install the requirements for each service (excluding Elasticsearch).

## Deployment on AWS

To deploy this on AWS, follow the steps for enabling SSL. We recommend using [Portainer](https://www.portainer.io) for managing Docker services and [GitHub Packages](https://github.com/features/packages) for managing Docker images.

## License

This code is available for any use, and is a simple showcase of some of the technology stack that we use on [www.algernoun.com](https://algernoun.com).
