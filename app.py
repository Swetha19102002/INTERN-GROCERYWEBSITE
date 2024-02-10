from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__,static_url_path= '/static')

# Connect to MongoDB
client = MongoClient('localhost', 27017)
db = client['registration']
collection = db['users']

#home page
@app.route('/')
def home_page():
    return render_template('home.html')

#cart 
@app.route('/cart')
def cart_page():
    return render_template('cart.html' )

# Route to render registration form
@app.route('/register')
def registration_form():
    return render_template('register.html')

# Route to handle registration form submission
@app.route('/register', methods=['POST'])
def register():
    # Extract data from the registration form
    username = request.form.get('username')
    email = request.form.get('email')
    phone = request.form.get('phone')
    address = request.form.get('address')

    # Insert registration data into MongoDB
    data = {
        'username': username,
        'email': email,
        'phone': phone,
        'address': address
    }
    collection.insert_one(data)

    return jsonify({'message': 'Registration successful'})

# Route to render login form
@app.route('/login')
def login_form():
    return render_template('login.html')

# Route to handle login form submission
@app.route('/login', methods=['POST'])
def login():
    # Extract data from the login form
    username = request.form.get('username')
    phone_or_email = request.form.get('phoneOrEmail')  # Adjusted name here

    # Check if username and phone_or_email are not None
    if username is None or phone_or_email is None:
        return jsonify({'message': 'Invalid input'})

    # Search for user in MongoDB
    user = collection.find_one({
        '$and': [
            {'username': username.strip() if username else ''},  # Ensure exact match and remove leading/trailing spaces
            {'$or': [
                {'email': phone_or_email.strip() if phone_or_email else ''},  # Ensure exact match and remove leading/trailing spaces
                {'phone': phone_or_email.strip() if phone_or_email else ''}
            ]}
        ]
    })

    if user:
        # Convert ObjectId to string for serialization
        user['_id'] = str(user['_id'])
        return jsonify({'message': 'Login successful', 'user': user})
    else:
        return jsonify({'message': 'Invalid username, phone number, or email'})

if __name__ == '__main__':
    app.run(debug=True)