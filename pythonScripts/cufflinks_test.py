import chart_studio.plotly as py
import plotly
import cufflinks as cf
import pandas as pd
import numpy as np
from plotly.offline import download_plotlyjs, init_notebook_mode, plot, iplot
init_notebook_mode(connected=True)
cf.go_offline()


# Offline html saving
df = pd.read_csv('csv/test1.csv')
df = df.sort_values('rcs501')
df['sno'] = range(1, 47)

# df = pd.DataFrame(np.random.randn(1000, 3), columns=['A','B','C']).cumsum()
# fig = df.iplot(asFigure=True)

fig= df.iplot(x='sno', y='rcs501',asFigure=True)
plotly.offline.plot(fig, filename="example.html")
