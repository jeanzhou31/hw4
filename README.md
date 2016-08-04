#HW 4 of CS52
## by Jean Zhou

---
####App url: cs52-jeanzhou-hw4.surge.sh

###General Comments: 

I used React+Redux to create a blog that updates dynamically and connects to the API server hosted at: cs52-blog.herokuapp.com. This blog can list all posts, view a specific post in full, create new posts, edit existing posts, and delete posts. The content section of posts can render markdown.

Additionally, for extra credit, I made the blog look more appealing, handle axios errors more gracefully, have input validation, and added a filter posts by tag functionality. When an axios error is found, the site redirects to "cs52-jeanzhou-hw4.surge.sh/error," where there is an error message for the user. For input validation during creating and editing posts, an error message comes up below the submit button that tells the user to input all fields before the form will submit. And for filtering, posts are filtered by tags that are delimited by commas. So, a post with the tags "new, words" will be included in filters of both "new" and "words," but not "new words."  Meanwhile a post with the tag "new words" will only be included in a filter of "new words," not "new" or "words."