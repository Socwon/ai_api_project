from flask import Flask, render_template, request
from google.cloud import vision_v1 as vision
import io

app = Flask(__name__)

# 서비스 계정 키 경로 설정
key_path = './seraphic-beacon-402301-9ab6bc42f8ea.json'
client = vision.ImageAnnotatorClient.from_service_account_file(key_path)

# API 키 설정
api_key = '<YOUR_API_KEY>'

@app.route('/')
def index():
    return render_template('index.html', api_key=api_key)

@app.route('/upload', methods=['POST'])
def upload():
    # 나머지 코드는 변경되지 않아야 합니다.
    # ...

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
