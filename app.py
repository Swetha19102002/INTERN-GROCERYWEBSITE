from flask import Flask, render_template, request, redirect, url_for
from pymongo import MongoClient


app = Flask(__name__, static_url_path='/static')
client = MongoClient('localhost', 27017)
db = client['registration']
collection = db['users']

@app.route('/')
def home_page():
    return render_template('home.html')

@app.route('/cart')
def cart_page():
    return render_template('cart.html')

@app.route('/register')
def registration_form():
    return render_template('register.html')

@app.route('/register', methods=['POST'])
def register():
    username = request.form.get('username')
    email = request.form.get('email')
    phone = request.form.get('phone')
    address = request.form.get('address')
    data = {
        'username': username,
        'email': email,
        'phone': phone,
        'address': address
    }
    collection.insert_one(data)
    return redirect(url_for('login_form'))

@app.route('/login')
def login_form():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    phone_or_email = request.form.get('phoneOrEmail')
    if username is None or phone_or_email is None:
        return render_template('login.html', message='Invalid input')
    user = collection.find_one({
        '$and': [
            {'username': username.strip() if username else ''},
            {'$or': [
                {'email': phone_or_email.strip() if phone_or_email else ''},
                {'phone': phone_or_email.strip() if phone_or_email else ''}
            ]}
        ]
    })

    if user:
        return redirect(url_for('home_page'))
    else:
        return render_template('login.html', message='Invalid username, phone number, or email')
    
@app.route('/admin')
def admin_page():
    users = collection.find()
    return render_template('admin.html', users=users)

if __name__ == '__main__':
    app.run(debug=True)