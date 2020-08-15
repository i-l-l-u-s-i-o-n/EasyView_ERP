import sys
import random

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
sns.set()

csv_file = 'test1.csv'
subject_code = 'rcs502'
sid = 'A2016IT4044'

# task = sys.argv[1]

result = 'none'


def draw():
    df = pd.read_csv("csv/attendance.csv")
    df = df.sort_values('total')
    global result
    result = df[df['sid'] == sid].iloc[0]['total']

    plt.style.use('seaborn-white')
    # print(plt.style.available)
    

    fig = plt.figure(figsize=(8, 6))
    ax = fig.add_subplot()
    plt.xticks([])
    ax.plot(df['sid'], df['total'], color='yellow', lw=2, label='Average')
    ax.plot(df[df['total'] <= 60]['sid'], df[df['total'] <= 60]
             ['total'], color='red', lw=2, label='Below Average')
    ax.plot(df[df['total'] >= 76]['sid'], df[df['total'] >= 76]
             ['total'], color='green', lw=2, label='Above Average')
    ax.plot(df[df['sid'] == sid]['sid'], df[df['sid'] == sid]
             ['total'], marker='o', markersize=10)
    ax.set_ylabel('Attendance(in %)',color='#343a40',fontfamily={'fantasy'})
    ax.spines['left'].set_linewidth(0.8)
    ax.spines['left'].set_color('#343a40')
    sns.despine(top=True, right=True, left=False, bottom=True)

    plt.fill_between(df['sid'], df['total'], color='yellow',alpha=0.2)
    plt.fill_between(df[df['total'] <= 60]['sid'], df[df['total'] <= 60]
             ['total'], color='red',alpha=0.4)
    plt.fill_between(df[df['total'] >= 76]['sid'], df[df['total'] >= 76]
             ['total'], color='green',alpha=0.4)



    plt.legend()
    plt.title("Attendance Graph", family="fantasy" )
    plt.ylim([0, 100])
    plt.tick_params(axis='y', colors='#343a40', direction='out', length=13, width=3)

    plt.text(34, 85, "You are here!", family="fantasy")
    # plt.show()
    plt.savefig('public/student/attendance.jpeg')

    # current_attendance = df[df['sid']==sid]['total']
    # print(current_attendance) #44   84

    return True


isDone = draw()

if isDone:
    print(result)
