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
    less_att = sum(df[df['total'] < 60]['total'].value_counts())
    gret_att = sum(df[df['total'] >= 60]['total'].value_counts())

    global result
    result = str(less_att) + " " + str(gret_att)

    labels = ['Below 60%', 'Equal or Above 60%']
    sizes = [less_att, gret_att]

    # colors = ['#ff9999', '#66b3ff']
    colors = ['#ff0000','#09ff00']

    explode = (0.05, 0.05)
    fig, ax1 = plt.subplots()

    plt.pie(sizes, colors=colors, labels=labels, autopct='%1.1f%%',
            startangle=90, pctdistance=0.85, explode=explode,wedgeprops={'alpha':0.6})

    centre_circle = plt.Circle((0, 0), 0.70, fc='white')
    fig = plt.gcf()
    fig.gca().add_artist(centre_circle)

    ax1.axis('equal')
    plt.tight_layout()
    plt.savefig("public/faculty/attendance_analysis.jpeg")
    return True


isDone = draw()

if isDone:
    print(result)
