from flask import Flask, request, jsonify

from calc_linear import calc_linear
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route('/api/calculate_linear', methods=['POST'])
def calculate_linear():
    body = request.get_json()
    res = calc_linear(body)
    return send_result_to_requestor(res)

def send_result_to_requestor(res):
    if 'err' in res:
        return res['err'], 400
    elif 'result' in res:
        return res['result'], 200
    else:
        return 'No result and no errors'


if __name__ == "__main__":
    app.run()