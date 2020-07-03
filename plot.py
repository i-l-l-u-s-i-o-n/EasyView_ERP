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

result ='none'

def draw(task):

    global result

    if(task == 'marks'):

        df = pd.read_csv(csv_file)
        df = df.sort_values(subject_code)

        plt.figure(figsize=(8,6))
        plt.xticks([])
        plt.plot(df['sid'],df[subject_code],color='yellow',lw=2,label='Average')
        plt.plot(df[df[subject_code]<=12]['sid'],df[df[subject_code]<=12][subject_code],color='red',lw=2,label='Below Average')
        plt.plot(df[df[subject_code]>=23]['sid'],df[df[subject_code]>=23][subject_code],color='green',lw=2,label='Above Average')
        plt.plot(df[df['sid']==sid]['sid'],df[df['sid']==sid][subject_code],marker='o',markersize=10)
        plt.ylabel("Marks",family='fantasy')
        plt.legend()
        plt.title("CT-1 DAA Marks Graph",family='fantasy')
        plt.text(30, 28, "You stand here!", family="fantasy")
        # plt.show()
        plt.savefig('public/student/rcs502_ct1.jpeg') 

        return True

    elif task=='attendance':

        df = pd.read_csv("csv/attendance.csv")
        df = df.sort_values('total')
        # global result 
        result =df[df['sid']==sid].iloc[0]['total']
        plt.figure(figsize=(8,6))
        plt.xticks([])
        plt.plot(df['sid'],df['total'],color='yellow',lw=2,label='Average')
        plt.plot(df[df['total']<=60]['sid'],df[df['total']<=60]['total'],color='red',lw=2,label='Below Average')
        plt.plot(df[df['total']>=76]['sid'],df[df['total']>=76]['total'],color='green',lw=2,label='Above Average')
        plt.plot(df[df['sid']==sid]['sid'],df[df['sid']==sid]['total'],marker='o',markersize=10)
        plt.ylabel("Attendance(%)",family='fantasy')
        plt.legend()
        plt.title("Attendance Graph",family='fantasy')
        plt.ylim([0,100])
        plt.text(34, 85, "You are here!", family="fantasy")
        # plt.show()
        plt.savefig('public/student/attendance.jpeg') 

        # current_attendance = df[df['sid']==sid]['total']
        # print(current_attendance) #44   84



        return True

    elif(task=='marks_analysis'):

        # Pie chart
        labels = ['Frogs', 'Hogs', 'Dogs', 'Logs']
        sizes = [15, 30, 45, 10]
        #colors
        colors = ['#ff9999','#66b3ff','#99ff99','#ffcc99']
        #explsion
        explode = (0.05,0.05,0.05,0.05)
        
        plot.pie(sizes, colors = colors, labels=labels, autopct='%1.1f%%', startangle=90, pctdistance=0.85, explode = explode)
        #draw circle
        centre_circle = plt.Circle((0,0),0.70,fc='white')
        fig = plt.gcf()
        fig.gca().add_artist(centre_circle)
        # Equal aspect ratio ensures that pie is drawn as a circle
        ax1.axis('equal')  
        plt.tight_layout()
        plt.show()

    elif(task=='attendance_analysis'):

        df = pd.read_csv("csv/attendance.csv")
        df = df.sort_values('total')
        less_att = sum(df[df['total']<60]['total'].value_counts())
        gret_att = sum(df[df['total']>=60]['total'].value_counts())

        
        result = str(less_att) +" "+ str(gret_att)
        
        
        labels = ['Below 60%','Equal or Above 60%']
        sizes = [less_att,gret_att]
   
        colors = ['#ff9999','#66b3ff']
        
        explode = (0.05,0.05)
        fig,ax1 = plt.subplots()
        
        plt.pie(sizes, colors = colors, labels=labels, autopct='%1.1f%%', startangle=90, pctdistance=0.85, explode = explode)
        
        centre_circle = plt.Circle((0,0),0.70,fc='white')
        fig = plt.gcf()
        fig.gca().add_artist(centre_circle)
        
        ax1.axis('equal')  
        plt.tight_layout()
        plt.savefig("public/faculty/attendance_analysis.jpeg")
        return True



isDone =  draw('attendance_analysis')

if(isDone):
    print(result)
# 
# 

# df = pd.read_csv(csv_file)
    # # df = df.sort_values(subject_code)

    # plt.figure(figsize=(8,6))
    # plt.xticks([])
    # plt.plot(df['sid'],df['rcs501'],color='yellow',lw=2,label='Average')
    # plt.plot(df[df['rcs501']<=12]['sid'],df[df['rcs501']<=12]['rcs501'],color='red',lw=2,label='Below Average')
    # plt.plot(df[df['rcs501']>=23]['sid'],df[df['rcs501']>=23]['rcs501'],color='green',lw=2,label='Above Average')
    # plt.plot(df[df['sid']=='A2016IT4393']['sid'],df[df['sid']=='A2016IT4393']['rcs501'],marker='o',markersize=10)
    # plt.ylabel("Marks")
    # plt.legend()
    # plt.title("CT-1 DBMS Marks Graph")
    # plt.text(17, 24, "You stand here!", family="serif")
    # plt.show()
    # # plt.savefig('public/student/line.jpeg') 

    # return True
