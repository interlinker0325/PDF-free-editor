
# Adlyceum Backend

This is Flask Backend to convert document to HTML and make a suggestions.


## Environment Variables

### Requreiment environment

`Windows system`, `Python 3.11.0 or later`, `Microsoft Word Application(or WPS)`

To run this project, you will need to add the following environment variables to your .env file

`OPENAI_API_KEY`

And you need add this Mathpix `API_KEY` to .mathpix file.

`APP_ID`

`APP_KEY`



## Run Locally


Go to the project directory

```bash
  cd backend
```

Install virtual environment

```bash
  py -m venv venv
```

Run virtual environment

```bash
  venv/Scripts/activate
```

Install library

```bash
  pip install flask flask_cors langchain langchain_openai selenium bs4 requests datetime python-dotenv pywin32
```

Start the server

```bash
  py main.py
```

