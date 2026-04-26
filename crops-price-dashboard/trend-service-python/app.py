# trend-service-python/app.py
from flask import Flask, request, jsonify
import numpy as np
from sklearn.linear_model import LinearRegression
import pandas as pd

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    if not data or 'prices' not in data:
        return jsonify({"error": "Invalid data"}), 400

    prices_data = data['prices']
    if len(prices_data) < 2:
         # Return a flat trend if not enough data
        last_price = prices_data[0]['price'] if prices_data else 0
        return jsonify({"trend": [{"date": "Trend", "price": last_price}]})


    df = pd.DataFrame(prices_data)
    df['date'] = pd.to_datetime(df['date'])
    df['day_num'] = (df['date'] - df['date'].min()).dt.days

    X = df['day_num'].values.reshape(-1, 1)
    y = df['price'].values

    model = LinearRegression()
    model.fit(X, y)

    # Predict for the last day and the next 5 days
    future_days = np.array([X[-1][0], X[-1][0] + 5]).reshape(-1, 1)
    predicted_prices = model.predict(future_days)

    last_actual_date = df['date'].max()

    trend_data = [
        {"date": last_actual_date.strftime('%Y-%m-%d'), "price": y[-1]}, # Connects to the last actual point
        {"date": (last_actual_date + pd.Timedelta(days=5)).strftime('%Y-%m-%d'), "price": round(predicted_prices[1], 2)}
    ]

    return jsonify({"trend": trend_data})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
