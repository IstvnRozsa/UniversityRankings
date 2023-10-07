from flask import Flask, render_template
import pandas as pd

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True


@app.route('/')
def hello_world():  # put application's code here
    universities_df = pd.read_csv("data/1_Universities.csv")
    universities_js = universities_df.to_json(orient='records')
    columns = universities_df.columns.tolist()

    # Create feature list for combobox
    features = []
    for c in columns:
        if "score" in c:
            features.append(c)
    return render_template('index.html', universities=universities_js, features=features)


if __name__ == '__main__':
    app.run()
