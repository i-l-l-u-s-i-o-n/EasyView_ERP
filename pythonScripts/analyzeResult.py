import sys
import random

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
sns.set()

# csv_file = 'test1.csv'
# subject_code = 'rcs502'
sid = 'A2016IT4044'

# task = sys.argv[1]

result = ''


def draw(subject_code, fileName, sub_name):

    df = pd.read_csv("csv/test1.csv")
    df = df.sort_values(subject_code)

    failed = sum(df[df[subject_code] < 15][subject_code].value_counts())
    average = sum(df[(df[subject_code] >= 15) & (df[subject_code] > 23)][subject_code].value_counts())
    aboveAverage = sum(df[df[subject_code] >= 23][subject_code].value_counts())


    global result

    labels = ['Fail( <50% )', 'Average(>=50% and <75%)', 'Above Average( >=75% )']
    sizes = [failed, average, aboveAverage]

    # colors = ['#ff9999', '#66b3ff','#ffcc99']
    colors = ['#ff0000','#ffe600','#09ff00']

    explode = (0.05, 0.05,0.05)
    fig, ax1 = plt.subplots(figsize=(8,5))
    plt.pie(sizes, colors=colors, labels=labels, autopct='%1.1f%%',
            startangle=90, pctdistance=0.85, explode=explode,wedgeprops={'alpha':0.6})

    centre_circle = plt.Circle((0, 0), 0.70, fc='white')
    fig = plt.gcf()
    fig.gca().add_artist(centre_circle)

    ax1.axis('equal')
    plt.tight_layout()
    file = "public/faculty/"+fileName
    plt.savefig(file)
    # plt.show()

    return True


def draw_in_one():

    df = pd.read_csv("csv/test1.csv")
    

    plt.style.use('seaborn-white')
    # print(plt.style.available)

    fig = plt.figure(figsize=(8, 6))
    ax = fig.add_subplot()
    plt.xticks([])
    df = df.sort_values('rcs501')
    ax.plot(range(1,47),df['rcs501'],
             color='blue',alpha=0.6, lw=2, label='DBMS')
    
    df = df.sort_values('rcs502')
    ax.plot(range(1,47),df['rcs502'],
             color='green', lw=2, alpha=0.6,label='DAA')
    
    df = df.sort_values('rcs503')
    ax.plot(range(1,47),df['rcs503'],
             color='red', lw=2, alpha=0.6,label='PPL')
   
    ax.set_ylabel('Marks',color='#343a40',fontfamily={'fantasy'})
    ax.spines['left'].set_linewidth(0.8)
    plt.tick_params(axis='y', colors='#343a40', direction='out', length=13, width=3)
    ax.spines['left'].set_color('#343a40')

    plt.legend()
    plt.title("CT-1 Marks Graph", family='fantasy')
    sns.despine(top=True, right=True, left=False, bottom=True)
    # plt.text(30, 28, "You stand here!", family="fantasy")
    # plt.show()
    plt.savefig('public/faculty/ct1_all_in_one_plot.jpeg') #'public/student/rcs502_ct1.jpeg'
    
    # current_marks = df[df['sid']==sid][subject_code].iloc[0]
    # print(sum(df[df[subject_code]>current_marks][subject_code].value_counts()))

    # no_of_students_ahead = sum(df[df[subject_code]>current_marks][subject_code].value_counts())

    # global result 
    # result=result+' '+str(no_of_students_ahead)


    return True

isDBMSdone = draw('rcs501', 'rcs501_ct1_analysis.jpeg', 'DBMS')
isDAAdone = draw('rcs502', 'rcs502_ct1_analysis.jpeg', 'DAA')
isPPLdone = draw('rcs503', 'rcs503_ct1_analysis.jpeg', 'PPL')

isDraw = draw_in_one()

if isDBMSdone and isDAAdone and isPPLdone and isDraw:
    print(result)
