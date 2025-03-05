
import requests

url = "https://apiadmin.finearts.go.th/api/v1/archeology/search?provCode=10"

payload = {}
headers = {
  'x-api-key': 'l064cpskayjvosi8icwtnn',
  'Origin': 'YOUR_ORIGIN'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
