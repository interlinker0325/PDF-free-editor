from selenium import webdriver
from selenium.webdriver.chrome.options import Options

def creat_driver():
    url = 'https://temml.org/'
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(options=chrome_options)
    driver.get(url)
    return driver