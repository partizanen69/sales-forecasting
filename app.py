from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/api/s")
def hellod():
    return "Hdddddello World!"

if __name__ == "__main__":
    app.run()