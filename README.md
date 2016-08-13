#HW 4 (blog) component of HW 5 part 2 (server) of CS52
## by Jean Zhou

---
####App url: cs52-jeanzhou-hw5p2.surge.sh

###General Comments:

I used Express and Mongodb to create a CRUD api server for the React+Redux blog that I'd created for HW 4. The HW 4 blog was modified for this (branch hw5-auth). The server implements authentication (HW 5 branch part2). I got everything to worl. Users may sign up with any username that is not taken, and then sign in and sign out whenever. Only users who are signed in can create, edit, and delete posts.

For extra credit, appropriate error messages are displayed, such as if a user tries to edit or delete posts when not signed in.
