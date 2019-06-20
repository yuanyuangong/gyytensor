
import numpy as np
import pandas as pd

q_table =pd.DataFrame(np.ones((5,4)),columns=['l','r','u','d'])
print(q_table)
q_table = q_table.append(pd.Series(
    [1,2,2],
    index=['ls','rs','u'],
    name="234",
))
print(q_table.loc["234",:].max())