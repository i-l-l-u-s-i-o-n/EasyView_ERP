import sys
import random

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
sns.set()

# sns.set_context('talk')
# csv_file = 'test1.csv'
# subject_code = 'rcs502'
sid = 'A2016IT4044'

# task = sys.argv[1]

result = ''


def draw(subject_code,fileName,sub_name):

    df = pd.read_csv("csv/test1.csv")
    # print(df)
    df = df.sort_values(subject_code)
    # print(df)
    

    plt.style.use('seaborn-white')
    # print(plt.style.available)

    fig = plt.figure(figsize=(8, 6))
    ax = fig.add_subplot()
    plt.xticks([])
    ax.plot(df['sid'], df[subject_code],
             color='yellow', lw=2, label='Average')
    ax.plot(df[df[subject_code] <= 12]['sid'], df[df[subject_code]
                                                   <= 12][subject_code], color='red', lw=2, label='Below Average')
    ax.plot(df[df[subject_code] >= 23]['sid'], df[df[subject_code] >= 23]
             [subject_code], color='green', lw=2, label='Above Average')
    ax.plot(df[df['sid'] == sid]['sid'], df[df['sid'] == sid]
             [subject_code], marker='o', markersize=10)
    # plt.ylabel('Marks',fontname="fantasy", fontsize=12,color='#343a40')
    ax.set_ylabel('Marks',color='#343a40',fontfamily={'fantasy'})
    ax.spines['left'].set_linewidth(0.8)
    current_marks = df[df['sid']==sid][subject_code].iloc[0]
    current_index = sum(df[df[subject_code]<current_marks][subject_code].value_counts())

    # print(df[df['sid']==sid][subject_code])

    plt.legend()
    plt.title("CT-1 "+sub_name+" Marks Graph", family='fantasy')
    plt.text(current_index-1, (current_marks+1), "You stand here!", family="fantasy")
    sns.despine(top=True, right=True, left=False, bottom=True)
    plt.tick_params(axis='y', colors='#343a40', direction='out', length=13, width=3)
    # ax.annotate('You stand here!', xy=(current_index,current_marks), xytext=((current_index-2),(current_marks+2)),
    #         arrowprops=dict(facecolor='black', shrink=0.05))

    ax.spines['left'].set_color('#343a40')

    plt.fill_between(df[df[subject_code] <= 12]['sid'], df[df[subject_code]<= 12][subject_code],color='red',alpha=0.4)
    plt.fill_between(df['sid'], df[subject_code],color='yellow',alpha=0.2)
    plt.fill_between(df[df[subject_code] >= 23]['sid'], df[df[subject_code]>= 23][subject_code],color='green',alpha=0.4)
    # df[(df[subject_code] > 12) & (df[subject_code] < 23) ]['sid'], df[(df[subject_code] > 12) & (df[subject_code] < 23) ][subject_code]
    
    # plt.show()
    file = 'public/student/'+fileName
    plt.savefig(file) #'public/student/rcs502_ct1.jpeg'
    
    
    # print(sum(df[df[subject_code]>current_marks][subject_code].value_counts()))

    no_of_students_ahead = sum(df[df[subject_code]>current_marks][subject_code].value_counts())

    global result 
    result=result+' '+str(no_of_students_ahead)


    return True

isDBMSdone = draw('rcs501','rcs501_ct1.jpeg','DBMS')
isDAAdone = draw('rcs502','rcs502_ct1.jpeg','DAA')
isPPLdone = draw('rcs503','rcs503_ct1.jpeg','PPL')


if isDBMSdone and isDAAdone and isPPLdone:
    print(result)
