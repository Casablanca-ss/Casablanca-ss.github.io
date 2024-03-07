from flask import  Flask,render_template,send_file    #导入Flask类
from flask_cors import CORS
app=Flask(__name__)         #实例化并命名为app实例
CORS(app)

@app.route('/')
def run():
	file_path = r"F:\中韩项目\0805.jpg"
	# return render_template('home.html')
	return send_file(file_path, as_attachment=True)
if __name__=="__main__":
    app.run(port=2020,host="127.0.0.1",debug=True)  