from flask import Flask, render_template,jsonify
from flaskext.mysql import MySQL
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps


app=Flask(__name__)
api = Api(app)
CORS(app)

mysql=MySQL()

app.config['MYSQL_DATABASE_USER'] = 'root'           #
app.config['MYSQL_DATABASE_PASSWORD'] = '********'   #
app.config['MYSQL_DATABASE_DB'] = 'sams'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'

mysql.init_app(app)


cur = mysql.connect().cursor()


@app.route("/product")
def get_all_product():
    
    cur.execute('''select * from sams.product''')
    r = [dict((cur.description[i][0], value)for i, value in enumerate(row)) for row in cur.fetchall()]
    
    return (jsonify({'productCollection' : r}))


@app.route("/product/id")
def get_product_id_info(id):
    cur.execute('''select * from sams.product where id=id''')
    r = [dict((cur.description[i][0], value)for i, value in enumerate(row)) for row in cur.fetchall()]
    
    return (jsonify({'myCollection' : r}))


if __name__ == '__main__':
   app.run(port=5002)


