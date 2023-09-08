# teachaway-project
# Star Wars Project - Mario Cikalleshi
You can find the project here: [https://d1cwbkhw8kj5ak.cloudfront.net](https://d1cwbkhw8kj5ak.cloudfront.net)

This project uses SST framework that makes it easy to build modern full-stack applications on AWS.

The project is a full stack application using AWS lambda function and apigateway as a backend, MySQL as the database and react for the frontend part of the application.
The frontend is deployed to an S3 Bucket, and served out from a CloudFront CDN for fast content delivery.

The main purpose of this project is to extend the data of the swapi api by saving the number of the vehicles or starships in our database. In our database is saved only the id of the vehicle or the starship which is extracted from the url and the total number of the vehicles or starships.

You can find the frontend code inside the packages/web folder.
You can find the backend code inside the packages/core and packages/functions folder.
To see the way routes are created for the backend check stacks/MyStack.


## Installation
Firstly you should download aws cli and configure it with the IAM user credentials
```bash
pip install awscli
aws configure
```


Use the package manager [pnpm](https://pnpm.io/installation) to install the project.



```bash
pnpm sst dev
```

To run the react app you should go inside the packages/web folder and run
```bash
pnpm dev
```

To run the unit tests run
```bash
pnpm test
```

To deploy the stack run
```bash
pnpm sst deploy --stage prod
```



## Usage



## License

[MIT](https://choosealicense.com/licenses/mit/)
