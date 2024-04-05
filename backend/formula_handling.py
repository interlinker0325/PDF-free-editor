### Extracting formula from md file => replace to "formula" => convert latex formula to mathml => replace formula to mathml in converted html file
# input md file path, driver
import re
from selenium.webdriver.common.by import By
import csv
from bs4 import BeautifulSoup

def formula_handling(md_file_path, driver):
    # Define the mathematical formula as a string
    with open(md_file_path, 'r', encoding='utf-8') as file:
        md_text = file.read()

    # Define the larger string

    # Use regular expressions to find the string starting with '$$' and ending with '$$'
    pattern = r'\$\$(.*?)\$\$'
    formulas = re.findall(pattern, md_text, re.DOTALL)
    
    input_box = driver.find_element(By.ID, 'demoSource')

    # Write the formula list to a CSV file as mathml by webscraping technology
    with open(md_file_path.replace('.md', '.formula.csv'), mode='w', newline='',  encoding='utf-8') as file:
        writer = csv.writer(file, quoting=csv.QUOTE_MINIMAL)
        for formula in formulas:
            # clear input box
            input_box.clear()
            # input the latex formula to input box
            input_box.send_keys(formula)
            # output box of the result
            output_box = driver.find_element(By.ID, 'math')
            # extract mathml formula from output box
            mathml = output_box.get_attribute('innerHTML')
            
            ## I think this convert should operate in html control so now this code is ignored
            # soup = BeautifulSoup(mathml, 'html.parser')
            
            writer.writerow([mathml])
    print('Formula saved to csv file successfully')
    

