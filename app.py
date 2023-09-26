from flask import Flask, render_template

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True


@app.route('/')
def hello_world():  # put application's code here
    data = {}
    return render_template('index.html', data=data)


if __name__ == '__main__':
    app.run()