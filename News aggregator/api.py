import requests

# Enter your API key here
api_key = '1292875a664f4636b1979a6662f709a4'

# Specify the endpoint and parameters for the API request
endpoint = 'https://newsapi.org/v2/top-headlines'
parameters = {'country': 'us', 'apiKey': api_key}

# Send the API request and get the response
response = requests.get(endpoint, params=parameters)

# Check if the response is successful
if response.status_code == 200:
    # Extract the articles from the response JSON
    articles = response.json()['articles']

    # Print the titles of the latest articles
    for article in articles:
        print(article['title'])
else:
    # Print the error message if the response is unsuccessful
    print(f'Error: {response.status_code} - {response.reason}')