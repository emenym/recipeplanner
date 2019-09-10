import os
from flask import Flask, request, jsonify, abort
from flask import render_template
import pint
import SqlManager


app = Flask(__name__)
UREG = pint.UnitRegistry()


@app.route("/")
def planner():
    recipe_list = get_recipe_list()
    return render_template("planner.html",
                           recipes=recipe_list)


def get_recipe_list():
    recipes = SqlManager.get_recipe_list()
    return recipes


@app.route('/get_groceries', methods=['POST'])
def get_groceries():
    data = request.get_json()
    groceries = process_recipes(data['recipes'])
    return jsonify(groceries=groceries)


def process_recipes(recipes):
    grocery_list = {}
    for recipe in recipes:
        recipe_id = SqlManager.get_recipe_id(recipe)
        grocery = SqlManager.get_groceries(recipe_id)
        grocery_list.update({recipe: grocery})

    return condense(grocery_list)


def condense(grocery_list):
    # grocery_list_condensed = {'cheese': {'qty': 4, 'unit': 'ounces'}}
    grocery_list_condensed = {}
    for groc in grocery_list:
        for item in grocery_list[groc]:
            name = item[0]
            qty = item[1]
            unit = item[2]
            if name in grocery_list_condensed.keys():
                q1 = {'qty': grocery_list_condensed[name]['qty'],
                      'unit': grocery_list_condensed[name]['unit']
                      }
                q2 = {'qty': qty, 'unit': unit}
                grocery_list_condensed[name] = add_quantities(q1, q2)
            else:
                grocery_list_condensed[name] = {'qty': qty, 'unit': unit}
    return grocery_list_condensed


def add_quantities(q1, q2):
    thing1 = q1['qty'] * UREG.parse_expression(q1['unit'].lower())
    thing2 = q2['qty'] * UREG.parse_expression(q2['unit'].lower())
    thing3 = thing1 + thing2
    result = {'qty': thing3.magnitude, 'unit': str(thing3.units).capitalize()}
    return result


def pretty(d, indent=0):
    for key, value in d.items():
        print('\t' * indent + str(key))
        if isinstance(value, dict):
            pretty(value, indent+1)
        else:
            print('\t' * (indent+1) + str(value))


if __name__ == "__main__":
    # asd = get_temp_ingredients('lol')
    port = os.environ.get('PORT', 80)
    if port == '8080':
        app.run(host='0.0.0.0', port=port, debug=True)
    else:
        app.run(host='0.0.0.0', port=port, debug=False)
