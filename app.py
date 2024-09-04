from flask import Flask, send_from_directory

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/game.js')
def game_js():
    return send_from_directory('.', 'game.js')

if __name__ == '__main__':
    app.run(debug=True)
