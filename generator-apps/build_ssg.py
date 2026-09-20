import os
import shutil
import re
import json

# This script creates an /en/ folder and duplicates the HTML files,
# injecting correct lang/dir tags and <title>/<meta> tags.

# Ensure we have the python data (we can just load it via a quick node script if needed,
# or we can parse the json if we export it).
# Let's run a small node script inside this python script to dump siteMeta.js and projects.js into a JSON file we can read.

