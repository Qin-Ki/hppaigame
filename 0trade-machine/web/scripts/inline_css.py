import pathlib
css = pathlib.Path('NBA AI\u7ecf\u7406 \u00b7 \u4ea4\u6613\u6a21\u62df\u5668_files/css/style.css').read_text('utf-8')
html = pathlib.Path('index.html').read_text('utf-8')
html = html.replace('href="./NBA AI\u7ecf\u7406 \u00b7 \u4ea4\u6613\u6a21\u62df\u5668_files/css/style.css"', '')
html = html.replace('</title>', '</title>\n<style>\n' + css + '\n</style>')
pathlib.Path('index.html').write_text(html, 'utf-8')
print(f'Done! Inlined {len(css)} bytes of CSS')
