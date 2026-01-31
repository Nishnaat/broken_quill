import os
import re
import frontmatter
import markdown
from datetime import date, datetime

POSTS_DIR = 'posts'

def load_post_list():
	posts = []

	for filename in os.listdir(POSTS_DIR):
		if filename.endswith('.md'):
			file_path = os.path.join(POSTS_DIR, filename)
			with open(file_path, 'r', encoding='utf-8') as f:
				post = frontmatter.load(f)

				post_date = post.get('date')
				if isinstance(post_date, (date, datetime)):
					post_date = post_date.strftime('%Y-%m-%d')
				else:
					post_date = str(post_date)

				posts.append({
					'title': post.get('title'),
					'slug': post.get('slug'),
					'date': post_date,
					'excerpt': post.get('excerpt'),
					'categories': post.get('categories', []),
					'length': post.get('length'),
					'type': post.get('type', 'poem')
				})

	# Sort posts by date descending
	posts.sort(key=lambda x: x['date'], reverse=True)
	return posts


def load_post_content(slug):
	for filename in os.listdir(POSTS_DIR):
		if filename.endswith('.md'):
			file_path = os.path.join(POSTS_DIR, filename)
			with open(file_path, 'r', encoding='utf-8') as f:
				post = frontmatter.load(f)
				if post.get('slug') == slug:
					post_date = post.get('date')
					if isinstance(post_date, (date, datetime)):
						post_date = post_date.strftime('%Y-%m-%d')
					else:
						post_date = str(post_date)

					processed_content = preprocess_dev_blocks(post.content)

					html_content = markdown.markdown(
						processed_content,
						extensions=["extra"]
					)



					return {
						'title': post.get('title'),
						'slug': post.get('slug'),
						'date': post_date,
						'excerpt': post.get('excerpt'),
						'type': post.get('type', 'poem'),
						'html': html_content,
					}


	return None



def preprocess_dev_blocks(text):
    def replacer(match):
        content = match.group(1).strip()
        content = content.replace('\n', '<br>\n')
        return f'<div class="lang-devanagari">{content}</div>'

    return re.sub(
        r':::devanagari\s*(.*?)\s*:::',
        replacer,
        text,
        flags=re.DOTALL
    )


