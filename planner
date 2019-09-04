
import os
import random
import mysql.connector
from flask import Flask, request, jsonify
from flask import render_template



app = Flask(__name__)


@app.route("/")
def planner():
    # select RecipeName from RecipeMaster
    recipe_list = ['Chili',
                   'Pizza, Homemade',
                   'Sausage Seasoning',
                   'Sausage,Hot Italian  Homemade',
                   'Sauce, Spagetti',
                   'Taco Meat; Homemade',
                   'Chili Powder, Homemade',
                   'Pizza Dough',
                   'Pancakes,Cornmeal',
                   'Hamburg and Gravy']
    return render_template("planner.html",
                           recipes=recipe_list)


@app.route('/get_groceries', methods=[ 'POST' ] )
def get_groceries():
    data = request.get_json()
    recipes = data['recipes']
    return jsonify(recipes=data)


def process_recipes(recipes):
    grocery_list = []
    for recipe in recipes:
        # get_ingredients(recipe)
        get_temp_ingredients(recipe)
    return {}


def get_temp_ingredients(recipe):
    list = ['broccoli', 'eggs', 'butter', "cheese", "flour",
            "apples", "lettuce", 'wine']

    list2 = [1,2,3,4,5]
    list3 = ['cups', 'teaspoons', 'ounces']
    recipestuff = {"recipe_name": recipe,
                   "groceries": []
                   }

    ingredients = []
    for i in range(0, random.choice([4,5,6])):
        grocerystuff = {"name": random.choice(list),
                        "qty": random.choice(list2),
                        "unit": random.choice(list3)}
        ingredients.append(grocerystuff)

    for grocery in ingredients:

        recipestuff['groceries'].append(grocery)


    return recipestuff


def get_ingredients(recipe):
    # select name from ingredientmaster where
    conn = mysql.connector.connect(
        user=os.environ.get("MYSQL_USER"),
        passwd=os.environ.get("MYSQL_PWD"),
        database=os.environ.get("MYSQL_DB"))
    cursor = conn.cursor()

    query = ("SELECT first_name, last_name, hire_date FROM employees "
             "WHERE hire_date BETWEEN %s AND %s")

    # do some gnarly query to get unique grocery names
    query = ("SELECT name where recepe IS %s JOIN A BUNCH OF SHIT")

    # from kdc
    sql = "SELECT GroceryNameId ID, GroceryName Name, gramsPerCup FROM GROCERIES "
    sql += "UNION SELECT ID, RecipeName Name, gramsPerCup FROM RecipeMaster "
    sql += "WHERE isSubRecipe=1 ORDER BY Name"

    sql = "SELECT Qty, UOM_ID, GroceryNameID, Instruction, ID AS detailID, Sequence AS seq "
    sql += "FROM RecipeDetail "
    sql += "WHERE RecipeMasterID = ? "
    sql += "ORDER BY Sequence"

    cursor.execute(query, recipe)

    for (GroceryName, Qty) in cursor:
        print("{} times {}".format(
            GroceryName, Qty))

    cursor.close()
    conn.close()
    return ''


if __name__ == "__main__":
    asd = get_temp_ingredients('lol')
    port = os.environ.get('PORT', 80)
    if port == '8080':
        app.run(host='0.0.0.0', port=port, debug=True)
    else:
        app.run(host='0.0.0.0', port=port, debug=False)
