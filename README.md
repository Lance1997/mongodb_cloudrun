#RETRIEVE DATA FROM MONGO DB AND DISPLAY IN VIEW
> Note Data is displayed in it's raw format and not formatted. You can either run this project locally or on Google cloud run with instructions in the steps below.

> Create and update .env file with the following information by copying the .env.test as .env

1. Your database name as *DB_NAME*
2. Your collection as *COLLECTION_NAME*
3. Your mongo uri as *MONGO_URI*

> To Run this project locally, cd into the project directory (mongodb_cloudrun) ***if not changed by you***
1. `npm install`
2. `npm run start`

> Ignore the step below if you are not going to use google cloud to build and deploy on cloud run. Replace <project-id> with your Project's ID and <image-name> with a name you want to give to your image. This step also assumes that you are running in an environment or CLI with google cloud sdk installed.

1. Build the image
  - `gclouds builds submit --tag gcr.io/<project-id>/<image-name>`
2. Deploy on cloud run
  - `gcloud run deploy --image gcr.io/<project-id>/<image-name> --platform managed`