#RETRIEVE DATA FROM MONGO DB AND DISPLAY IN VIEW
> Note Data is displayed in it's raw format and not formatted

> Create and update .env file with the following information

1. Your database name as *DB_NAME*
2. Your collection as *COLLECTION_NAME*
3. Your mongo uri as *MONGO_URI*

>NOTE Modify index.pug scripts and include your logic for displaying the JSON data in the view, what I have here might not work for you because it's applicable where your

> Run the following command to deploy the code to cloud function
  `gcloud run`