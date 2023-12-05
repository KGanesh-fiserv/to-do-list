from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def start():
    return render_template("Login Page.html")

@app.route("/toDoList")
def cont():
    return render_template("To-Do List Page.html")
app.run(debug=True)