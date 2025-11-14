import json
import pandas as pd
import os

# Leer JSON generado por k6
json_file = 'results/output.json'

# Leer línea por línea (k6 genera JSON line-delimited)
data = []
with open(json_file) as f:
    for line in f:
        data.append(json.loads(line))

# Filtrar solo métricas de tipo Point o Counter
metrics = [item for item in data if item.get('type') in ['Point', 'Counter', 'Rate']]

# Convertir a DataFrame
df = pd.json_normalize(metrics)

# Guardar CSV
csv_file = 'results/metrics.csv'
df.to_csv(csv_file, index=False)
print(f"CSV generado: {csv_file}")

# Generar HTML simple
html_file = 'results/report.html'
df.to_html(html_file, index=False)
print(f"HTML generado: {html_file}")
# Generar HTML simple
