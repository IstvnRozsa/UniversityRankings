from flask import Flask, render_template
import pandas as pd
import json

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True


@app.route('/')
def hello_world():  # put application's code here
    universities_df = pd.read_csv("data/1_Universities.csv")
    universities_js = universities_df.to_json(orient='records')
    uni_columns = universities_df.columns.tolist()

    # Create feature list for combobox
    uni_features = []
    for c in uni_columns:
        if "score" in c:
            uni_features.append(c)
    continents = universities_df['continent'].unique().tolist()
    locations = universities_df['location'].unique().tolist()
    continents.insert(0, "No Selection")

    edu_spending_df = pd.read_csv("data/2_Education_Spends.csv")
    edu_spending_js = edu_spending_df.to_json(orient='records')

    # Read GeoJSON file as a JSON object
    with open("data/updated_countries.geojson", 'r') as file:
        geojson_data = json.load(file)

    countries_df = pd.read_csv("data/2_Countries.csv")
    countries_js = countries_df.to_json(orient='records')
    countries_columns = countries_df.columns.tolist()
    country_features = []
    for c in countries_columns:
        if "NF_" not in c:
            country_features.append(c)
    years = countries_df['NF_Year'].unique().tolist()

    return render_template('index.html', universities=universities_js, uni_features=uni_features,continents=continents, locations=locations,
                           countries=countries_js, edu_spending=edu_spending_js,geojson_data=geojson_data, country_features=country_features[1:], years=years)


if __name__ == '__main__':
    app.run()
