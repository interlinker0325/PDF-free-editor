from dotenv import load_dotenv
from flask import Flask, request, redirect, send_file
from werkzeug.utils import secure_filename
import os
from datetime import datetime
from flask_cors import CORS
from flask import request
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field

from pdfdomd import pdf_to_html, doc_to_pdf
from htmlcontrol import html_control
from web_driver import creat_driver
from formula_handling import formula_handling

# AI model check
config = load_dotenv(override=True)

model = ChatOpenAI(model="gpt-3.5-turbo-1106", temperature=0)

class SectionSuggestions(BaseModel):
    suggestion: str = Field(description="Suggestion list to improve the content.")
    improvedText: str = Field(description="Html string that improved by the suggestion. Must keep the html structure of content")

section_parser = JsonOutputParser(pydantic_object=SectionSuggestions)

section_prompt = PromptTemplate(
    template="""
    Given the following html string of the {title} section of the paper, please provide both simplified suggestion lists for improvement and improved html string.
    For each sentence, identify and correct any spelling mistakes, grammar issues, and phrasing that could be enhanced.
    Additionally, highlight any logical inconsistencies and suggest how they might be resolved.
    Aim to improve clarity, conciseness, and overall impact of the text.
    This is the html string of the paper: {content}
    Suggestion list must be Spanish.
    {format_instructions}
    """,
    input_variables=["content", 'title'],
    partial_variables={"format_instructions": section_parser.get_format_instructions()},
)
section_chain = section_prompt | model | section_parser

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'index'
# Directory where uploaded files will be stored
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
driver = creat_driver()
@app.route('/filetohtml', methods = ['POST'])
def pdftohtml():
    try:
        if request.method == 'POST':
            # Check if the post request has the file part
            if 'file' not in request.files:
                return "there is no file"
            file = request.files['file']
            # If the user does not select a file, the browser submits an
            # empty file without a filename.
            if file.filename == '':
                return redirect(request.url)
            if file:
                # Format the current time as a string (e.g., "20240324190456")
                folder_name = datetime.now().strftime("%Y%m%d%H%M%S")
                new_dir_path = os.path.join(app.config['UPLOAD_FOLDER'], folder_name)
                # Create the directory (including any necessary intermediate directories)
                os.makedirs(new_dir_path, exist_ok=True)
                filename = secure_filename(file.filename)
                pdf_path = os.path.join(new_dir_path, filename)
                file.save(pdf_path)
                file_type = filename.split(".")[-1]
                print("file type ======>", file_type)
                if file_type != 'pdf':
                    try:
                        # if document is doc, docx or rft, convert this document to pdf file
                        pdf_path = doc_to_pdf(pdf_path)
                    except: return "Invalid type of file"
                # convert pdf file to html file(.html)
                html_path = pdf_to_html(pdf_path, driver)
                # convert loaded html file to well structured html file and add a style to html file
                converted_html_path = pdf_path.replace('.pdf', '.html')
                output = html_control(html_path)
                # send final converted html file to frontend
                return send_file(output, as_attachment=True)
    except:
        return('server error')

@app.route('/sectionCheck', methods = ["POST"])
def sectionCheck():
    try:
        print(request.args)
        content = request.args["content"]
        title = request.args["title"]
        return section_chain.invoke({"content": content, "title": title})
    except KeyError as e:
        return f"KeyError: {str(e)}"
    except Exception as e:
        return f"An error occurred: {str(e)}"
    
    
if __name__ == "__main__":
    app.run(debug=True, port=5000, host=('0.0.0.0'))
