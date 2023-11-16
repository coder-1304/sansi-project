
from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 
# Load the trained SVM classifier and vectorizer
svm_classifier = joblib.load('model.pkl')
v = joblib.load('vectorizer.pkl')

# Define the list of labels
labels = ['Not Hate','Hate']

def predict_hate(text):
    # Process the input text
    texts = [text]
    text_count = v.transform(texts)
    
    # Make predictions using the SVM classifier
    result = svm_classifier.predict(text_count)
    

    # print(result[0])
    
    # Map the result to the corresponding label
    prediction = labels[result[0]]
    
    return prediction

@app.route('/prediction', methods=['POST'])
def predict():
    try:
        # Get input data from the request
        data = request.json
        text = data['text']
        
        # Call the function
        prediction = predict_hate(text)

        # Return the prediction as a JSON response
        response = {'prediction': prediction}
        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=8080) 

