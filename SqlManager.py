import mysql.connector
import os


def connect():
    conn = mysql.connector.connect(
        host="ns2.usm26.siteground.biz",
        user=os.environ.get("MYSQL_USER"),
        passwd=os.environ.get("MYSQL_PWD"),
        database=os.environ.get("MYSQL_DB")
    )
    return conn


def close(conn):
    conn.close()


def get_recipe_list():
    query = 'SELECT RecipeName FROM RecipeMaster'
    result = execute_query(query)
    return result


def get_groceries(recipe_id):
    query = 'SELECT GROCERIES.GroceryName, ' \
            "RecipeDetail.Qty, " \
            "UOM_Tbl.Descr " \
            "FROM RecipeDetail " \
            "INNER JOIN GROCERIES " \
            "ON RecipeDetail.GroceryNameID = GROCERIES.GroceryNameID " \
            "INNER JOIN UOM_Tbl " \
            "ON RecipeDetail.UOM_ID = UOM_Tbl.ID " \
            "WHERE RecipeMasterID = %s "\
            "AND UOM_Tbl.Descr != %s"

    result = execute_query(query, [recipe_id, "CommentLine"])
    return result


def get_recipe_id(recipe):
    query = "SELECT ID FROM RecipeMaster WHERE RecipeName =  %s"
    result = execute_query(query, [recipe])
    return result[0][0]


def print_result(res):
    for x in res:
        print(x)


def execute_query(query, args=None):
    db = connect()
    cursor = db.cursor()
    if args:
        parameters = tuple(args)
        cursor.execute(query, parameters)
    else:
        cursor.execute(query)
    result = cursor.fetchall()
    cursor.close()
    close(db)
    return result


def print_schema(table):
    query = 'describe '+table
    result = execute_query(query)
    print(table+' Schema')
    for x in result:
        print(x)


if __name__ == '__main__':
    tables = execute_query('show tables')
    print(tables)
    print_schema('UOM_Tbl')
    id = get_recipe_id('Chili')
    grocs = get_groceries(id)
    execute_query('select * from RecipeMaster')
