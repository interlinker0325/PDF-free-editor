import requests
import json
import os
import time
from dotenv import load_dotenv
import win32com.client
import pythoncom

from formula_handling import formula_handling

config = load_dotenv(override=True)

with open('.mathpix') as f:
    APP_ID = f.readline().strip()
    APP_KEY = f.readline().strip()

def send_md_to_mathpix(file_path, output_format, purpose='pdf'):
    url = f'https://api.mathpix.com/v3/{purpose}'
    headers = {
        'app_id': APP_ID,
        'app_key': APP_KEY,
        'Content-Type': 'application/json'
    }

    with open(file_path, 'r', encoding='utf-8') as file:
        options = json.dumps({
            "mmd": file.read(),
            "formats": {
                output_format: True,
            }
            })
        print(f"Sending {os.path.getsize(file_path) / 1000} kb to Mathpix for convert")
        response = requests.post(url, headers=headers, data=options)
        response_data = response.json()

        if 'conversion_id' in response_data:
            conversion_id = response_data['conversion_id']
            print(f"Conversion ID: {conversion_id}")
            return conversion_id
        else:
            print("Error: Unable to send file to Mathpix===>", response_data['error'])
            return None

def send_pdf_to_mathpix(file_path, output_format='md'):
    url = 'https://api.mathpix.com/v3/pdf'
    headers = {
        'app_id': APP_ID,
        'app_key': APP_KEY,
    }

    with open(file_path, 'rb') as file:
        files = {'file': file}
        options = {
            'options_json': json.dumps({"conversion_formats": {output_format: True}, "rm_spaces": True})
            }
        print(f"Sending {os.path.getsize(file_path) / 1000} kb to Mathpix")
        response = requests.post(url, headers=headers, data=options, files=files)
        response_data = response.json()

        if 'pdf_id' in response_data:
            pdf_id = response_data['pdf_id']
            print(f"PDF ID: {pdf_id}")
            return pdf_id
        else:
            print("Error: Unable to send PDF to Mathpix")
            return None


def wait_for_processing(file_id, purpose='pdf'):
    url = f'https://api.mathpix.com/v3/{purpose}/{file_id}'
    headers = {
        'app_id': APP_ID,
        'app_key': APP_KEY
    }

    while True:
        response = requests.get(url, headers=headers)
        response_data = response.json()
        status = response_data.get('status', None)

        if status == 'completed':
            print("Processing complete")
            return True
        elif status == 'error':
            print("Error: Unable to process PDF")
            return False
        else:
            print(f"Status: {status}, waiting for processing to complete")
            time.sleep(5)


def download_processed_file(file_id, file_format, output_path, puporse='pdf'):
    url = f'https://api.mathpix.com/v3/{puporse}/{file_id}.{file_format}'
    headers = {
        'app_id': APP_ID,
        'app_key': APP_KEY
    }

    response = requests.get(url, headers=headers)
    with open(output_path, 'wb') as output_file:
        output_file.write(response.content)
    print(f"File downloaded to {output_path}")
    
def clear_terminal():
    os.system('cls' if os.name == 'nt' else 'clear')
    
def pdf_to_html(input_pdf_path, driver, file_type='md'):
    print('start pdf convert')
    # path of the converted markdown file
    output_mmd_path = input_pdf_path.replace('.pdf', f'.{file_type}')
    # path of the converted html file from markdown file
    converted_html_path = input_pdf_path.replace('.pdf', '.html')
    # pdf to md convert
    if not os.path.exists(output_mmd_path):
        pdf_id = send_pdf_to_mathpix(input_pdf_path, file_type)
        if pdf_id and wait_for_processing(pdf_id):
            download_processed_file(pdf_id, 'md', output_mmd_path)
    
    # extract the formula from md file, convert this latex formula to mathml formula and then save this mathml file to csv file
    formula_handling(output_mmd_path, driver)
    
    # convert md file to html file and
    if not os.path.exists(converted_html_path):
        # send request for conversion of md file
        conversion_id = send_md_to_mathpix(output_mmd_path, 'html', 'converter')
        # if conversion is completed, download the converted html file
        if conversion_id and wait_for_processing(conversion_id, 'converter'):
            download_processed_file(conversion_id, 'html', converted_html_path, 'converter')
    return converted_html_path
            
def doc_to_pdf(doc_path):
    if '.docx' in doc_path:
        pdf_path = doc_path.replace('.docx', '.pdf')
    elif '.doc' in doc_path:
        pdf_path = doc_path.replace('.doc', '.pdf')
    elif '.rtf' in doc_path:
        pdf_path = doc_path.replace('.rtf', '.pdf')
    else:
        print('Invalid type of file')
        return "Invalid type of file"

    pythoncom.CoInitialize()
    
    try:
        word = win32com.client.Dispatch("Word.Application")
        word.Visible = False

        # Open the document
        doc = word.Documents.Open(doc_path)
        doc.Activate()

        # Save as PDF
        doc.SaveAs(pdf_path, FileFormat=17)  # 17 represents the wdFormatPDF constant

    except Exception as e:
        print("An error occurred:", e)
        return "Conversion failed"
    finally:
        # Ensure Word is closed
        if 'doc' in locals():
            doc.Close()
        if 'word' in locals():
            word.Quit()

    # Check if the PDF was created successfully
    if os.path.exists(pdf_path):
        print("Doc to PDF Conversion successful.")
        return pdf_path
    else:
        print("Conversion failed. PDF not found.")
        return "Conversion failed"
