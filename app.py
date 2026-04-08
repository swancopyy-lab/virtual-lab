from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Store beaker state
beaker_state = {
    'empty': True,
    'volume': 0,
    'liquid': None
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/beaker')
def get_beaker():
    return jsonify(beaker_state)

@app.route('/api/fill', methods=['POST'])
def fill_beaker():
    data = request.json
    beaker_state['empty'] = False
    beaker_state['volume'] = data.get('volume', 50)
    beaker_state['liquid'] = data.get('liquid', 'water')
    return jsonify({'status': 'success', 'beaker': beaker_state})

@app.route('/api/empty', methods=['POST'])
def empty_beaker():
    beaker_state['empty'] = True
    beaker_state['volume'] = 0
    beaker_state['liquid'] = None
    return jsonify({'status': 'success', 'beaker': beaker_state})

if __name__ == '__main__':
    app.run(debug=True)