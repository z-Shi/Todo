# Todo Application
This is a basic Todo Application that allows me to practise using Django + React.
I followed an online guide for the majority of development, but am looking to customise it and to understand React better.

# BackEnd - Django REST API
To setup the backend for the application, we are using pipenv. 
So, it should be installed:
```bash
pip install pipenv
```
Then, we spawn a shell in a virtual environment:
```bash
pipenv shell
```
Now we can simply use:
```bash
pipenv install
```
If the virtual environment is already activated, you can use the following for the same effect:
```bash
pipenv sync
```

To run the backend itself, make sure you are in the backend folder:
```bash
cd backend
```
From here, you may need to migrate:
```bash
python manage.py migrate
```
Then, we can run the backend:
```bash
python manage.py runserver
```
Now, you can verify that it is working correctly by going to: localhost:8000

# FrontEnd
Next, we need to run the front end app.
Be sure to be in the correct directory, frontend:
```bash
cd frontend
```
From here, you will need `node` and `npm` installed on your machine.
Installation:
```bash
npm install
```
Start Server:
```bash
npm start
```
From there, your app should be available at: https://localhost:3000
There is a yarn.lock file that can be used if you have yarn, simply run:
```bash
yarn start
```

To run the application correctly, both the backend and frontend must be up.
