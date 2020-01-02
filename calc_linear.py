import pandas as pd
import math
from flask import jsonify

def calc_linear(body):
    if 'rows' not in body or isinstance(body['rows'], list) == False:
        return { 'err': 'Invalid incoming data format' }
    
    rows=body['rows']
    for idx, row in enumerate(rows):
        if type(row['sales']) is not int and type(row['sales']) is not float:
            return { 'err': f'Sales value at {idx+1} row is not a number' }
        if type(row['week']) is not int:
            return { 'err': f'Week value at {idx+1} row is not a number' }

    if len(rows) < 104:
        return { 'err': 'To calculate forecast, input file must contain data for at least 2 years (104 weeks)' }

    df = pd.DataFrame(rows)

    df['year'] = df['week'].apply(lambda week: int(str(week)[0:4]))
    df['just_week'] = df['week'].apply(lambda week: int(str(week)[-2:]))

    # claculate moving average and create new column - move_avg
    start = 26
    end = len(df.index) - 26

    for i in range(start, end):
        first_half = df.loc[i - 26, 'sales'] / 2
        first_25 = df.loc[i - 25:i - 1, 'sales'].sum()
        
        last_half = df.loc[i + 26, 'sales'] / 2
        last_25 = df.loc[i + 1:i + 25, 'sales'].sum()
        
        move_avg = (first_half + first_25 + last_25 + last_half) / 52
        df.loc[i, 'mov_avg'] = move_avg
    

    # calculate seasonal coefficient from moving average
    df['seas_coef'] = df['sales'] / df['mov_avg']
    for i in range(0, 26):
        df.loc[i, 'seas_coef'] = df.loc[i + 52, 'seas_coef']
    for i in range(len(df.index) - 26, len(df.index)):
        df.loc[i, 'seas_coef'] = df.loc[i - 52, 'seas_coef']

    df['sales_clear_of_seas'] = df['sales'] / df['seas_coef']

    # x is period number, y is sales_clear_of_seas
    df['period_num'] = df.index + 1
    df['x_mult_y'] = df['period_num'] * df['sales_clear_of_seas']
    df['x_squared'] = df['period_num'] ** 2
    
    # calculate a and b coefficient for linear equation
    y_sum = df['sales_clear_of_seas'].sum()
    x_sum = df['period_num'].sum()
    n = len(df.index)
    b = (n * df['x_mult_y'].sum() - x_sum * y_sum) / (n * df['x_squared'].sum() - x_sum ** 2)
    a = (y_sum - b * x_sum) / n

    # extend dataframe to 52 weeks ahead
    df_length = len(df.index)
    end_year = df.loc[df_length - 1, 'week']
    end_year = str(end_year)[0:4]
    end_week = df.loc[df_length - 1, 'week']
    end_week = str(end_week)[4:]

    # fill in week, period_num and seas_coef columns
    for i in range(1, 53):
        if int(end_week) == 52:
            end_week = '01'
            end_year = str(int(end_year) + 1)
        else:
            end_week = '0' + str(int(end_week) + 1)
            end_week = end_week[-2:]
        
        df.loc[df_length + i, 'week'] = end_year + end_week
        df.loc[df_length + i, 'period_num'] = int(df_length + i)
        df.loc[df_length + i, 'year'] = int(end_year)
        df.loc[df_length + i, 'just_week'] = int(end_week)

        two_years_back = df[len(df.index) - 1 - 104:]
        two_years_back = two_years_back[two_years_back['just_week'] == int(end_week)]
        df.loc[df_length + i, 'seas_coef'] = two_years_back['seas_coef'].mean()

    # calculate trend using a and b coefficients (a + bx)
    df['trend'] = df.period_num.apply(lambda per: a + b * per)
    df['forecast'] = df['seas_coef'] * df['trend']
    # df['fact_minus_fcst'] = df['sales'] - df['forecast']

    # calculate standard deivation on forecasted sales for last 52 weeks
    last_52_weeks = df[-52:]
    fcst_mean = last_52_weeks['forecast'].mean()
    arr = (last_52_weeks['forecast'] - fcst_mean) ** 2
    stdev_on_fcst = math.sqrt(arr.mean())

    # calculate standard deviation on actual (input) sales
    sales_mean = df['sales'].mean()
    arr = (df['sales'] - sales_mean) ** 2
    stdev_on_sales = math.sqrt(arr.mean())

    # calculate mean absolute percenrage error (MAPE)
    arr = abs((df['sales'] - df['forecast']) / df['sales'])
    mape = 1 / arr.count() * arr.sum()

    df = df.fillna('')
    data = df.to_dict('records')

    result = {
        'data': data,
        'mape': mape,
        'stdev_on_fcst': stdev_on_fcst,
        'stdev_on_sales': stdev_on_sales,
    }


    return { 'result': result }